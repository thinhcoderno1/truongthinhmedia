import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CategoryTiles, EmptyState, PostCard } from "@/components/posts";
import { ExploreBanner } from "@/components/footer";
import { Logo } from "@/components/brand";
import { getCategories, getFeaturedPost, getPosts } from "@/lib/wordpress";
import { categoryUrl, postUrl } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeaturedPost()]);
  const latest = await getPosts({ perPage: 6, exclude: featured?.id });
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="small-line" />
            BLOG CÁ NHÂN · TRUONG THINH MEDIA
          </p>
          <h1>
            Góc nhìn mới.
            <br />
            <em>Ý tưởng rõ hơn.</em>
          </h1>
          <p className="hero-description">
            Content, marketing và công nghệ.
            <br />
            Những điều đáng đọc, đáng nghĩ và đáng thử.
          </p>
          <Link className="button button-primary" href="/bai-viet">
            Khám phá bài viết <ArrowUpRight size={19} />
          </Link>
          <div className="hero-note">
            <span className="note-star" aria-hidden="true">
              ✳
            </span>
            <span>
              Một chút tò mò.
              <br />
              <strong>Nhiều cách nhìn thế giới.</strong>
            </span>
          </div>
        </div>
        {featured ? (
          <div className="hero-feature">
            <div className="feature-label">
              <span className="eyebrow">GÓC NHÌN NỔI BẬT</span>
              <span>
                01 <span className="feature-slash">/</span> ĐÁNG ĐỌC
              </span>
            </div>
            <Link
              href={postUrl(featured.slug)}
              className="hero-image-link"
              aria-label={`Đọc: ${featured.title}`}
            >
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                preload
                sizes="(max-width: 800px) 100vw, 55vw"
              />
              <span className="hero-image-mark" aria-hidden="true">
                <Logo decorative />
              </span>
            </Link>
            <div className="feature-caption">
              <div>
                {featured.categories[0] && (
                  <Link className="category-label" href={categoryUrl(featured.categories[0].slug)}>
                    {featured.categories[0].name}
                  </Link>
                )}
                <h2>
                  <Link href={postUrl(featured.slug)}>{featured.title}</Link>
                </h2>
              </div>
              <Link
                href={postUrl(featured.slug)}
                className="round-link"
                aria-label={`Đọc bài ${featured.title}`}
              >
                <ArrowUpRight size={25} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="hero-feature hero-feature-empty">
            <Sparkles size={44} strokeWidth={1} />
            <p>Những góc nhìn mới đang được chuẩn bị.</p>
            <Link className="text-link" href="/gioi-thieu">
              Tìm hiểu về blog <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </section>
      <div className="container topic-strip">
        <span>VIẾT VỀ NHỮNG ĐIỀU QUAN TÂM</span>
        <div>
          {categories.slice(0, 4).map((category) => (
            <Link key={category.id} href={categoryUrl(category.slug)}>
              {category.name}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </div>
      <section className="container section" id="chu-de" aria-labelledby="topics-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THEO DÒNG QUAN TÂM</p>
            <h2 id="topics-title">Bạn đang muốn khám phá gì?</h2>
          </div>
          <span className="section-aside">Chọn một chủ đề để bắt đầu.</span>
        </div>
        {categories.length ? (
          <CategoryTiles categories={categories.slice(0, 4)} />
        ) : (
          <p className="muted">Chuyên mục sẽ xuất hiện khi có bài viết được xuất bản.</p>
        )}
      </section>
      <section className="container section latest-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TỪ BLOG</p>
            <h2 id="latest-title">Những bài viết mới</h2>
          </div>
          <Link href="/bai-viet" className="text-link">
            Xem tất cả <ArrowUpRight size={18} />
          </Link>
        </div>
        {latest.posts.length ? (
          <div className="posts-grid">
            {latest.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
      <section className="container about-preview" aria-labelledby="about-title">
        <div className="about-art" aria-hidden="true">
          <span className="about-circle" />
          <Logo className="about-logo" decorative />
          <span className="about-art-caption">A SPACE FOR IDEAS</span>
          <span className="about-star">✳</span>
        </div>
        <div className="about-preview-copy">
          <p className="eyebrow">PHÍA SAU NHỮNG BÀI VIẾT</p>
          <h2 id="about-title">
            Không chỉ thêm thông tin.
            <br />
            <em>Thêm một cách nhìn.</em>
          </h2>
          <p>
            Truong Thinh Media là một không gian viết về content, marketing, công nghệ và những câu
            hỏi trong công việc sáng tạo.
          </p>
          <p>
            Ở đây, một ý tưởng đáng chia sẻ là một ý tưởng giúp bạn hiểu rõ hơn, nghĩ sâu hơn hoặc
            bắt đầu làm một điều cụ thể.
          </p>
          <Link href="/gioi-thieu" className="text-link">
            Tìm hiểu về blog <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ExploreBanner />
    </>
  );
}
