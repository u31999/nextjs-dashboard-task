import { NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";

const AUTH_EMAIL = process.env.AUTH_EMAIL || "admin@example.com";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "pass123";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const isValid = email === AUTH_EMAIL && password === AUTH_PASSWORD;

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signJwt({ sub: "1", email, name: "Admin" }, "2h");

    const res = NextResponse.json({ ok: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
