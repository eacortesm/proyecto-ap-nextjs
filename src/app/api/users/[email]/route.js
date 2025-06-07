import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function PUT(request, { params }) {
  const { email } = params;
  const body = await request.json();

  try {
    const response = await fetch(`${API_URL}/users/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en la actualización:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}