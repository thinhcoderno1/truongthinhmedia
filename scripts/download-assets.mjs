import { mkdir, writeFile } from "node:fs/promises";

const photos = {
  writing: "1499750310107-5fef28a66643",
  notebook: "1455390582262-044cdead277a",
  technology: "1516321318423-f06f85e504b3",
  analytics: "1460925895917-afdab827c52f",
  journal: "1434030216411-0b793f4b4173",
  workspace: "1486312338219-ce68d2c6f44d",
};
await mkdir("public/images", { recursive: true });
await Promise.all(
  Object.entries(photos).map(async ([name, id]) => {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=85`;
    const response = await fetch(url);
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/"))
      throw new Error(`Cannot download ${name}: ${response.status}`);
    await writeFile(`public/images/${name}.jpg`, Buffer.from(await response.arrayBuffer()));
    console.log(`Downloaded ${name}`);
  }),
);
