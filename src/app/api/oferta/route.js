import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  const res = await fetch(`${API_URL}/ofertas`);
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/oferta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data.message }, { status: res.status });
  }
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request) {
  const { titulo } = await request.json();
  const res = await fetch(`${API_URL}/oferta/${titulo}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json({ error: errorData.message }, { status: res.status });
  } 
  return NextResponse.json({ message: 'Oferta eliminada correctamente' }, { status: 200 });
}