import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test("article navigation, working TOC, safe demo SEO and copying a link", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Góc nhìn mới.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await page
    .getByRole("heading", { name: "Viết cho người đọc, trước khi viết cho thuật toán." })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(/\/bai-viet\/viet-cho/);
  const tocLink = page
    .getByRole("navigation", { name: "Mục lục bài viết" })
    .getByRole("link")
    .first();
  await tocLink.click();
  const href = await tocLink.getAttribute("href");
  await expect(page.locator(href!)).toBeInViewport();
  await page.getByRole("button", { name: "Sao chép liên kết" }).click();
  await expect(page.getByRole("button", { name: "Đã sao chép" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /https:\/\/truongthinhmedia.com\/bai-viet\//,
  );
});

test("search dialog, diacritic-insensitive results, empty results and pagination", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mở tìm kiếm" }).click();
  await page.getByRole("searchbox", { name: "Từ khóa tìm kiếm" }).fill("thuat toan");
  await page.getByRole("button", { name: "Tìm kiếm", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Viết cho người đọc, trước khi viết cho thuật toán." }),
  ).toBeVisible();
  await page.goto("/tim-kiem?q=zzzzzzzzzz");
  await expect(page.getByRole("heading", { name: "Chưa tìm thấy bài viết phù hợp" })).toBeVisible();
  await page.goto("/bai-viet");
  await expect(page.locator(".post-card")).toHaveCount(6);
  await page
    .getByRole("navigation", { name: "Phân trang bài viết" })
    .getByRole("link", { name: "Trang 2", exact: true })
    .click();
  await expect(page.locator(".post-card")).toHaveCount(3);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://truongthinhmedia.com/bai-viet?page=2",
  );
  await page.goto("/chuyen-muc/content-seo");
  await expect(page.locator(".post-card")).toHaveCount(3);
});

test("HTTP states, demo robots, health and protected webhook", async ({ request }) => {
  expect((await request.get("/bai-viet/khong-ton-tai")).status()).toBe(404);
  expect((await request.get("/bai-viet?page=999")).status()).toBe(404);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  expect(await (await request.get("/api/health")).json()).toEqual({ status: "ok" });
  expect((await request.post("/api/revalidate")).status()).toBe(503);
});

for (const width of [320, 375, 768, 1440]) {
  test(`responsive layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const path of [
      "/",
      "/bai-viet",
      "/bai-viet/viet-cho-nguoi-doc-truoc-khi-viet-cho-thuat-toan",
      "/chuyen-muc/content-seo",
      "/gioi-thieu",
      "/lien-he",
      "/tim-kiem?q=SEO",
      "/khong-ton-tai",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, `${path} should fit at ${width}px`).toBe(false);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      const brokenImages = await page.locator("img").evaluateAll(async (nodes) => {
        const images = nodes as HTMLImageElement[];
        images.forEach((image) => (image.loading = "eager"));
        await Promise.allSettled(images.map((image) => image.decode()));
        return images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src);
      });
      expect(brokenImages).toEqual([]);
      if (path.includes("/bai-viet/viet-") && [375, 1440].includes(width)) {
        await mkdir("artifacts", { recursive: true });
        await page.screenshot({ path: `artifacts/article-${width}.png`, fullPage: true });
      }
    }
    await page.goto("/");
    if (width <= 600) {
      await page.getByRole("button", { name: "Mở menu" }).click();
      await page
        .getByRole("navigation", { name: "Điều hướng trên điện thoại" })
        .getByRole("link", { name: "Giới thiệu" })
        .click();
      await expect(page).toHaveURL(/gioi-thieu/);
      await expect(page.getByRole("button", { name: "Mở menu" })).toBeVisible();
      await page.goto("/");
    }
    expect(errors).toEqual([]);
    await page.locator("img").evaluateAll(async (nodes) => {
      const images = nodes as HTMLImageElement[];
      images.forEach((image) => (image.loading = "eager"));
      await Promise.allSettled(images.map((image) => image.decode()));
    });
    await mkdir("artifacts", { recursive: true });
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
    if ([375, 1440].includes(width))
      await page.screenshot({ path: `artifacts/home-viewport-${width}.png` });
  });
}

test("accessibility for homepage, article, search dialog and mobile menu", async ({ page }) => {
  for (const path of [
    "/",
    "/bai-viet/viet-cho-nguoi-doc-truoc-khi-viet-cho-thuat-toan",
    "/lien-he",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${path}: ${JSON.stringify(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })))}`,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Mở tìm kiếm" }).click();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Mở menu" }).click();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
      .violations,
  ).toEqual([]);
});
