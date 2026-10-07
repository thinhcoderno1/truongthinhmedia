import test from "node:test";
import assert from "node:assert/strict";
import { jsonLd, plainText, prepareContent } from "../src/lib/content";
import { safeContactUrl, parsePage } from "../src/lib/site";

test("CMS HTML removes executable content while retaining readable blocks", () => {
  const { html, toc } = prepareContent(
    `<script>alert(1)</script><h2 id="unsafe">Điều cần biết</h2><p onclick="bad()">Nội dung <strong>hữu ích</strong></p><a href="javascript:alert(1)" target="_blank">Nguồn</a><img src="/image.jpg" onerror="bad()"><table><tr><td>Giữ bảng</td></tr></table><iframe src="https://evil.example"></iframe>`,
  );
  assert.doesNotMatch(html, /<script|<iframe|onclick|onerror|javascript:/);
  assert.match(html, /<strong>hữu ích<\/strong>/);
  assert.match(html, /<table>/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.deepEqual(toc, [{ id: "dieu-can-biet", title: "Điều cần biết", level: 2 }]);
});
test("repeated headings produce distinct working table-of-contents targets", () => {
  const { toc, html } = prepareContent("<h2>Ví dụ</h2><h3>Ví dụ</h3><h2>Ví dụ</h2>");
  assert.equal(new Set(toc.map((item) => item.id)).size, 3);
  for (const item of toc) assert.ok(html.includes(`id="${item.id}"`));
});
test("structured data cannot break out of its script element", () => {
  const payload = { headline: "</script><script>alert(1)</script>" };
  assert.doesNotMatch(jsonLd(payload), /<\/script/);
  assert.deepEqual(JSON.parse(jsonLd(payload)), payload);
});
test("encoded WordPress titles become readable text", () => {
  assert.equal(
    plainText("<b>Content &amp; SEO</b> &#8212; thử nghiệm"),
    "Content & SEO — thử nghiệm",
  );
});
test("contact URLs reject executable and invalid protocols", () => {
  for (const url of ["javascript:alert(1)", "data:text/html,x", "http://example.com", "/local"])
    assert.equal(safeContactUrl(url), "");
  assert.equal(safeContactUrl("https://example.com/profile"), "https://example.com/profile");
});
test("pagination handles hostile and invalid query values safely", () => {
  for (const page of [undefined, "abc", "-1", "0", "1.5"]) assert.equal(parsePage(page), 1);
  assert.equal(parsePage("2"), 2);
  assert.equal(parsePage("999999999"), 10000);
});
