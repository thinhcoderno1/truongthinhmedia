import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Brand footer />
          <p>
            Một không gian cho những ý tưởng rõ ràng
            <br />
            và những góc nhìn đáng chia sẻ.
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">KHÁM PHÁ</span>
          <Link href="/bai-viet">
            Tất cả bài viết <ArrowUpRight size={15} />
          </Link>
          <Link href="/bai-viet#chu-de">
            Chuyên mục <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">TRUONG THINH MEDIA</span>
          <Link href="/gioi-thieu">
            Về blog <ArrowUpRight size={15} />
          </Link>
          <Link href="/lien-he">
            Kết nối <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Truong Thinh Media.</span>
        <span>Đọc chậm một chút. Nghĩ thêm một chút.</span>
        <a href="#top" className="back-top">
          Về đầu trang <ArrowUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}

export function ExploreBanner() {
  return (
    <section className="explore-banner container" aria-labelledby="explore-title">
      <div className="explore-decoration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="explore-text">
        <p className="eyebrow">THÊM MỘT ĐIỀU ĐÁNG ĐỌC</p>
        <h2 id="explore-title">
          Ý tưởng tiếp theo
          <br />
          có thể bắt đầu từ đây.
        </h2>
        <p>Chọn một chủ đề. Đọc một bài viết. Mở thêm một góc nhìn.</p>
      </div>
      <Link href="/bai-viet" className="button button-white">
        Khám phá bài viết <ArrowRight size={19} />
      </Link>
    </section>
  );
}
