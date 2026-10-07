"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  function retry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }
  return (
    <div className="container error-page">
      <p className="eyebrow">TẠM THỜI GIÁN ĐOẠN</p>
      <h1>Chưa thể tải nội dung.</h1>
      <p>Kết nối đến nguồn bài viết đang gặp sự cố. Bạn có thể thử lại sau một chút.</p>
      <button type="button" className="button button-primary" onClick={retry} disabled={pending}>
        {pending ? "Đang tải…" : "Thử lại"} <RefreshCw size={17} />
      </button>
      <Link className="text-link" href="/">
        Về trang chủ
      </Link>
    </div>
  );
}
