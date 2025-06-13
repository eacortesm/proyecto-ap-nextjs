import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request, {params}) {
  const { titulo } = await params;
  const body = await request.json();
  
  const res = await fetch(`${API_URL}/oferta/${titulo}/estudiante  `, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      correoEstudiante: body.correoEstudiante,
      aceptado: body.aceptado,
      promedioPonderado: body.promedioPonderado
    })
  });
  
  if (!res.ok) {
    return NextResponse.json({ success: false, message: 'Error al agregar estudiante' }, { status: res.status });
  }
  
  const data = await res.json();
  
  return NextResponse.json({ success: true, message: 'Estudiante agregado exitosamente', data });
}