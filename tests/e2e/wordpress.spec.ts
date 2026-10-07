import { test, expect } from "@playwright/test";

const secret = "integration-test-secret-minimum-32-characters";
const origin = "http://127.0.0.1:3101";
const fixture = "http://127.0.0.1:3102";
test("standalone server reads runtime CMS settings, renders REST data and invalidates safely", async ({
  page,
  request,
}) => {
  await request.post(`${fixture}/control`, {
    data: { unavailable: false, title: "Bài viết từ WordPress & nội dung thật" },
  });
  const auth = { Authorization: `Bearer ${secret}` };
  await request.post(`${origin}/api/revalidate`, { headers: auth });
  await page.goto(origin);
  await expect(
    page.getByRole("heading", { name: "Bài viết từ WordPress & nội dung thật" }),
  ).toBeVisible();
  await expect(page.locator(".demo-notice")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await page.goto(`${origin}/bai-viet/bai-viet-cms-1`);
  await expect(page.getByText("Tác giả CMS", { exact: true })).toBeVisible();
  await expect(page.locator(".article-demo")).toHaveCount(0);
  await expect(page.locator(".prose script")).toHaveCount(0);
  expect(await page.evaluate(() => "__unsafe" in window)).toBe(false);
  const targets = await page
    .locator(".article-toc a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(new Set(targets).size).toBe(targets.length);
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent || "{}")));
  expect(schemas.some((schema) => schema["@type"] === "BlogPosting")).toBe(true);
  await page.goto(`${origin}/bai-viet?page=2`);
  await expect(page.locator(".post-card")).toHaveCount(1);
  const sitemap = await request.get(`${origin}/sitemap.xml`);
  expect(await sitemap.text()).toContain("/bai-viet/bai-viet-cms-7");
  expect((await request.post(`${origin}/api/revalidate`)).status()).toBe(401);
  expect(
    (
      await request.post(`${origin}/api/revalidate`, { headers: { Authorization: "Bearer wrong" } })
    ).status(),
  ).toBe(401);
  await request.post(`${fixture}/control`, { data: { title: "Nội dung đã cập nhật từ CMS" } });
  expect((await request.post(`${origin}/api/revalidate`, { headers: auth })).status()).toBe(200);
  await page.goto(`${origin}/bai-viet/bai-viet-cms-1`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nội dung đã cập nhật từ CMS");
  await request.post(`${fixture}/control`, { data: { unavailable: true } });
  await request.post(`${origin}/api/revalidate`, { headers: auth });
  await page.goto(`${origin}/bai-viet`);
  await expect(page.getByRole("heading", { name: "Chưa thể tải nội dung." })).toBeVisible();
  await expect(page.locator(".demo-notice")).toHaveCount(0);
  await request.post(`${fixture}/control`, { data: { unavailable: false } });
  await request.post(`${origin}/api/revalidate`, { headers: auth });
  await page.getByRole("button", { name: "Thử lại" }).click();
  await expect(page.locator(".post-card")).toHaveCount(6);
});
