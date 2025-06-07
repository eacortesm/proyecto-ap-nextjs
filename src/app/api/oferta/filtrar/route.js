import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function POST(request) {
  const body = await request.json();
  const { titulo, departamento, requisitos } = body;

  try {
    const res = await fetch(`${API_URL}/filtroOfertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, departamento, requisitos }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al filtrar ofertas' }, { status: 500 });
  }
}