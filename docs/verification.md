# Kết quả kiểm chứng

Ngày kiểm tra: **07/10/2026**, tại `D:\Project-TruongThinhMedia`, Windows, Node.js 22.15.1, Chrome headless. Đây là bằng chứng cục bộ, không phải kết quả deployment public.

## Cập nhật favicon riêng

- Favicon dùng nguyên bản ảnh `C:\Users\interdigi 03\Downloads\KLVN\BlogPost\favicon-truongthinhmedia.png`, được chép vào `public/brand/favicon-truong-thinh-media.png`: PNG 600×600, có alpha, nền trắng bo góc.
- SHA-256 file gốc và bản trong dự án khớp: `C2ADEB75CB43167FE6624332C90C2B68B5DBD2136252921FA996FF1AAFBA68AE`.
- Metadata root trỏ favicon đến URL riêng mới, khai báo `image/png` và kích thước `600x600`; logo ngang giao diện và ảnh Open Graph không đổi.
- Build và lint PASS, exit 0. Kiểm tra bằng Chrome trên trang chủ, bài viết, giới thiệu và liên hệ: mỗi trang có đúng một favicon mới, tải HTTP 200, hash nội dung khớp file và giải mã thành ảnh 600×600. Kết quả lưu tại `artifacts/favicon-qa.json`.

## Thay bằng logo ngang mới

- Dùng nguyên bản file `logo-truongthinhmedia-02.png` tại `public/brand/truong-thinh-media-horizontal.png` cho các vị trí nhận diện hiện có. SHA-256 cả file gốc và file trong dự án: `A6709B4BF3B45B30C5D87DB35C820D42ED20011C730CD5466C06515A0295380E`.
- CSS căn vùng nội dung 958×164 của ảnh 1086×362, giữ đúng tỷ lệ và màu gốc. Header được thu gọn theo logo ngang; kích thước chi tiết ở `design-system.md`.
- Build và lint PASS, exit 0; E2E **9/9 PASS, 43.8 giây**.
- Kiểm tra thêm header ở 320, 375, 600, 601, 768, 800, 801, 900, 1024 và 1440px: không tràn ngang, không chồng logo lên menu hoặc nút thao tác. Kết quả: `artifacts/horizontal-logo-layout.json`.
- Đã xem trực tiếp ảnh trang chủ desktop/mobile, khối giới thiệu và footer mobile. Ảnh Open Graph trả HTTP 200, `image/png`, đã xem kết quả. Ảnh riêng của lần cập nhật này có tiền tố `artifacts/horizontal-logo-`.

## Cập nhật logo dọc trước đó

- Dùng `public/brand/truong-thinh-media.png` cho header, footer, dấu nhận diện ở ảnh hero, khối giới thiệu, favicon và ảnh Open Graph.
- File trong dự án khớp byte với PNG gốc; SHA-256: `A117B025879E6B5C53C181AB352337A5B5E36B2BA2224971BC931958B1C2B922`. CSS căn vùng logo có nội dung, giữ nguyên màu và tỷ lệ ảnh.
- Production build và lint: PASS, exit 0. E2E: **9/9 PASS, 44.0 giây**, gồm bố cục 320 / 375 / 768 / 1440px, tương tác, accessibility tự động và adapter WordPress.
- Đã xem screenshot trang chủ desktop/mobile, khối giới thiệu mobile và footer desktop/mobile. Logo không bị kéo giãn hoặc cắt mất chữ.
- Ảnh Open Graph trả HTTP 200, `image/png`; đã xem trực tiếp kết quả tại `artifacts/logo-opengraph.png`. Các ảnh kiểm tra riêng nằm ở `artifacts/logo-about-*.png` và `artifacts/logo-footer-*.png`.

## Cập nhật khả năng đọc theo phản hồi về font size

Đã chỉnh `src/app/globals.css` và `src/styles/article.css`: nội dung bài 18px desktop / 17px mobile, nội dung thông thường 16px, menu/CTA 15px, thông tin phụ 13–14px. Giãn dòng bài 1.8; card chuyên mục, khoảng cách và menu tablet được cân đối theo chữ lớn hơn. Định nghĩa hệ chữ ở `design-system.md`.

- Production build và lint sau thay đổi: PASS, exit 0.
- Bộ E2E hiện có: **9/9 PASS, 43.6 giây**, gồm responsive, accessibility tự động và các tương tác hiện có.
- Kiểm tra bổ sung trang chủ, bài viết, tìm kiếm và giới thiệu ở **320, 375, 640, 768, 1024, 1440px**: không phát hiện tràn ngang.
- Tăng cỡ chữ gốc lên **200% tại viewport 1440px** trên trang chủ, bài viết và tìm kiếm: không phát hiện tràn ngang.
- Tổng 27 trạng thái của kiểm tra bổ sung; kết quả và cỡ chữ tính toán thực tế lưu ở `artifacts/typography-qa.json`.
- So sánh SHA-256 tất cả file source không phải CSS: không thay đổi. Nội dung, dữ liệu, liên kết và logic tương tác được giữ nguyên.
- Screenshot trước chỉnh lưu ở `artifacts/typography-before/`; screenshot hiện tại được cập nhật trong `artifacts/`. Có thêm `article-reading-375.png` và `article-reading-1440.png` để xem chữ ở vùng đọc.

