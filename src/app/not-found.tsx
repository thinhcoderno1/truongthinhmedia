import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="container error-page">
      <span className="error-number">
        404<span>.</span>
      </span>
      <p className="eyebrow">LẠC KHỎI TRANG GIẤY</p>
      <h1>Góc nhìn này chưa có ở đây.</h1>
      <p>Đường dẫn có thể đã thay đổi hoặc nội dung chưa được xuất bản.</p>
      <Link className="button button-primary" href="/bai-viet">
        Tìm một bài viết khác <ArrowRight size={18} />
      </Link>
    </div>
  );
}
