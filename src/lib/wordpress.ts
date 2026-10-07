import "server-only";
import { cache } from "react";
import { demoCategories, demoPosts } from "./demo";
import { normalizeText, plainText } from "./content";
import type { Category, Post, PostCollection, PostQuery } from "./types";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string; protected?: boolean };
  date_gmt: string;
  modified_gmt: string;
  sticky: boolean;
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: {
      id: number;
      slug: string;
      name: string;
      taxonomy: string;
      description?: string;
      count?: number;
    }[][];
  };
};

export class CmsError extends Error {
  constructor(public status: number) {
    super(`WordPress request failed (${status})`);
    this.name = "CmsError";
  }
}

async function wpFetch(endpoint: string, params: Record<string, string> = {}) {
  const base = process.env.WORDPRESS_API_URL;
  if (!base) throw new Error("WordPress API is not configured");
  const url = new URL(`${base.replace(/\/$/, "")}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, {
    next: { revalidate: 300, tags: ["wordpress"] },
    signal: AbortSignal.timeout(10000),
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new CmsError(response.status);
  return response;
}

function asPost(raw: WPPost): Post {
  const terms = raw._embedded?.["wp:term"]?.flat() || [];
  const text = plainText(raw.content.rendered);
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: raw.id,
    slug: raw.slug,
    title: plainText(raw.title.rendered),
    excerpt: plainText(raw.excerpt.rendered),
    content: raw.content.rendered,
    date: `${raw.date_gmt}Z`,
    modified: `${raw.modified_gmt}Z`,
    image: media?.source_url || "/images/placeholder.svg",
    imageAlt: media?.alt_text || "",
    author: plainText(raw._embedded?.author?.[0]?.name || "Truong Thinh Media"),
    categories: terms
      .filter((term) => term.taxonomy === "category")
      .map((term) => ({
        id: term.id,
        slug: term.slug,
        name: plainText(term.name),
        description: plainText(term.description || ""),
        count: term.count || 0,
      })),
    tags: terms.filter((term) => term.taxonomy === "post_tag").map((term) => plainText(term.name)),
    sticky: raw.sticky,
    readingMinutes: Math.max(1, Math.ceil(text.split(/\s+/).length / 220)),
  };
}

export const getCategories = cache(async (): Promise<Category[]> => {
  if (!process.env.WORDPRESS_API_URL) return demoCategories;
  const categories: Category[] = [];
  let page = 1;
  let pages = 1;
  do {
    const response = await wpFetch("categories", {
      per_page: "100",
      hide_empty: "true",
      page: String(page),
    });
    const data: Category[] = await response.json();
    categories.push(
      ...data.map((category) => ({
        ...category,
        name: plainText(category.name),
        description: plainText(category.description),
      })),
    );
    pages = Number(response.headers.get("X-WP-TotalPages") || 1);
    page++;
  } while (page <= pages);
  return categories;
});

export async function getPosts(query: PostQuery = {}): Promise<PostCollection> {
  const page = Math.max(1, query.page || 1);
  const perPage = Math.min(100, Math.max(1, query.perPage || 6));
  if (!process.env.WORDPRESS_API_URL) {
    const needle = normalizeText(query.search || "");
    const filtered = demoPosts.filter(
      (post) =>
        (!query.category || post.categories.some((category) => category.id === query.category)) &&
        (!needle ||
          normalizeText(`${post.title} ${post.excerpt} ${plainText(post.content)}`).includes(
            needle,
          )) &&
        (!query.exclude || post.id !== query.exclude) &&
        (query.sticky === undefined || post.sticky === query.sticky),
    );
    return {
      posts: filtered.slice((page - 1) * perPage, page * perPage),
      total: filtered.length,
      pages: Math.ceil(filtered.length / perPage),
    };
  }
  const params: Record<string, string> = {
    _embed: "true",
    status: "publish",
    page: String(page),
    per_page: String(perPage),
  };
  if (query.category) params.categories = String(query.category);
  if (query.search) {
    params.search = query.search;
    params.orderby = "relevance";
  }
  if (query.exclude) params.exclude = String(query.exclude);
  if (query.sticky !== undefined) params.sticky = String(query.sticky);
  try {
    const response = await wpFetch("posts", params);
    const raw: WPPost[] = await response.json();
    return {
      posts: raw.filter((post) => !post.content.protected).map(asPost),
      total: Number(response.headers.get("X-WP-Total") || raw.length),
      pages: Number(response.headers.get("X-WP-TotalPages") || 1),
    };
  } catch (error) {
    if (error instanceof CmsError && error.status === 400 && page > 1) {
      const first = await getPosts({ ...query, page: 1 });
      if (page > first.pages) return { posts: [], total: first.total, pages: first.pages };
    }
    throw error;
  }
}

export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  if (!process.env.WORDPRESS_API_URL) return demoPosts.find((post) => post.slug === slug);
  const response = await wpFetch("posts", { slug, _embed: "true", status: "publish" });
  const raw: WPPost[] = await response.json();
  return raw[0] && !raw[0].content.protected ? asPost(raw[0]) : undefined;
});

export async function getFeaturedPost() {
  const featured = await getPosts({ sticky: true, perPage: 1 });
  return featured.posts[0] || (await getPosts({ perPage: 1 })).posts[0];
}
