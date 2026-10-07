# Triển khai Coolify

Thiết kế cho một Application chạy Next.js qua Dockerfile. WordPress là CMS riêng, không được cài đặt hoặc tự provision bằng repo này. Cách cấu hình dựa trên [tài liệu Dockerfile của Coolify](https://coolify.io/docs/applications/builds/dockerfile).

## Cấu hình Application

1. Đưa source vào Git repository, gồm `package-lock.json`; không commit `.env.local`.
2. Coolify: New Application → chọn Git repository → Build Pack **Dockerfile**.
3. Base Directory `/`, Dockerfile Location `/Dockerfile`, Ports Exposes **3000**.
4. Domain: `https://truongthinhmedia.com`. Kiểm tra DNS của domain trỏ về máy chủ Coolify và proxy truy cập được cổng 80/443.
5. Cấu hình biến runtime trong bảng dưới. Không cần cung cấp URL CMS để build vì các route nội dung render tại runtime.
6. Khai báo hostname ảnh **ở build time** qua `WORDPRESS_IMAGE_HOSTS`. Dockerfile mặc định `cms.truongthinhmedia.com`; nếu CMS/CDN khác phải đổi giá trị build và rebuild.
7. Deploy, theo dõi log build/start, kiểm tra healthcheck `/api/health`.

## Biến môi trường

| Tên                     | Giai đoạn       | Giá trị/ý nghĩa                                            |
| ----------------------- | --------------- | ---------------------------------------------------------- |
| `WORDPRESS_API_URL`     | Runtime         | `https://<CMS>/wp-json/wp/v2`                              |
| `WORDPRESS_IMAGE_HOSTS` | Build ARG       | Hostname HTTPS CMS/CDN, phân cách dấu phẩy                 |
| `SITE_URL`              | Runtime         | `https://truongthinhmedia.com`, dùng cho canonical/sitemap |
| `ALLOW_INDEXING`        | Runtime         | `false` trong preview; `true` sau duyệt CMS thật           |
| `REVALIDATE_SECRET`     | Runtime, secret | Ít nhất 32 ký tự ngẫu nhiên                                |
| `CONTACT_EMAIL`         | Runtime         | Email chính thức nếu có                                    |
| `CONTACT_FACEBOOK_URL`  | Runtime         | URL HTTPS chính thức nếu có                                |
| `CONTACT_LINKEDIN_URL`  | Runtime         | URL HTTPS chính thức nếu có                                |
| `PORT`                  | Runtime         | `3000`, mặc định trong image                               |
| `HOSTNAME`              | Runtime         | `0.0.0.0`, mặc định trong image                            |

Secret không cần đưa vào build args. Next.js remote image allowlist được build trước, nên thay hostname ảnh ở runtime không tự cập nhật allowlist. Các URL ảnh HTTP từ CMS không thuộc allowlist HTTPS; production nên dùng HTTPS.

## Kiểm tra sau deploy

- `/api/health` trả 200. Đây là liveness của frontend, không chứng minh WordPress đang hoạt động.
- Trang chủ không còn nhãn demo khi nối CMS.
- Bài thật, chuyên mục, tác giả, ảnh và nội dung lấy đúng từ API production.
- Publish/sửa/gỡ một bài trong CMS rồi kiểm tra cơ chế cập nhật. Nếu chưa cài hook, cache có thời gian 300 giây và cập nhật theo truy cập.
- `/api/revalidate` từ chối request sai secret; request đúng làm mới dữ liệu ở lần đọc tiếp theo.
- Kiểm tra permalink, liên kết trong body, ảnh, tìm kiếm và mobile.
- Canonical, OG và sitemap dùng domain public; trang tìm kiếm luôn noindex.
- Khi đã duyệt nội dung, bật `ALLOW_INDEXING=true`, restart/redeploy và kiểm tra `/robots.txt`, sitemap cùng metadata.
- Tạo WordPress backup và quản lý SSL/domain CMS trong service CMS riêng.

Docker runner chạy với UID/GID 1001 và có thư mục `.next` thuộc user này để ghi cache. Một replica phù hợp cho giai đoạn đầu. Nếu dùng nhiều replica hoặc nhiều máy, cần giải pháp cache/invalidation dùng chung để webhook không chỉ làm mới một instance.

## Giới hạn kiểm chứng hiện tại

Chưa có quyền truy cập Coolify, CMS production hoặc cấu hình máy chủ. Docker Desktop CLI có trên máy phát triển nhưng Linux daemon chưa chạy, nên chưa build/chạy image Docker tại đây. Kiểm chứng standalone tại máy và fixture CMS được ghi trong `verification.md`; vẫn cần build image Linux và kiểm tra public domain khi triển khai thực tế.
