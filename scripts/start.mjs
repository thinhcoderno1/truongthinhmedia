import { cp, access } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const output = resolve(".next/standalone");
try {
  await access(resolve(output, "server.js"));
} catch {
  console.error("No production build found. Run npm run build first.");
  process.exit(1);
}
await cp(resolve("public"), resolve(output, "public"), { recursive: true });
await cp(resolve(".next/static"), resolve(output, ".next/static"), { recursive: true });
process.env.HOSTNAME ||= "0.0.0.0";
process.env.PORT ||= "3000";
await import(pathToFileURL(resolve(output, "server.js")).href);
