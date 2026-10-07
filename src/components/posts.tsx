import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Compass, Cpu, PenLine } from "lucide-react";
import type { Category, Post } from "@/lib/types";
import { categoryUrl, formatDate, postUrl } from "@/lib/site";

export function PostCard({ post, horizontal = false }: { post: Post; horizontal?: boolean }) {
  return (
    <article className={`post-card${horizontal ? " post-card-horizontal" : ""}`}>
      <Link className="post-image" href={postUrl(post.slug)} tabIndex={-1} aria-hidden="true">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={
            horizontal
              ? "(max-width: 600px) 40vw, 240px"
              : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 400px"
          }
        />
        <span className="image-arrow">
          <ArrowUpRight size={21} />
        </span>
      </Link>
      <div className="post-card-body">
        {post.categories[0] && (
          <Link href={categoryUrl(post.categories[0].slug)} className="category-label">
            {post.categories[0].name}
          </Link>
        )}
        <h3>
          <Link href={postUrl(post.slug)}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <PostMeta post={post} />
      </div>
    </article>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="post-meta">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>
        <Clock size={13} aria-hidden="true" />
        {post.readingMinutes} phút đọc
      </span>
    </div>
  );
}

const icons = [PenLine, Compass, Cpu, BookOpen];
export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <div className="category-grid">
      {categories.map((category, index) => {
        const Icon = icons[index % icons.length];
        return (
          <Link
            href={categoryUrl(category.slug)}
            key={category.id}
            className={`category-tile category-tile-${index % 4}`}
          >
            <div className="category-tile-top">
              <span className="category-icon">
                <Icon size={23} strokeWidth={1.5} />
              </span>
              <ArrowUpRight size={19} />
            </div>
            <h3>{category.name}</h3>
            <p>
              {category.description || `Khám phá những bài viết về ${category.name.toLowerCase()}.`}
            </p>
            <span className="category-count">
              {category.count} bài viết <ArrowRight size={15} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Pagination({
  page,
  pages,
  base,
  query = {},
}: {
  page: number;
  pages: number;
  base: string;
  query?: Record<string, string>;
}) {
  if (pages <= 1) return null;
  function href(index: number) {
    const params = new URLSearchParams(query);
    if (index > 1) params.set("page", String(index));
    return `${base}${params.size ? `?${params}` : ""}`;
  }
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const range = Array.from({ length: Math.min(5, pages) }, (_, index) => start + index);
  return (
    <nav className="pagination" aria-label="Phân trang bài viết">
      {page > 1 && (
        <Link href={href(page - 1)} aria-label="Trang trước">
          ←
        </Link>
      )}
      {range[0] > 1 && (
        <>
          <Link href={href(1)}>1</Link>
          <span>…</span>
        </>
      )}
      {range.map((index) => (
        <Link
          key={index}
          href={href(index)}
          aria-label={`Trang ${index}`}
          aria-current={page === index ? "page" : undefined}
        >
          {index}
        </Link>
      ))}
      {range.at(-1)! < pages && (
        <>
          <span>…</span>
          <Link href={href(pages)}>{pages}</Link>
        </>
      )}
      {page < pages && (
        <Link href={href(page + 1)} aria-label="Trang tiếp theo">
          →
        </Link>
      )}
    </nav>
  );
}

export function EmptyState({
  title = "Chưa có bài viết ở đây",
  text = "Bạn có thể khám phá các chủ đề khác hoặc quay lại sau.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="empty-state">
      <BookOpen size={38} strokeWidth={1.3} />
      <h2>{title}</h2>
      <p>{text}</p>
      <Link href="/bai-viet" className="text-link">
        Khám phá bài viết <ArrowRight size={17} />
      </Link>
    </div>
  );
}
