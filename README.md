# Truong Thinh Media

Frontend blog cá nhân bằng Next.js App Router + TypeScript, quản lý nội dung bằng Headless WordPress, chuẩn bị triển khai Docker trên Coolify.

## Chạy tại máy

Yêu cầu Node.js 22 trở lên.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Để `WORDPRESS_API_URL` trống để xem giao diện bằng nội dung minh họa. Không cần WordPress để chạy demo.

Chạy bản production:

```powershell
npm run build
$env:PORT = '3010'
npm run start
```

Mở `http://localhost:3010`. Script start chuẩn bị asset cho standalone rồi khởi chạy `server.js`. Không chạy build trong lúc server đang sử dụng cùng thư mục `.next`.

## Các trang

| URL                           | Chức năng                                          |
| ----------------------------- | -------------------------------------------------- |
| `/`                           | Trang chủ, bài nổi bật, chuyên mục, bài mới        |
| `/bai-viet`                   | Danh sách có phân trang `?page=2`                  |
| `/bai-viet/[slug]`            | Bài viết, mục lục, chia sẻ liên kết, bài liên quan |
| `/chuyen-muc/[slug]`          | Bài theo chuyên mục                                |
| `/tim-kiem?q=...`             | Tìm kiếm và phân trang kết quả                     |
| `/gioi-thieu`                 | Giới thiệu định hướng blog                         |
| `/lien-he`                    | Kênh liên hệ lấy từ biến môi trường                |
| `/robots.txt`, `/sitemap.xml` | Điều khiển indexing và sitemap                     |
| `/api/health`                 | Kiểm tra tiến trình frontend còn hoạt động         |
| `/api/revalidate`             | POST có xác thực để làm mới cache CMS              |

## Kết nối WordPress

1. Dùng URL đầy đủ của REST API, ví dụ `https://cms.truongthinhmedia.com/wp-json/wp/v2` cho `WORDPRESS_API_URL`.
2. Kiểm tra `/posts?_embed=true` và `/categories` trả JSON từ máy chạy frontend. API đọc nội dung công khai không cần tài khoản quản trị.
3. Khai báo hostname HTTPS của ảnh vào `WORDPRESS_IMAGE_HOSTS`, phân cách bằng dấu phẩy. Ví dụ `cms.truongthinhmedia.com,cdn.example.com`. Cấu hình này cần có **khi build**; thay hostname phải rebuild. Với build tại máy, hostname từ `WORDPRESS_API_URL` cũng được tự thêm.
4. Bài viết được chọn nổi bật bằng Sticky Post trong WordPress. Nếu chưa có sticky, dùng bài mới nhất.
5. Tác giả, ngày đăng/cập nhật, chuyên mục, tags, featured image, excerpt và nội dung được lấy từ API. Thời gian đọc là ước tính với tốc độ 220 đơn vị tách bằng khoảng trắng/phút.
6. Bài password-protected không hiển thị nội dung; draft/private không được yêu cầu. Tổng số/phân trang WordPress có thể vẫn gồm bài bảo vệ bằng mật khẩu; nên để blog công khai chỉ gồm bài không khóa.

Frontend chỉ dùng nội dung mẫu khi **không cấu hình API**. API đã cấu hình mà lỗi sẽ hiển thị trang thông báo có nút thử lại; không tự thay bằng bài mẫu. Không có chức năng viết bài, sửa bài hoặc nhập mật khẩu WordPress trên frontend.

HTML được sanitize ở server, bỏ script, iframe, event handler và URL nguy hiểm. Hỗ trợ các block văn bản phổ biến: đoạn văn, heading, ảnh/caption, danh sách, quote, code, bảng, gallery đơn giản và columns. Plugin shortcode, form, embed và style inline tùy biến của WordPress cần tích hợp riêng; chúng không tự chạy trên Next.js.

Không gọi API CMS từ trình duyệt. Liên kết nội bộ trong nội dung WordPress nên dùng URL frontend `/bai-viet/[slug]`; không tự suy đoán hoặc sửa mọi permalink của CMS. Permalink frontend dùng cấu trúc này nhất quán, không phụ thuộc setting permalink theme WordPress.

## Cache và cập nhật bài

