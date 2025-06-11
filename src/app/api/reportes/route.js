import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  const res = await fetch(`${API_URL}/reporte`);
  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json({ error: errorData.message }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ status: 200, data: data });
}