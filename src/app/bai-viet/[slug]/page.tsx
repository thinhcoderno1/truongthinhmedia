import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPost, getPosts } from "@/lib/wordpress";
import { categoryUrl, formatDate, isDemo, postUrl, site } from "@/lib/site";
import { jsonLd, prepareContent } from "@/lib/content";
import { PostCard, PostMeta } from "@/components/posts";
import { ArticleTools, ReadingProgress, Toc } from "@/components/article-tools";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl(post.slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl(post.slug),
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { html, toc } = prepareContent(post.content);
  const related = await getPosts({
    category: post.categories[0]?.id,
    exclude: post.id,
    perPage: 3,
  });
  return (
    <>
      <ReadingProgress />
      <article className="container article-page">
        <div className="breadcrumbs">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/bai-viet">Bài viết</Link>
          {post.categories[0] && (
            <>
              <span>/</span>
              <Link href={categoryUrl(post.categories[0].slug)}>{post.categories[0].name}</Link>
            </>
          )}
        </div>
        <header className="article-header">
          {post.categories[0] && (
            <Link className="category-label" href={categoryUrl(post.categories[0].slug)}>
              {post.categories[0].name}
            </Link>
          )}
          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-byline">
            <span className="author-initials" aria-hidden="true">
              {post.author
                .split(/\s+/)
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </span>
            <div>
              <span className="author-name">{post.author}</span>
              <PostMeta post={post} />
            </div>
            {post.modified !== post.date && (
              <span className="modified-date">Cập nhật: {formatDate(post.modified)}</span>
            )}
          </div>
        </header>
        <div className="article-cover">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            preload
            sizes="(max-width: 800px) 100vw, 1100px"
          />
        </div>
        <div className="article-layout">
          <div className="article-main">
            {isDemo && (
              <p className="article-demo">
                Bài viết minh họa cho giao diện. Nội dung chính thức sẽ được lấy từ WordPress.
              </p>
            )}
            <div
              id="article-content"
              className="prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {post.tags.length > 0 && (
              <div className="article-tags">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/tim-kiem?q=${encodeURIComponent(tag)}`}>
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            <ArticleTools />
            <Link className="text-link article-back" href="/bai-viet">
              <ArrowLeft size={17} />
              Quay lại tất cả bài viết
            </Link>
          </div>
          <aside className="article-aside">
            <Toc entries={toc} />
            <div className="aside-note">
              <span className="eyebrow">ĐỌC THÊM MỘT CHÚT</span>
              <p>Một ý tưởng mới có thể đang chờ ở bài viết tiếp theo.</p>
              <Link href="/bai-viet" className="text-link">
                Khám phá blog <ArrowUpRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
      {related.posts.length > 0 && (
        <section className="container section related-section" aria-labelledby="related-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CÙNG DÒNG QUAN TÂM</p>
              <h2 id="related-title">Có thể bạn muốn đọc tiếp</h2>
            </div>
          </div>
          <div className="posts-grid">
            {related.posts.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
      {!isDemo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: new URL(post.image, site.url).href,
              datePublished: post.date,
              dateModified: post.modified,
              author: { "@type": "Person", name: post.author },
              publisher: { "@type": "Organization", name: site.name, url: site.url },
              mainEntityOfPage: new URL(postUrl(post.slug), site.url).href,
              inLanguage: "vi-VN",
            }),
          }}
        />
      )}
    </>
  );
}
