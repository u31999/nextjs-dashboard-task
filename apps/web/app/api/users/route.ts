import { NextResponse } from "next/server";
import { users } from "@acme/data";

export async function GET() {
  // Mock delay, feels real (optional)
  await new Promise((r) => setTimeout(r, 50));
  return NextResponse.json({ users });
}
