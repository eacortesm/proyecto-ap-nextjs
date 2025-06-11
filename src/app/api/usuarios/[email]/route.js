import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(request, { params }) {
  const { email } = await params;

  try {
    const res = await fetch(`${API_URL}/users/${email}`);

    if (!res.ok) {
      return NextResponse.json({ success: false, usuario: null }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, usuario: null }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  const { email } = params;

  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/users/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text(); // Extra para debug
      console.error("API error response:", errorText);
      return NextResponse.json(
        { success: false, error: "Error al actualizar el usuario" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}