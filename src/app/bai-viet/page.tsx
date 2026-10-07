import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getCategories, getPosts } from "@/lib/wordpress";
import { categoryUrl, parsePage } from "@/lib/site";
import { EmptyState, Pagination, PostCard } from "@/components/posts";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const page = parsePage((await searchParams).page);
  return {
    title: page > 1 ? `Bài viết — Trang ${page}` : "Bài viết",
    description:
      "Khám phá bài viết về content, marketing, công nghệ và góc nhìn cá nhân trên Truong Thinh Media.",
    alternates: { canonical: page > 1 ? `/bai-viet?page=${page}` : "/bai-viet" },
  };
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parsePage((await searchParams).page);
  const [collection, categories] = await Promise.all([
    getPosts({ page, perPage: 6 }),
    getCategories(),
  ]);
  if (page > Math.max(1, collection.pages)) notFound();
  return (
    <div className="container archive-page">
      <div className="page-intro">
        <p className="eyebrow">THƯ VIỆN Ý TƯỞNG</p>
        <h1>
          Mỗi bài viết,
          <br />
          <em>một góc nhìn.</em>
        </h1>
        <p>Đọc theo sự tò mò của bạn. Từ một câu hỏi nhỏ đến một ý tưởng mới.</p>
      </div>
      <nav id="chu-de" className="filter-tabs" aria-label="Lọc bài viết theo chuyên mục">
        <Link href="/bai-viet" aria-current="page">
          Tất cả bài viết <span>{collection.total}</span>
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={categoryUrl(category.slug)}>
            {category.name}
            <ArrowUpRight size={14} />
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
      <Pagination page={page} pages={collection.pages} base="/bai-viet" />
    </div>
  );
}
