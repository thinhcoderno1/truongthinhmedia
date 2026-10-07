# Thiết kế giao diện

## Hướng thể hiện

Editorial hiện đại: nền giấy ấm, tiêu đề serif, nội dung sans-serif tiếng Việt, điểm nhấn xanh và ảnh không gian làm việc. Trang chủ dẫn từ bài nổi bật sang chuyên mục rồi bài mới. Trang bài viết ưu tiên đọc, có sidebar mục lục trên desktop và mục lục phía trên nội dung trên mobile.

## Tokens

| Vai trò           | Giá trị                        |
| ----------------- | ------------------------------ |
| Nền               | `#f8f7f3`                      |
| Nền card          | `#ffffff`                      |
| Chữ chính         | `#182332`                      |
| Chữ phụ           | `#626b76`                      |
| Đường phân cách   | `#dedfdc`                      |
| CTA/liên kết nhấn | `#295bdf`                      |
| Hover CTA         | `#1745b9`                      |
| Tiêu đề           | Lora 400/500, italic 500       |
| Chữ UI/nội dung   | Be Vietnam Pro 400/500/600/700 |
| Container         | 1240px gồm padding             |
| Bo góc            | 6–10px                         |

CSS responsive cho desktop, tablet và mobile; giảm chuyển động khi người đọc bật `prefers-reduced-motion`. Navigation có skip link, focus rõ, search dialog có nhãn, Escape và phím Ctrl/Cmd+K. Các action cần click/keyboard thật, không chỉ hiệu ứng hover.

## Hệ chữ và khả năng đọc

Cỡ chữ được cân đối lại sau phản hồi về chữ nhỏ. Các vai trò dùng token `rem` trong `src/app/globals.css`, dựa trên cỡ chữ gốc của trình duyệt; không khóa `html` ở một cỡ pixel cố định.

| Vai trò                                 | Desktop | Mobile |
| --------------------------------------- | ------- | ------ |
| Nội dung bài viết / sapo                | 18px    | 17px   |
| Đoạn giới thiệu, mô tả bài, ô tìm kiếm  | 16px    | 16px   |
| Menu, CTA, liên kết điều hướng          | 15px    | 15px   |
| Mô tả chuyên mục, mục lục, breadcrumb   | 14px    | 14px   |
| Ngày đăng, thời gian đọc, thông tin phụ | 13px    | 13px   |
| Nhãn ngắn, eyebrow                      | 12px    | 11px   |
| Tiêu đề thẻ bài                         | 26px    | 25px   |
| Tiêu đề section                         | 34px    | 28px   |

Các giá trị pixel trên tương ứng khi font gốc trình duyệt là 16px. Nội dung bài dùng giãn dòng 1.8, mô tả bài và chuyên mục dùng 1.75. Tiêu đề hero giữ phân cấp hiện có. Chuyên mục dùng flex để số bài nằm cùng đáy card; khoảng cách được điều chỉnh theo chữ lớn hơn. Menu thu gọn ở màn hình tối đa 800px để giữ nhãn dễ đọc trên tablet. Phần đọc bài có chiều rộng tối đa 744px ở bố cục desktop cùng sidebar.

## Nội dung hiện tại

Các chuyên mục Content & SEO, Digital Marketing, Công nghệ & AI, Góc nhìn cá nhân là giả định thiết kế. Khi nối CMS, tên, mô tả và số bài lấy từ WordPress. Logo ngang mới do người dùng cung cấp được lưu nguyên bản tại `public/brand/truong-thinh-media-horizontal.png`, dùng ở header, footer, hero, khối giới thiệu và ảnh Open Graph. Favicon dùng riêng ảnh vuông 600×600 nền trắng bo góc do người dùng cung cấp, tại `public/brand/favicon-truong-thinh-media.png`. Bản logo dọc trước đây được giữ trong thư mục brand để có thể khôi phục.

Ảnh logo ngang 1086×362 có nền trong suốt; vùng nội dung nằm tại x=64, y=112, rộng 958, cao 164 pixel. Component `Logo` dùng CSS để bỏ khoảng trống ngoài vùng nội dung khi hiển thị, không chỉnh sửa màu hoặc pixel ảnh gốc. Logo header rộng 252px desktop, 230px tablet và 168–220px điện thoại; footer rộng 252px, dấu nhận diện hero rộng 144px, logo trong ảnh Open Graph rộng 400px. Tất cả giữ đúng tỷ lệ. Header cao 88px desktop / 80px tablet / 76px điện thoại, với khoảng bù cuộn được cân đối tương ứng.

Không dùng người mẫu làm ảnh chân dung tác giả. Khối giới thiệu dùng logo được cung cấp. Không đặt số năm kinh nghiệm, khách hàng, testimonial, newsletter hoặc dịch vụ thương mại khi chưa được cung cấp.

## Cần duyệt trước publication

- Tagline và copy định hướng blog.
- Hồ sơ cá nhân thật nếu muốn thêm bio vào trang giới thiệu.
- Chuyên mục và bài featured chính thức trong CMS.
- Email/link xã hội qua env.
- Nội dung bài viết, nguồn tham khảo và quyền sử dụng ảnh production.
