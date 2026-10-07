export const site = {
  name: "Truong Thinh Media",
  description:
    "Góc nhìn về content, marketing và công nghệ. Một không gian để đọc, suy nghĩ và tìm cảm hứng cho công việc sáng tạo.",
  url: (process.env.SITE_URL || "https://truongthinhmedia.com").replace(/\/$/, ""),
  email: process.env.CONTACT_EMAIL || "",
  facebook: process.env.CONTACT_FACEBOOK_URL || "",
  linkedin: process.env.CONTACT_LINKEDIN_URL || "",
};
export const isDemo = !process.env.WORDPRESS_API_URL;
export const allowIndexing = process.env.ALLOW_INDEXING === "true" && !isDemo;

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));
}
export function postUrl(slug: string) {
  return `/bai-viet/${encodeURIComponent(slug)}`;
}
export function categoryUrl(slug: string) {
  return `/chuyen-muc/${encodeURIComponent(slug)}`;
}
export function parsePage(value?: string) {
  return value && /^\d+$/.test(value) ? Math.max(1, Math.min(10000, Number(value))) : 1;
}
export function safeContactUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
