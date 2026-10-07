import type { Category, Post } from "./types";

export const demoCategories: Category[] = [
  {
    id: 1,
    slug: "content-seo",
    name: "Content & SEO",
    description: "Viết có mục đích. Nội dung hữu ích bắt đầu từ việc hiểu người đọc.",
    count: 3,
  },
  {
    id: 2,
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Từ chiến lược đến những quyết định nhỏ trong một chiến dịch.",
    count: 2,
  },
  {
    id: 3,
    slug: "cong-nghe-ai",
    name: "Công nghệ & AI",
    description: "Thử công cụ mới, hiểu cách dùng và biết khi nào nên dừng lại.",
    count: 2,
  },
  {
    id: 4,
    slug: "goc-nhin-ca-nhan",
    name: "Góc nhìn cá nhân",
    description: "Ghi chép về công việc sáng tạo, cách học và những điều đáng nghĩ.",
    count: 2,
  },
];

const entries = [
  {
    slug: "viet-cho-nguoi-doc-truoc-khi-viet-cho-thuat-toan",
    title: "Viết cho người đọc, trước khi viết cho thuật toán.",
    excerpt:
      "Một bài viết tốt không bắt đầu từ mật độ từ khóa. Nó bắt đầu từ một câu hỏi thật và một câu trả lời đủ rõ để người đọc dùng được.",
    category: 1,
    image: "writing",
    sticky: true,
    date: "2026-10-06",
    content: `<p>Một người tìm kiếm thường đang có việc cần giải quyết. Họ có thể muốn hiểu một khái niệm, chọn giữa hai phương án hoặc sửa một lỗi cụ thể. Trước khi nghĩ đến cấu trúc SEO, hãy viết ra điều họ cần làm sau khi đọc.</p>
    <h2>Bắt đầu bằng câu hỏi mà người đọc đang có</h2><p>Thay vì mở đầu bằng lịch sử của chủ đề, thử đặt câu hỏi: “Nếu chỉ đọc một đoạn, người này cần biết điều gì?”. Với bài hướng dẫn, đó có thể là điều kiện áp dụng và kết quả mong đợi. Với bài so sánh, đó là tiêu chí lựa chọn.</p><p>Ví dụ, người tìm “cách viết brief nội dung” thường cần một mẫu có thể điền ngay. Hãy đưa mẫu lên trước, sau đó giải thích từng trường và một ví dụ đã điền.</p>
    <h2>Mỗi phần cần giúp người đọc tiến thêm một bước</h2><p>Heading không chỉ chia nhỏ trang. Nó cho người đọc biết phần tiếp theo sẽ giải quyết câu hỏi nào. “Các lưu ý” thường kém cụ thể hơn “Khi nào brief cần thêm nguồn tham khảo?”.</p><blockquote>Một đoạn văn đáng giữ lại khi nó làm rõ vấn đề, đưa ra bằng chứng hoặc giúp người đọc hành động.</blockquote>
    <h3>Thử kiểm tra bằng một tình huống cụ thể</h3><p>Giả sử một cửa hàng cần bài giải thích cách chọn sản phẩm. Đừng dừng ở danh sách tính năng. Hãy mô tả ai cần tính năng đó, khi nào nó không cần thiết và thông tin nào phải kiểm tra trước khi mua.</p>
    <h2>SEO là lớp hỗ trợ cho một câu trả lời tốt</h2><p>Tiêu đề rõ, liên kết nội bộ đúng chỗ và cấu trúc dễ đọc giúp người dùng tiếp cận nội dung. Chúng không thay thế được việc kiểm chứng nguồn, giải thích giới hạn và cập nhật thông tin.</p><ul><li>Đặt câu trả lời trực tiếp gần đầu bài.</li><li>Giữ thuật ngữ nhất quán, giải thích từ chuyên môn khi xuất hiện lần đầu.</li><li>Dẫn nguồn ngay cạnh khẳng định cần kiểm chứng.</li><li>Chỉ thêm liên kết khi nó giúp giải quyết câu hỏi tiếp theo.</li></ul>
    <h2>Checklist trước khi bấm xuất bản</h2><p>Đọc bài như một người chưa biết chủ đề. Bạn có thể làm theo hướng dẫn không? Các ví dụ có thật sự minh họa cho tiêu chí không? Có câu nào nghe chắc chắn hơn bằng chứng đang có không?</p><p>Không phải bài nào cũng cần dài. Một câu trả lời ngắn, đúng điều kiện áp dụng thường hữu ích hơn một bài bao phủ nhiều thứ nhưng thiếu trọng tâm.</p>`,
  },
  {
    slug: "search-intent-tu-tu-khoa-den-cau-hoi-that",
    title: "Search intent: đi từ từ khóa đến câu hỏi thật",
    excerpt:
      "Đọc được nhu cầu phía sau một truy vấn giúp bạn chọn đúng góc viết, cấu trúc và ví dụ.",
    category: 1,
    image: "notebook",
    date: "2026-10-05",
    content: `<p>Hai truy vấn có cùng chủ đề chưa chắc cần cùng một bài viết. “Email marketing là gì” và “cách viết email chào mừng” đặt người đọc ở hai thời điểm khác nhau.</p><h2>Nhận diện việc người đọc muốn hoàn thành</h2><p>Hãy ghi lại động từ thể hiện nhu cầu: hiểu, so sánh, chọn, cài đặt hay sửa lỗi. Đây là điểm bắt đầu để chọn định dạng nội dung, không phải một công thức cố định.</p><h2>Quan sát kết quả tìm kiếm trong đúng ngữ cảnh</h2><p>Kiểm tra truy vấn trên thị trường và ngôn ngữ bạn đang viết. Ghi nhận dạng trang xuất hiện, câu hỏi được trả lời và những điều còn thiếu. Kết quả tìm kiếm có thể thay đổi, vì vậy cần ghi ngày quan sát.</p><h3>Đừng sao chép cấu trúc của mọi bài đứng đầu</h3><p>Nếu người đọc cần một mẫu biểu, việc thêm nhiều phần định nghĩa có thể làm chậm họ. Cấu trúc nên bám vào nhiệm vụ, sau đó mới bổ sung nền tảng cần thiết.</p><h2>Lập bản đồ câu hỏi trước khi viết outline</h2><ul><li>Câu hỏi chính cần trả lời ngay là gì?</li><li>Người đọc cần chuẩn bị những gì?</li><li>Những trường hợp nào khiến câu trả lời thay đổi?</li><li>Sau bài này, họ có thể cần nội dung nào tiếp theo?</li></ul><h2>Kiểm tra một outline có đúng intent không</h2><p>Thử đọc riêng tiêu đề và heading. Nếu chưa nhận ra kết quả mà bài sẽ giúp đạt được, hãy viết lại chúng. Đây là kiểm tra biên tập ban đầu; hiệu quả thực tế còn cần được theo dõi sau khi xuất bản.</p>`,
  },
  {
    slug: "ai-trong-quy-trinh-sang-tao-noi-dung",
    title: "AI trong quy trình sáng tạo: trợ lý, không phải người cầm lái",
    excerpt:
      "Phân chia rõ việc giao cho công cụ và việc cần người làm giúp bản nháp có chiều sâu hơn.",
    category: 3,
    image: "technology",
    date: "2026-10-04",
    content: `<p>AI có thể giúp nhóm ý tưởng, kiểm tra cấu trúc và gợi ý cách diễn đạt. Nhưng một bản nháp trôi chảy chưa nói lên độ đúng của thông tin.</p><h2>Giao cho AI những tác vụ có tiêu chí kiểm tra</h2><p>Thay vì yêu cầu “viết hay hơn”, hãy chỉ rõ đối tượng đọc, vấn đề cần giải quyết và nội dung phải giữ nguyên. Với tác vụ nhóm câu hỏi, bạn có thể kiểm tra xem công cụ có bỏ sót hoặc trộn intent hay không.</p><h2>Giữ quyền quyết định ở phần bằng chứng và góc nhìn</h2><p>Người viết cần kiểm chứng số liệu, nguồn và tình huống thực tế. Không dùng một trích dẫn do AI tạo ra khi chưa mở được tài liệu gốc.</p><h3>Ví dụ một quy trình biên tập nhỏ</h3><ol><li>Người viết xác định câu hỏi và thu thập nguồn.</li><li>Công cụ đề xuất nhóm ý và cấu trúc.</li><li>Người viết chọn góc triển khai, bổ sung ví dụ.</li><li>Kiểm tra từng khẳng định trước khi xuất bản.</li></ol><h2>Không đưa dữ liệu riêng tư vào công cụ một cách mặc định</h2><p>Trước khi tải tài liệu, hãy kiểm tra quyền sử dụng, chính sách dữ liệu và cấu hình của công cụ. Nếu không cần tên hoặc số liệu cụ thể, có thể ẩn chúng trước khi xử lý.</p><h2>Đánh giá đầu ra bằng một checklist</h2><ul><li>Có câu khẳng định nào thiếu nguồn không?</li><li>Ví dụ có phù hợp với tình huống đang viết không?</li><li>Giọng văn có giữ được sự rõ ràng và tự nhiên không?</li><li>Phần nào cần viết lại bằng hiểu biết trực tiếp?</li></ul>`,
  },
  {
    slug: "do-luong-noi-dung-dung-dung-o-luot-xem",
    title: "Đo lường nội dung: đừng dừng ở lượt xem",
    excerpt:
      "Một bảng đo lường hữu ích cần gắn với mục tiêu của bài viết, thay vì gom thật nhiều con số.",
    category: 2,
    image: "analytics",
    date: "2026-10-03",
    content: `<p>Lượt xem cho biết nội dung được tiếp cận. Nó chưa cho biết người đọc có tìm được câu trả lời hay thực hiện hành động bạn mong đợi không.</p><h2>Chọn chỉ số theo mục tiêu của nội dung</h2><p>Bài giải thích có thể cần đánh giá khả năng tìm thấy thông tin. Bài hỗ trợ mua hàng có thể cần theo dõi lượt xem trang sản phẩm hoặc yêu cầu tư vấn. Không nên dùng chung một tiêu chí thành công cho mọi bài.</p><h2>Đặt lượt xem cạnh hành vi tiếp theo</h2><table><thead><tr><th>Mục tiêu</th><th>Tín hiệu nên xem thêm</th></tr></thead><tbody><tr><td>Giải đáp câu hỏi</td><td>Phản hồi người đọc, truy vấn dẫn vào bài</td></tr><tr><td>Khám phá chủ đề</td><td>Lượt chuyển sang bài liên quan</td></tr><tr><td>Cân nhắc dịch vụ</td><td>Hành động liên hệ đủ điều kiện</td></tr></tbody></table><h3>Phân biệt tín hiệu với kết luận</h3><p>Thời gian đọc ngắn có thể vì người dùng tìm thấy câu trả lời nhanh, hoặc vì họ bỏ đi. Cần đối chiếu thêm ngữ cảnh trước khi kết luận.</p><h2>Ghi lại thay đổi và điều kiện so sánh</h2><p>Khi sửa tiêu đề hoặc cấu trúc, ghi ngày thay đổi và thời gian đánh giá. Mùa vụ, nguồn traffic và chiến dịch có thể ảnh hưởng đến số liệu.</p><h2>Checklist cho một báo cáo nội dung</h2><ul><li>Chỉ số có định nghĩa rõ không?</li><li>Khoảng thời gian so sánh có tương đương không?</li><li>Có tách dữ liệu quan sát khỏi giả thuyết không?</li><li>Quyết định tiếp theo dựa trên tín hiệu nào?</li></ul>`,
  },
  {
    slug: "ghi-chep-de-nghi-ro-hon",
    title: "Ghi chép để nghĩ rõ hơn, không chỉ để nhớ",
    excerpt: "Một trang giấy trống đôi khi hữu ích hơn việc mở thêm một tab trình duyệt.",
    category: 4,
    image: "journal",
    date: "2026-10-02",
    content: `<p>Khi có quá nhiều ý tưởng, việc cần làm chưa chắc là thu thập thêm. Thử viết một câu mô tả vấn đề và một câu về quyết định bạn đang trì hoãn.</p><h2>Tách điều biết, điều đoán và điều cần hỏi</h2><p>Ba nhóm này giúp ghi chép bớt trở thành một danh sách suy nghĩ lẫn lộn. Một giả thuyết tốt vẫn cần được kiểm tra; ghi nó vào đúng nhóm giúp bạn nhớ điều đó.</p><h2>Dùng câu hỏi nhỏ để mở một vấn đề lớn</h2><p>“Làm nội dung tốt hơn” quá rộng để bắt đầu. “Người đọc đang dừng lại ở đoạn nào?” hoặc “Ví dụ này thiếu thông tin gì?” cho bạn một điểm làm việc cụ thể.</p><h3>Thử một mẫu ghi chép cuối ngày</h3><ul><li>Việc nào đã làm rõ hôm nay?</li><li>Điều gì vẫn chưa có bằng chứng?</li><li>Bước nhỏ nhất có thể làm tiếp là gì?</li></ul><h2>Đừng biến ghi chép thành một công việc trang trí</h2><p>Một hệ thống quá phức tạp có thể khiến bạn mất thời gian phân loại thay vì suy nghĩ. Bắt đầu bằng một nơi dễ tìm lại và một cách đặt tiêu đề đơn giản.</p><h2>Quay lại trang cũ với một câu hỏi mới</h2><p>Mỗi tuần, chọn một ghi chép và xem điều gì đã thay đổi. Bạn có thể đã có thêm dữ liệu, hoặc nhận ra câu hỏi ban đầu chưa đúng trọng tâm. Mẫu ghi chép này chỉ là một gợi ý để thử và điều chỉnh.</p>`,
  },
  {
    slug: "brief-noi-dung-tu-y-tuong-den-ban-thao",
    title: "Một brief tốt giúp bản thảo đi đúng hướng",
    excerpt: "Đừng giao một từ khóa rồi kỳ vọng người viết tự đoán đúng mọi thứ còn lại.",
    category: 1,
    image: "workspace",
    date: "2026-10-01",
    content: `<p>Brief nội dung là thỏa thuận về người đọc, câu hỏi cần trả lời và tiêu chí hoàn thành. Nó không cần dài, nhưng cần đủ rõ để người viết ra quyết định.</p><h2>Những trường thông tin cần có trong brief</h2><ul><li>Đối tượng đọc và điều họ đã biết.</li><li>Câu hỏi chính, mục tiêu và định dạng bài.</li><li>Nguồn bắt buộc, giới hạn thông tin và nội dung cần tránh.</li><li>Ví dụ mong muốn, hành động tiếp theo và tiêu chí duyệt.</li></ul><h2>Cho ví dụ về mức độ chi tiết mong đợi</h2><p>Nếu muốn bài hướng dẫn có thể làm theo, ghi rõ cần điều kiện đầu vào, từng bước thao tác và cách kiểm tra kết quả. “Viết chuyên sâu” chưa đủ để người viết hiểu độ sâu bạn cần.</p><h3>Khi nào cần bổ sung tài liệu nguồn?</h3><p>Với nội dung kỹ thuật, giá, chính sách hoặc tính năng sản phẩm, cần tài liệu đã được xác nhận. Không để người viết đoán thông tin có thể thay đổi.</p><h2>Chốt tiêu chí duyệt trước khi bắt đầu</h2><p>Tách yêu cầu bắt buộc khỏi gợi ý. Ví dụ: phải giữ đúng tên sản phẩm là yêu cầu; một cách mở bài cụ thể có thể chỉ là gợi ý.</p><h2>Checklist kiểm tra brief</h2><p>Người chưa tham gia cuộc họp có hiểu việc cần làm không? Có mục nào cần dữ liệu mà chưa có nguồn không? Các yêu cầu có mâu thuẫn với nhu cầu của người đọc không?</p>`,
  },
  {
    slug: "landing-page-mot-trang-mot-hanh-dong",
    title: "Landing page: một trang, một hành động rõ ràng",
    excerpt:
      "Trước khi sửa màu nút, hãy kiểm tra người đọc có hiểu mình đang được đề nghị điều gì không.",
    category: 2,
    image: "technology",
    date: "2026-09-30",
    content: `<p>Một landing page thường phục vụ một hành động chính: đăng ký, mua hàng hoặc yêu cầu tư vấn. Mỗi phần nên giúp người đọc hiểu đề nghị và đánh giá sự phù hợp.</p><h2>Viết đề nghị bằng ngôn ngữ của người dùng</h2><p>Tiêu đề nên cho biết sản phẩm giúp giải quyết vấn đề gì và dành cho ai. Tránh thêm lời hứa khi chưa có bằng chứng hoặc điều kiện áp dụng.</p><h2>Đặt bằng chứng cạnh điều cần chứng minh</h2><p>Thông số, hình ảnh và phản hồi cần có nguồn, ngữ cảnh và quyền sử dụng. Một số lượng khách hàng không có ngày cập nhật khó giúp người đọc đánh giá.</p><h3>Nêu giới hạn trước khi người đọc hành động</h3><p>Điều kiện dùng thử, chi phí phát sinh và đối tượng không phù hợp nên được viết rõ. Đây cũng là cách giảm những yêu cầu không đúng nhu cầu.</p><h2>CTA cần nói rõ điều sẽ xảy ra tiếp theo</h2><p>“Nhận tư vấn cấu hình” cụ thể hơn “Khám phá ngay” nếu bước tiếp theo là một cuộc trao đổi. Biểu mẫu chỉ nên hỏi những thông tin cần để xử lý yêu cầu.</p><h2>Kiểm tra trang trên điện thoại</h2><ul><li>Tiêu đề và hành động chính có dễ thấy không?</li><li>Form có nhãn, báo lỗi và cách sửa rõ không?</li><li>Nút cố định có che nội dung không?</li><li>Trang có tải được khi mạng chậm không?</li></ul>`,
  },
  {
    slug: "chon-cong-cu-moi-tu-mot-viec-cu",
    title: "Chọn công cụ mới, bắt đầu từ một việc cũ",
    excerpt:
      "Một ứng dụng mới chỉ đáng thêm vào quy trình khi nó giải quyết được một điểm vướng cụ thể.",
    category: 3,
    image: "workspace",
    date: "2026-09-29",
    content: `<p>Danh sách tính năng dễ khiến một công cụ trông hấp dẫn. Nhưng trước khi thử, hãy ghi lại việc bạn đang mất thời gian hoặc thường làm sai.</p><h2>Xác định điểm vướng trong quy trình hiện tại</h2><p>Nêu một tình huống cụ thể: tìm tài liệu chậm, chuyển dữ liệu nhiều lần hay khó theo dõi phiên bản. Chọn công cụ theo tình huống đó sẽ dễ đánh giá hơn.</p><h2>Thử với một tác vụ nhỏ và dữ liệu phù hợp</h2><p>Đặt tiêu chí trước: đầu ra cần đúng đến mức nào, ai kiểm tra và có thể xuất dữ liệu ra sao. Không đưa dữ liệu nhạy cảm vào thử nghiệm nếu chưa kiểm tra quyền và chính sách.</p><h3>Tính cả chi phí đổi thói quen</h3><p>Thời gian học, chuyển dữ liệu và phối hợp nhóm là chi phí thực tế. Một công cụ ít tính năng hơn vẫn có thể phù hợp hơn nếu mọi người dùng được.</p><h2>Giữ một lối thoát khi công cụ không phù hợp</h2><p>Kiểm tra khả năng xuất dữ liệu, định dạng tệp và quyền truy cập. Quy trình không nên phụ thuộc vào một tài khoản cá nhân mà nhóm không thể thay thế.</p><h2>Ra quyết định sau giai đoạn thử</h2><ul><li>Điểm vướng ban đầu đã được giải quyết chưa?</li><li>Có phát sinh công việc thủ công mới không?</li><li>Kết quả có thể kiểm tra và lưu lại không?</li><li>Chi phí có phù hợp với tần suất sử dụng không?</li></ul>`,
  },
  {
    slug: "giu-mot-khoang-trong-cho-y-tuong",
    title: "Giữ một khoảng trống cho ý tưởng",
    excerpt: "Không phải khoảng thời gian nào cũng cần được lấp đầy bằng một nguồn thông tin mới.",
    category: 4,
    image: "journal",
    date: "2026-09-28",
    content: `<p>Sáng tạo cần thông tin, nhưng cũng cần thời gian để sắp xếp thông tin đó. Một khoảng nghỉ ngắn có thể là lúc bạn nhận ra hai ý tưởng đang liên quan đến nhau.</p><h2>Nhận ra khi nào bạn đang thu thập quá nhiều</h2><p>Nếu lưu thêm tài liệu nhưng chưa dùng được gì từ tài liệu cũ, thử dừng lại để chọn một vấn đề cần giải quyết. Không cần biến mỗi điều thú vị thành một công việc.</p><h2>Tạo một nhịp làm việc có chỗ để suy nghĩ</h2><p>Có thể thử tách giờ đọc nguồn khỏi giờ viết nháp. Đây là một cách tổ chức để thử, không phải lịch làm việc phù hợp với tất cả mọi người.</p><h3>Ghi ý tưởng trước khi đánh giá</h3><p>Đặt ý tưởng vào một ghi chép ngắn, rồi quay lại xem nó giải quyết câu hỏi nào. Việc đánh giá ngay đôi khi khiến bạn bỏ qua những liên hệ chưa rõ.</p><h2>Chọn một việc nhỏ để kết thúc vòng suy nghĩ</h2><p>Một outline, một đoạn văn hoặc một câu hỏi gửi cho người có chuyên môn giúp ý tưởng tiến lên. Kết quả cụ thể cũng giúp bạn biết cần thêm thông tin gì.</p><h2>Điều chỉnh theo nhịp của mình</h2><p>Nếu cách làm khiến bạn khó tập trung hơn, hãy thay đổi. Mục tiêu là dành được sự chú ý cho một vấn đề, không phải giữ một phương pháp chỉ vì nó nghe có vẻ hay.</p>`,
  },
];

export const demoPosts: Post[] = entries.map((entry, index) => ({
  id: index + 1,
  slug: entry.slug,
  title: entry.title,
  excerpt: entry.excerpt,
  content: entry.content,
  date: `${entry.date}T02:00:00Z`,
  modified: `${entry.date}T02:00:00Z`,
  image: `/images/${entry.image}.jpg`,
  imageAlt: "Ảnh minh họa không gian làm việc và sáng tạo",
  author: "Truong Thinh Media",
  categories: demoCategories.filter((category) => category.id === entry.category),
  tags:
    entry.category === 1
      ? ["Nội dung", "Biên tập"]
      : entry.category === 3
        ? ["Công cụ", "Quy trình"]
        : ["Ý tưởng", "Công việc"],
  sticky: entry.sticky || false,
  readingMinutes: Math.max(
    1,
    Math.ceil(entry.content.replace(/<[^>]*>/g, " ").split(/\s+/).length / 220),
  ),
}));