Các con số kiểm tra ban đầu bên dưới được giữ làm bằng chứng của lần triển khai đầu tiên.

## Kiểm tra triển khai ban đầu

| Kiểm tra               | Kết quả                                  |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | PASS, production build hoàn tất, exit 0  |
| `npm run lint`         | PASS, exit 0                             |
| `npm run typecheck`    | PASS, exit 0                             |
| `npm run test`         | PASS, 6/6 tests an toàn nội dung, exit 0 |
| `npm run test:e2e`     | PASS, 9/9 tests, 44.0 giây, exit 0       |
| `npm audit --omit=dev` | 0 vulnerabilities được báo cáo           |

## Những hành vi đã kiểm chứng

- Trang chủ đến bài viết, mục lục đến heading thực và sao chép liên kết vào clipboard.
- Tìm kiếm qua dialog, đóng bằng Escape, truy vấn không dấu ở demo, kết quả rỗng và phân trang.
- Danh sách 6 bài/trang, trang 2 có 3 bài trong demo; chuyên mục lọc đúng bài.
- Canonical riêng cho trang phân trang; demo noindex và robots chặn crawl.
- Bài không tồn tại và trang phân trang vượt giới hạn trả HTTP 404.
- Menu mobile mở/đóng và chuyển trang.
- Trang chủ, danh sách, bài viết, chuyên mục, giới thiệu, liên hệ, tìm kiếm và 404 không tràn ngang ở **320 / 375 / 768 / 1440px**.
- Ảnh được buộc tải đầy đủ trong kiểm tra để xác nhận không có ảnh lỗi trước khi chụp screenshot.
- Không có lỗi JavaScript trình duyệt trong các luồng responsive đã kiểm tra.
- Axe với các rules WCAG 2 A/AA và 2.1 AA không phát hiện violation ở trang chủ, bài viết, liên hệ, search dialog và menu mobile đã kiểm tra. Kết quả tự động này không thay thế audit accessibility toàn diện.

## Kiểm chứng adapter WordPress

Chạy **standalone production server từ cùng bản build**, cấu hình CMS ở runtime qua env, dùng API fixture cục bộ. Đã xác nhận:

- Hiển thị title, excerpt, tác giả, ảnh, chuyên mục và nội dung từ REST API; không còn nhãn demo.
- Metadata indexing bật khi có CMS và được cho phép.
- HTML độc hại trong fixture không thực thi; mục lục tạo ID riêng cho heading trùng.
- JSON-LD có BlogPosting cho bài thật theo nguồn dữ liệu CMS.
- Phân trang dùng `X-WP-Total`/`X-WP-TotalPages`; sitemap có tất cả 7 bài fixture.
- Webhook không cấu hình trả 503; secret sai/missing khi cấu hình trả 401; secret đúng trả 200.
- Sửa title qua fixture và gửi webhook cập nhật bài ở request tiếp theo.
- API fixture lỗi 500 hiển thị trạng thái lỗi, không thay nội dung mẫu. Sau khi API phục hồi, nút Thử lại lấy lại dữ liệu và hiển thị danh sách.

Log lỗi CMS 500 xuất hiện trong E2E là tình huống lỗi cố ý của fixture, không phải lỗi còn tồn tại sau kiểm tra.

## Ảnh và báo cáo

- `artifacts/home-320.png`, `home-375.png`, `home-768.png`, `home-1440.png`: toàn trang.
- `artifacts/home-viewport-375.png`, `home-viewport-1440.png`: màn hình đầu.
- `artifacts/article-375.png`, `article-1440.png`: toàn trang bài viết.
- `playwright-report/index.html`: báo cáo E2E.

Đã xem trực tiếp ảnh trang chủ desktop/mobile và trang bài viết desktop để kiểm tra bố cục, hình ảnh và phân cấp chữ.

## Dependency và giới hạn

- Audit production báo cáo 0 vulnerabilities. Audit đầy đủ còn 5 mục high trong chuỗi dev dependency `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`, liên quan [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Phiên bản braces được registry trả về vẫn là 3.0.3. Không áp dụng `audit fix --force` vì đề xuất hiện tại hạ major của eslint-config-next. Các package lint này không được dùng bởi runtime ứng dụng; vẫn cần theo dõi bản vá upstream.
- Docker CLI có sẵn nhưng Docker Desktop Linux daemon không chạy. **Chưa build hoặc chạy Docker image Linux**. Đã kiểm tra runner standalone tại máy, Dockerfile và hướng dẫn Coolify đã được chuẩn bị.
- **Chưa kết nối WordPress production, deploy Coolify, xác minh DNS/HTTPS hoặc kiểm tra trên domain public.**
- Không có Lighthouse score, số liệu Core Web Vitals thực tế hoặc cam kết thứ hạng tìm kiếm.
- Chưa có contact/author profile chính thức; trang liên hệ hiện trạng thái cập nhật thay vì email/form giả.

Tài liệu pagination và canonical tham khảo: [Google Search Central](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).
