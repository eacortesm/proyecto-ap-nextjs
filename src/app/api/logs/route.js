import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/log`);
    if (!res.ok) {
      throw new Error('Error al obtener los logs');
    }
    const data = await res.json();
    return NextResponse.json({ status: 200, data: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}