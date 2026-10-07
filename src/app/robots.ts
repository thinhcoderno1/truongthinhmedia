import type { MetadataRoute } from "next";
import { allowIndexing, site } from "@/lib/site";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  return allowIndexing
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/tim-kiem"] },
        sitemap: `${site.url}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
