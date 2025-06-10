import { NextResponse } from 'next/server';
import archiver from 'archiver';
import { createObjectCsvStringifier } from 'csv-writer';
import mongoose from 'mongoose';
import { verifyToken } from '@/lib/auth'; // Your auth utility

// Models (import your actual models)
const Beca = mongoose.model('Beca', becaSchema);
const Log = mongoose.model('Log', logSchema);
const Oferta = mongoose.model('Oferta', ofertaSchema);
const Reporte = mongoose.model('Reporte', reporteSchema);
const User = mongoose.model('User', userSchema);

export async function GET(request) {
  try {
    // Authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    
    const decoded = await verifyToken(token);
    if (!decoded || decoded.tipoUsuario !== 'ADMINISTRADOR') {
      return new NextResponse(JSON.stringify({ error: 'Admin access required' }), { status: 403 });
    }

    // Create ZIP archive
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    
    archive.pipe(new WritableStream({
      write(chunk) {
        writer.write(chunk);
      },
      close() {
        writer.close();
      },
      abort(err) {
        writer.abort(err);
      }
    }));

    // Helper function to add collection to ZIP
    const addCollectionToZip = async (model, fileName, headerMap) => {
      const data = await model.find({});
      if (data.length === 0) return;

      const header = Object.keys(headerMap).map(key => ({
        id: key,
        title: headerMap[key]
      }));

      const csvStringifier = createObjectCsvStringifier({ header });
      const csvContent = csvStringifier.getHeaderString() + 
                         csvStringifier.stringifyRecords(data);
      
      archive.append(csvContent, { name: fileName });
    };

    // Add all collections to the ZIP
    await addCollectionToZip(Beca, 'becas.csv', {
      nombre: 'Nombre',
      descripcion: 'Descripción',
      requisitos: 'Requisitos',
      beneficios: 'Beneficios',
      procesoObtencion: 'Proceso Obtención',
      estudiante: 'Estudiante',
      tipo: 'Tipo'
    });

    await addCollectionToZip(Log, 'logs.csv', {
      Titulo: 'Título',
      Usuario: 'Usuario',
      Accion: 'Acción',
      Fecha: 'Fecha'
    });

    await addCollectionToZip(Oferta, 'ofertas.csv', {
      titulo: 'Título',
      tipoTrabajo: 'Tipo Trabajo',
      departamento: 'Departamento',
      descripcion: 'Descripción',
      profesor: 'Profesor',
      fechaInicio: 'Fecha Inicio',
      fechaFin: 'Fecha Fin',
      objetivos: 'Objetivos',
      cantidadVacantes: 'Vacantes',
      duracion: 'Duración',
      requisitos: 'Requisitos',
      estadoOferta: 'Estado'
    });

    await addCollectionToZip(Reporte, 'reportes.csv', {
      titulo: 'Título',
      descripcion: 'Descripción'
    });

    await addCollectionToZip(User, 'usuarios.csv', {
      name: 'Nombre',
      apellidos: 'Apellidos',
      email: 'Email',
      tipoUsuario: 'Tipo Usuario',
      contacto: 'Contacto',
      escuela: 'Escuela',
      zonaTrabajo: 'Zona Trabajo',
      carnet: 'Carnet',
      departamentoTrabajo: 'Departamento',
      telefono: 'Teléfono',
      nivelAcademico: 'Nivel Académico',
      carrera: 'Carrera',
      promedioPonderado: 'Promedio'
    });

    // Finalize the archive
    await archive.finalize();
    
    // Create response with ZIP file
    return new NextResponse(stream.readable, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="backup-${new Date().toISOString().slice(0,10)}.zip"`,
        'X-Content-Type-Options': 'nosniff'
      }
    });

  } catch (error) {
    console.error('Backup Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}