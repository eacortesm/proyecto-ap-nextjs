import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET() {
  const res = await fetch(`${API_URL}/api/users`)
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/api/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await res.json();
  return NextResponse.json(data);
}