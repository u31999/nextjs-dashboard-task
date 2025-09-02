import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  res.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
