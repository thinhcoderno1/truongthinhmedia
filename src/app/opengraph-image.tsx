import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Truong Thinh Media — Góc nhìn mới, ý tưởng rõ hơn";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/truong-thinh-media-horizontal.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f8f7f3",
        padding: "70px",
        color: "#182332",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 400,
          height: (400 * 164) / 958,
          overflow: "hidden",
        }}
      >
        {/* Display the supplied PNG without its transparent outer padding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt="Truong Thinh Media"
          width={(400 * 1086) / 958}
          height={(400 * 362) / 958}
          style={{
            position: "absolute",
            left: (-400 * 64) / 958,
            top: (-400 * 112) / 958,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 78,
          letterSpacing: -3,
          lineHeight: 1.2,
        }}
      >
        <span>Góc nhìn mới.</span>
        <span style={{ color: "#295bdf" }}>Ý tưởng rõ hơn.</span>
      </div>
      <div
        style={{ display: "flex", fontSize: 22, color: "#596476", justifyContent: "space-between" }}
      >
        <span>Content · Marketing · Công nghệ</span>
        <span>truongthinhmedia.com</span>
      </div>
    </div>,
    size,
  );
}
