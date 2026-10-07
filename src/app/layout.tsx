import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/500-italic.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { allowIndexing, isDemo, site } from "@/lib/site";
import { jsonLd } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Truong Thinh Media — Góc nhìn mới, ý tưởng rõ hơn",
    template: "%s | Truong Thinh Media",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: allowIndexing, follow: allowIndexing },
  icons: {
    icon: { url: "/brand/favicon-truong-thinh-media.png", type: "image/png", sizes: "600x600" },
  },
};
export const viewport: Viewport = { themeColor: "#f8f7f3" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Defer rendering until runtime so one Docker image can accept Coolify runtime CMS settings.
  await connection();
  return (
    <html lang="vi">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Chuyển đến nội dung chính
        </a>
        {isDemo && (
          <div className="demo-notice">
            Bản xem trước <span aria-hidden="true">·</span> Bài viết và chuyên mục đang dùng nội
            dung minh họa.
          </div>
        )}
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              inLanguage: "vi-VN",
              description: site.description,
            }),
          }}
        />
      </body>
    </html>
  );
}
