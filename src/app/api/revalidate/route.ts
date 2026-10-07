import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || secret.length < 32)
    return Response.json({ error: "Revalidation is not configured" }, { status: 503 });
  const expected = Buffer.from(`Bearer ${secret}`);
  const supplied = Buffer.from(request.headers.get("authorization") || "");
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidateTag("wordpress", { expire: 0 });
  return Response.json({ revalidated: true });
}
