import { NextResponse } from "next/server";

const API_URL = process.env.API_URL; // ej: http://localhost:3001 o la URL real de tu API

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_URL}/usuario`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Token inválido');
    }

    return NextResponse.json({ success: true, usuario: data.usuario });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Token inválido" }, { status: 401 });
  }
}
