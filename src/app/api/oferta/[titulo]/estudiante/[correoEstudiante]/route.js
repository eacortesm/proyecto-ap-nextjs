import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function DELETE(request, { params }) {
  const { titulo, correoEstudiante } = await params;

  const res = await fetch(`${API_URL}/oferta/${titulo}/estudiante/${correoEstudiante}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return NextResponse.json({ success: false, message: 'Error al eliminar estudiante' }, { status: res.status });
  }

  return NextResponse.json({ success: true, message: 'Estudiante eliminado exitosamente' });
}