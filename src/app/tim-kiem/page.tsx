import type { Metadata } from "next";
import { Search } from "lucide-react";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/wordpress";
import { parsePage } from "@/lib/site";
import { EmptyState, Pagination, PostCard } from "@/components/posts";

export const metadata: Metadata = { title: "Tìm kiếm", robots: { index: false, follow: false } };
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : "").trim().slice(0, 120);
  const page = parsePage(params.page);
  const results = query ? await getPosts({ search: query, page, perPage: 6 }) : undefined;
  if (results && page > Math.max(1, results.pages)) notFound();
  return (
    <div className="container archive-page search-page">
      <div className="page-intro">
        <p className="eyebrow">TÌM MỘT GÓC NHÌN</p>
        <h1>
          Bạn muốn đọc
          <br />
          <em>về điều gì?</em>
        </h1>
      </div>
      <form className="search-form page-search" action="/tim-kiem">
        <Search size={23} aria-hidden="true" />
        <label className="sr-only" htmlFor="page-search">
          Từ khóa tìm kiếm
        </label>
        <input
          id="page-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Nhập chủ đề hoặc từ khóa…"
          maxLength={120}
          required
        />
        <button className="button button-primary" type="submit">
          Tìm kiếm
        </button>
      </form>
      {results && (
        <p className="results-label">
          {results.total} kết quả cho <strong>“{query}”</strong>
        </p>
      )}
      {results?.posts.length ? (
        <>
          <div className="posts-grid">
            {results.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={results.pages} base="/tim-kiem" query={{ q: query }} />
        </>
      ) : (
        <EmptyState
          title={query ? "Chưa tìm thấy bài viết phù hợp" : "Một câu hỏi là điểm bắt đầu tốt"}
          text={
            query
              ? "Thử một từ khóa ngắn hơn hoặc một cách diễn đạt khác."
              : "Nhập từ khóa để tìm trong tiêu đề và nội dung bài viết."
          }
        />
      )}
    </div>
  );
}
