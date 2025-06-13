import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/ofertas/metrics`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch metrics data');
    }
    
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in metrics API route:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error al obtener estadísticas'
    }, { status: 500 });
  }
}