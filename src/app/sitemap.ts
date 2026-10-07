import type { MetadataRoute } from "next";
import { allowIndexing, categoryUrl, postUrl, site } from "@/lib/site";
import { getCategories, getPosts } from "@/lib/wordpress";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!allowIndexing) return [];
  const categories = await getCategories();
  const result: MetadataRoute.Sitemap = ["", "/bai-viet", "/gioi-thieu", "/lien-he"].map(
    (path) => ({ url: `${site.url}${path}` }),
  );
  result.push(
    ...categories.map((category) => ({ url: `${site.url}${categoryUrl(category.slug)}` })),
  );
  let page = 1;
  let pages = 1;
  do {
    const collection = await getPosts({ page, perPage: 100 });
    result.push(
      ...collection.posts.map((post) => ({
        url: `${site.url}${postUrl(post.slug)}`,
        lastModified: post.modified,
      })),
    );
    pages = collection.pages;
    page++;
  } while (page <= pages);
  return result;
}