REST fetch được cache 300 giây, cùng tag `wordpress`. Trang được render tại runtime để nhận cấu hình CMS từ môi trường Coolify; dữ liệu fetch có cache riêng.

Webhook:

```http
POST /api/revalidate
Authorization: Bearer <REVALIDATE_SECRET>
```

Secret ít nhất 32 ký tự, chỉ lưu ở server. Không đặt trong query string hoặc dùng prefix `NEXT_PUBLIC_`. Endpoint không nhận tag tùy ý; làm hết hạn cache WordPress để request tiếp theo tải dữ liệu mới. Khi WordPress xuất bản, sửa, gỡ bài hoặc đổi chuyên mục, có thể dùng plugin/custom hook gửi POST này. Hook ở WordPress chưa được cài đặt trong dự án frontend.

## Nội dung và SEO

- Bài/chuyên mục demo là **minh họa**, có nhãn ở đầu trang và trong bài. Có thể chỉnh tại `src/lib/demo.ts`.
- Nội dung giới thiệu là định hướng ban đầu, không có hồ sơ cá nhân, thành tích hoặc số liệu được bịa. Cần chủ blog duyệt trước khi xuất bản.
- Trang liên hệ chỉ hiện các kênh có cấu hình hợp lệ. Không có form gửi giả hoặc email tự đặt.
- Mặc định `ALLOW_INDEXING=false`: robots chặn crawl, metadata noindex và sitemap rỗng.
- Demo luôn noindex, kể cả khi bật `ALLOW_INDEXING=true`.
- Chỉ bật indexing sau khi nối CMS thật, duyệt nội dung và kiểm tra domain canonical.
- Bài thật có canonical, Open Graph, metadata và BlogPosting JSON-LD. Trang tìm kiếm luôn noindex.
- Dữ liệu có cấu trúc không bảo đảm rich result hoặc thứ hạng tìm kiếm.

## Kiểm tra

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

E2E dùng Chrome cài tại máy, cổng 3010 (demo), 3101 (standalone CMS) và 3102 (fixture WordPress). Sau build, test tự khởi động server. Đảm bảo các cổng này trống hoặc đúng server kiểm thử; trên CI đặt `CI=true` để không tái sử dụng server cũ. Có thể thay `channel` trong `playwright.config.ts` và cài Chromium bằng `npx playwright install chromium` khi chạy môi trường khác.

Screenshot được ghi ở `artifacts/`; báo cáo ở `playwright-report/`. Các thư mục này không đưa vào image Docker.

## Tài liệu

- [Kế hoạch và cấu trúc triển khai](docs/implementation-plan.md)
- [Thiết kế và nội dung cần duyệt](docs/design-system.md)
- [Hướng dẫn Coolify](docs/coolify.md)
- [Kết quả kiểm chứng và giới hạn](docs/verification.md)

## Nguồn ảnh và font

Ảnh dùng làm minh họa không gian làm việc, không đại diện văn phòng hoặc nhân vật của chủ blog. Bản ảnh được lưu trong `public/images`; script tải lại ở `scripts/download-assets.mjs`.

| File             | URL nguồn ảnh                                                |
| ---------------- | ------------------------------------------------------------ |
| `writing.jpg`    | https://images.unsplash.com/photo-1499750310107-5fef28a66643 |
| `notebook.jpg`   | https://images.unsplash.com/photo-1455390582262-044cdead277a |
| `technology.jpg` | https://images.unsplash.com/photo-1516321318423-f06f85e504b3 |
| `analytics.jpg`  | https://images.unsplash.com/photo-1460925895917-afdab827c52f |
| `journal.jpg`    | https://images.unsplash.com/photo-1434030216411-0b793f4b4173 |
| `workspace.jpg`  | https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d |

Font Be Vietnam Pro và Lora được bundle từ Fontsource, không gọi Google Fonts tại runtime/build. Bản giấy phép font được giữ trong `public/licenses/`.

Tài liệu kỹ thuật đã tham khảo: [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [WordPress Posts API](https://developer.wordpress.org/rest-api/reference/posts/), [WordPress pagination](https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/), [Coolify Dockerfile](https://coolify.io/docs/applications/builds/dockerfile).
