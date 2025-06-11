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