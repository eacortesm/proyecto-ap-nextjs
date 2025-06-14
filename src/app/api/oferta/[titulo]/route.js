import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(request, { params }) {
    const { titulo } = await params;
    const decodedTitulo = decodeURIComponent(titulo);

    const res = await fetch(`${API_URL}/oferta/${decodedTitulo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })

    const data = await res.json()

    return NextResponse.json({ data })
}

export async function PUT(request, { params }) {
    const { titulo } = await params;
    const decodedTitulo = decodeURIComponent(titulo);
    const body = await request.json();

    const res = await fetch(`${API_URL}/oferta/${decodedTitulo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        return NextResponse.json({ success: false, message: 'Error al actualizar la oferta' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ success: true, message: 'Oferta actualizada exitosamente', data });
}