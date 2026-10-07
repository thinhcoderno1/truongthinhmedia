import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, PenLine } from "lucide-react";
import { ExploreBanner } from "@/components/footer";
import { Logo } from "@/components/brand";

export const metadata = {
  title: "Về blog",
  description:
    "Truong Thinh Media là blog cá nhân về content, marketing, công nghệ và những góc nhìn trong công việc sáng tạo.",
  alternates: { canonical: "/gioi-thieu" },
};
export default function AboutPage() {
  return (
    <>
      <section className="container about-page">
        <div className="page-intro">
          <p className="eyebrow">VỀ TRUONG THINH MEDIA</p>
          <h1>
            Một không gian viết.
            <br />
            <em>Nhiều điều để nghĩ.</em>
          </h1>
          <p>
            Cho những người làm nội dung, quan tâm đến marketing và luôn tò mò về cách công nghệ
            thay đổi công việc.
          </p>
        </div>
        <div className="about-story">
          <div className="about-art" aria-hidden="true">
            <span className="about-circle" />
            <Logo className="about-logo" decorative />
            <span className="about-art-caption">STAY CURIOUS. KEEP CREATING.</span>
            <span className="about-star">✳</span>
          </div>
          <div className="prose">
            <h2>Vì sao có không gian này?</h2>
            <p>
              Truong Thinh Media được xây dựng như một blog cá nhân: nơi tập hợp bài viết về
              content, marketing, công nghệ và những câu hỏi nảy sinh trong công việc sáng tạo.
            </p>
            <p>
              Định hướng của blog là giúp một chủ đề trở nên rõ hơn qua cách giải thích cụ thể, ví
              dụ có ngữ cảnh và nguồn tham khảo phù hợp.
            </p>
            <h2>Điều bạn có thể tìm thấy ở đây</h2>
            <p>
              Một câu hỏi về nội dung. Một cách nhìn về chiến dịch. Một công cụ đáng thử. Hoặc đơn
              giản là một ghi chép giúp bạn dừng lại và nghĩ thêm.
            </p>
            <Link href="/bai-viet" className="text-link">
              Bắt đầu bằng một bài viết <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="about-principles">
          <div>
            <PenLine size={27} />
            <h2>Viết rõ ràng</h2>
            <p>
              Đi thẳng vào câu hỏi. Giải thích bằng ngôn ngữ dễ hiểu và giữ thuật ngữ nhất quán.
            </p>
          </div>
          <div>
            <BookOpen size={27} />
            <h2>Có cơ sở</h2>
            <p>
              Phân biệt dữ liệu, kinh nghiệm và giả định. Nêu giới hạn khi một câu trả lời phụ thuộc
              ngữ cảnh.
            </p>
          </div>
          <div>
            <Compass size={27} />
            <h2>Giữ sự tò mò</h2>
            <p>
              Thử cách làm mới, đặt thêm câu hỏi và sẵn sàng điều chỉnh khi có thông tin tốt hơn.
            </p>
          </div>
        </div>
      </section>
      <ExploreBanner />
    </>
  );
}
