import { createServer } from "node:http";

let title = "Bài viết từ WordPress & nội dung thật";
let unavailable = false;
const category = {
  id: 10,
  name: "Chuyên mục CMS",
  slug: "chuyen-muc-cms",
  description: "Chuyên mục từ API giả lập để kiểm chứng tích hợp.",
  count: 7,
};
const posts = () =>
  Array.from({ length: 7 }, (_, index) => ({
    id: 100 + index,
    slug: `bai-viet-cms-${index + 1}`,
    title: {
      rendered: index === 0 ? title.replace(/&/g, "&amp;") : `Bài viết CMS số ${index + 1}`,
    },
    excerpt: { rendered: "<p>Mô tả bài viết lấy từ WordPress REST API.</p>" },
    content: {
      rendered:
        '<p>Nội dung API được hiển thị và kiểm tra an toàn.</p><h2>Đọc dữ liệu từ CMS</h2><p>Đây là một fixture kiểm thử, không phải CMS production.</p><img src="/images/notebook.jpg" alt="Ảnh nội dung" onerror="window.__unsafe=true"><script>window.__unsafe=true</script><h2>Đọc dữ liệu từ CMS</h2>',
      protected: false,
    },
    date_gmt: "2026-10-06T02:00:00",
    modified_gmt: "2026-10-07T02:00:00",
    sticky: index === 0,
    _embedded: {
      author: [{ name: "Tác giả CMS" }],
      "wp:featuredmedia": [{ source_url: "/images/writing.jpg", alt_text: "Ảnh fixture" }],
      "wp:term": [
        [{ ...category, taxonomy: "category" }],
        [{ id: 21, name: "WordPress", taxonomy: "post_tag" }],
      ],
    },
  }));
createServer(async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  const url = new URL(request.url, "http://127.0.0.1:3102");
  if (url.pathname === "/health") return response.end(JSON.stringify({ ok: true }));
  if (url.pathname === "/control" && request.method === "POST") {
    let body = "";
    for await (const chunk of request) body += chunk;
    const update = JSON.parse(body || "{}");
    if (typeof update.title === "string") title = update.title;
    if (typeof update.unavailable === "boolean") unavailable = update.unavailable;
    return response.end(JSON.stringify({ ok: true }));
  }
  if (unavailable) {
    response.statusCode = 500;
    return response.end(JSON.stringify({ error: "Fixture offline" }));
  }
  if (url.pathname.endsWith("/categories")) {
    response.setHeader("X-WP-TotalPages", "1");
    return response.end(JSON.stringify([category]));
  }
  if (url.pathname.endsWith("/posts")) {
    let data = posts();
    const slug = url.searchParams.get("slug");
    if (slug) data = data.filter((post) => post.slug === slug);
    const sticky = url.searchParams.get("sticky");
    if (sticky) data = data.filter((post) => post.sticky === (sticky === "true"));
    const exclude = url.searchParams.get("exclude");
    if (exclude) data = data.filter((post) => post.id !== Number(exclude));
    const search = url.searchParams.get("search");
    if (search)
      data = data.filter((post) =>
        post.title.rendered.toLowerCase().includes(search.toLowerCase()),
      );
    const perPage = Number(url.searchParams.get("per_page") || 10),
      page = Number(url.searchParams.get("page") || 1);
    const pages = Math.ceil(data.length / perPage);
    if (page > Math.max(1, pages)) {
      response.statusCode = 400;
      return response.end(JSON.stringify({ code: "rest_post_invalid_page_number" }));
    }
    response.setHeader("X-WP-Total", data.length);
    response.setHeader("X-WP-TotalPages", pages);
    return response.end(JSON.stringify(data.slice((page - 1) * perPage, page * perPage)));
  }
  response.statusCode = 404;
  response.end("{}");
}).listen(3102, "127.0.0.1", () => console.log("WordPress fixture: http://127.0.0.1:3102"));
