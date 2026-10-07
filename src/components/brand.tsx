import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/truong-thinh-media-horizontal.png";

export function Logo({
  className = "",
  decorative = false,
  preload = false,
}: {
  className?: string;
  decorative?: boolean;
  preload?: boolean;
}) {
  return (
    <span className={`logo-art ${className}`} aria-hidden={decorative || undefined}>
      <Image
        src={logo}
        alt={decorative ? "" : "Truong Thinh Media"}
        className="logo-image"
        preload={preload}
        unoptimized
      />
    </span>
  );
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand${footer ? " brand-footer" : ""}`}
      aria-label="Truong Thinh Media — Trang chủ"
    >
      <Logo decorative preload={!footer} />
    </Link>
  );
}
