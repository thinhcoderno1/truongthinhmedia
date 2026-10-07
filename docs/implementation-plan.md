# Implementation — Truong Thinh Media

## Phạm vi được duyệt

Frontend blog cá nhân Next.js, WordPress quản lý bài viết, Coolify triển khai. Thư mục ban đầu trống. Không có API, logo, hồ sơ tác giả hoặc kênh liên hệ chính thức; dùng dữ liệu minh họa có nhãn và định hướng blog trung lập để duyệt giao diện.

## Các phần triển khai

1. Nền tảng App Router + TypeScript, CSS tokens, font đóng gói cùng source.
2. Header/menu mobile/search dialog, footer, post cards, category tiles và CTA đọc thêm.
3. Trang chủ, danh sách, bài viết, chuyên mục, tìm kiếm, giới thiệu, liên hệ, 404/error/loading.
4. Lớp WordPress REST server-only: embedded author/media/terms, phân trang, sticky featured, tìm kiếm, timeout và lỗi API.
5. Sanitize HTML, mục lục tự động, thời gian đọc ước tính, copy link, related posts và reading progress.
6. Metadata, canonical, OG image, robots, sitemap, JSON-LD bài thật; indexing tắt cho demo.
7. Docker standalone với user không phải root, healthcheck, template môi trường và hướng dẫn Coolify.
8. Lint/typecheck/build, kiểm tra an toàn HTML, trình duyệt responsive và API fixture.

## Cấu trúc source

```text
src/app/                 Routes, metadata, API và CSS nền
src/components/          Header, footer, cards, công cụ đọc bài
src/lib/wordpress.ts     Adapter REST API, không phụ thuộc UI
src/lib/types.ts         Hợp đồng dữ liệu frontend
src/lib/demo.ts          Nội dung minh họa tập trung
src/lib/content.ts       Sanitize, TOC, xử lý text/JSON-LD
src/lib/site.ts          Cấu hình website và helpers
src/styles/article.css   Nội dung Gutenberg và bố cục bài viết
public/                  Ảnh minh họa, placeholder và favicon
scripts/                 Tải ảnh và khởi chạy standalone
tests/                   Kiểm tra nội dung, browser và fixture CMS
docs/                    Thiết kế, deploy và bằng chứng QA
```

## Những việc cần thông tin thực tế

- Kết nối API WordPress production và hostname ảnh/CDN.
- Duyệt danh mục, copy trang giới thiệu, hồ sơ tác giả, logo và kênh liên hệ.
- Cấu hình webhook trong WordPress nếu cần cập nhật ngay sau xuất bản.
- Đưa source vào repository, cấu hình Coolify, build image, kiểm tra DNS/HTTPS và bật indexing.

Các việc này không thay đổi khả năng chạy frontend bằng demo. Kết quả kiểm tra cục bộ được ghi riêng trong `verification.md`; không coi đó là bằng chứng website đã được deploy.
