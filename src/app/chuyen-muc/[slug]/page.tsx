import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getPosts } from "@/lib/wordpress";
import { categoryUrl, parsePage } from "@/lib/site";
import { EmptyState, Pagination, PostCard } from "@/components/posts";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((item) => item.slug === slug);
  const page = parsePage((await searchParams).page);
  return category
    ? {
        title: page > 1 ? `${category.name} — Trang ${page}` : category.name,
        description: category.description,
        alternates: { canonical: `${categoryUrl(slug)}${page > 1 ? `?page=${page}` : ""}` },
      }
    : { title: "Không tìm thấy chuyên mục" };
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, query, categories] = await Promise.all([params, searchParams, getCategories()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const page = parsePage(query.page);
  const collection = await getPosts({ category: category.id, page, perPage: 6 });
  if (page > Math.max(1, collection.pages)) notFound();
  return (
    <div className="container archive-page">
      <div className="breadcrumbs">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/bai-viet">Bài viết</Link>
        <span>/</span>
        <span>{category.name}</span>
      </div>
      <div className="page-intro">
        <p className="eyebrow">CHUYÊN MỤC</p>
        <h1>{category.name}</h1>
        <p>
          {category.description || `Những bài viết và góc nhìn về ${category.name.toLowerCase()}.`}
        </p>
      </div>
      <nav className="filter-tabs" aria-label="Chọn chuyên mục">
        <Link href="/bai-viet">Tất cả bài viết</Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={categoryUrl(item.slug)}
            aria-current={item.id === category.id ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="archive-count">
        <span>{collection.total} bài viết</span>
        <span>Mới nhất trước</span>
      </div>
      {collection.posts.length ? (
        <div className="posts-grid">
          {collection.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
      <Pagination page={page} pages={collection.pages} base={categoryUrl(slug)} />
    </div>
  );
}
