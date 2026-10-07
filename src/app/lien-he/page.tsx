import Link from "next/link";
import { ArrowUpRight, Mail, MessagesSquare, BriefcaseBusiness, MessageCircle } from "lucide-react";
import { safeContactUrl, site } from "@/lib/site";

export const metadata = {
  title: "Kết nối",
  description:
    "Kết nối với Truong Thinh Media để trao đổi ý tưởng, góp ý bài viết hoặc đề xuất chủ đề.",
  alternates: { canonical: "/lien-he" },
};
export default function ContactPage() {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) ? site.email : "";
  const channels = [
    ...(email ? [{ name: "Email", text: email, href: `mailto:${email}`, icon: Mail }] : []),
    ...(safeContactUrl(site.facebook)
      ? [
          {
            name: "Facebook",
            text: "Kết nối trên Facebook",
            href: safeContactUrl(site.facebook),
            icon: MessagesSquare,
          },
        ]
      : []),
    ...(safeContactUrl(site.linkedin)
      ? [
          {
            name: "LinkedIn",
            text: "Trao đổi về công việc",
            href: safeContactUrl(site.linkedin),
            icon: BriefcaseBusiness,
          },
        ]
      : []),
  ];
  return (
    <section className="container contact-page">
      <div className="page-intro">
        <p className="eyebrow">BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN</p>
        <h1>
          Bạn có một ý tưởng?
          <br />
          <em>Cùng trao đổi nhé.</em>
        </h1>
        <p>Góp ý một bài viết, đề xuất một chủ đề hoặc chia sẻ điều bạn đang quan tâm.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-card">
          <MessageCircle size={37} strokeWidth={1.4} />
          <h2>
            Một câu hỏi cũng là
            <br />
            một khởi đầu tốt.
          </h2>
          <p>
            Nếu góp ý về nội dung, hãy gửi kèm đường dẫn bài viết và phần bạn muốn trao đổi để cuộc
            trò chuyện có đủ ngữ cảnh.
          </p>
        </div>
        <div className="contact-channels">
          {channels.length ? (
            channels.map(({ name, text, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                className="contact-channel"
                target={href.startsWith("https:") ? "_blank" : undefined}
                rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
              >
                <Icon size={24} />
                <div>
                  <h2>{name}</h2>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={21} />
              </a>
            ))
          ) : (
            <div className="contact-pending">
              <Mail size={30} strokeWidth={1.4} />
              <h2>Kênh liên hệ đang được cập nhật</h2>
              <p>Thông tin liên hệ chính thức sẽ xuất hiện tại đây khi được cung cấp.</p>
              <Link className="text-link" href="/bai-viet">
                Trong lúc đó, khám phá blog <ArrowUpRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
