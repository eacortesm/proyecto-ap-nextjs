import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request, { params }) {

    let { email } = await params;
    let body = await request.json();

    let res = await fetch(`${API_URL}/users/${email}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        return NextResponse.json({ success: false })
    }

    return NextResponse.json({ success: true, usuario: await res.json() })
}