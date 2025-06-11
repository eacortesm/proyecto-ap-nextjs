import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/beca`);
    if (!res.ok) {
      throw new Error('Error al obtener las becas');
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}