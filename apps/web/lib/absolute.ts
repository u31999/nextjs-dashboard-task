import { headers } from "next/headers";

export function absolute(path: string) {
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host =
    h.get("x-forwarded-host") ??
    h.get("host") ??
    "localhost:3000";
  return `${proto}://${host}${path}`;
}
