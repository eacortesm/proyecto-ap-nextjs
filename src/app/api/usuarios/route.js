import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET() {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) {
    return NextResponse.json({ success: false, usuario: null });
  }

  const data = await res.json();
  return NextResponse.json({ success: true, data: data });
}