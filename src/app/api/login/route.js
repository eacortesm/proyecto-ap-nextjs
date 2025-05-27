import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await res.json();

  if (data.success && data.token && data.usuario) {
    const response = NextResponse.json({ success: true, usuario: data.usuario });

    response.cookies.set('token', data.token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 20, // 20 minutes
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  }
  return NextResponse.json({ success: false, message: data.message || 'Credenciales invalidas' }, { status: 401 });
}