// src/app/api/users/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, usuario: null });
  }

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, usuario: null });
  }

  const data = await res.json();
  return NextResponse.json({ success: true, usuario: data.usuario });
}


export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await res.json();
  return NextResponse.json(data);
}