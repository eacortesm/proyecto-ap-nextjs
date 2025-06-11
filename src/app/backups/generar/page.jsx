'use client';

import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function convertirA_CSV(data) {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","), // encabezado
    ...data.map(row =>
      headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
    )
  ];

  return csvRows.join("\n");
}

async function generarZIPConCSV({ users, reportes, ofertas, logs, becas }) {
  const zip = new JSZip();

  zip.file("usuarios.csv", convertirA_CSV(users));
  zip.file("reportes.csv", convertirA_CSV(reportes));
  zip.file("ofertas.csv", convertirA_CSV(ofertas));
  zip.file("logs.csv", convertirA_CSV(logs));
  zip.file("becas.csv", convertirA_CSV(becas));

  const blob = await zip.generateAsync({ type: "blob" });
  const fecha = new Date().toISOString().split("T")[0];
  saveAs(blob, `backup_${fecha}.zip`);
}

export default function GenerarBackupPage() {
  const { usuario, loading } = useUsuario();
  const [users, setUsers] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [logs, setLogs] = useState([]);
  const [becas, setBecas] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/usuarios');
        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await res.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    async function fetchOfertas() {
      try {
        const res = await fetch('/api/oferta'); 
        if (!res.ok) throw new Error('Error al obtener las ofertas');
        const data = await res.json();
        setOfertas(data);
      } catch (err) {
        console.error('Error fetching ofertas:', err);
      }
    }

    async function fetchReportes() {
      try {
        const res = await fetch('/api/reportes');
        if (!res.ok) throw new Error('Error al obtener los reportes');
        const data = await res.json();
        setReportes(data.data);
      } catch (err) {
        console.error('Error fetching reportes:', err);
      }
    }

    async function fetchLogs() {
      try {
        const res = await fetch('/api/logs');
        if (!res.ok) throw new Error('Error al obtener los logs');
        const data = await res.json();
        setLogs(data.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    }

    async function fetchBecas() {
      try {
        const res = await fetch('/api/beca');
        if (!res.ok) throw new Error('Error al obtener las becas');
        const data = await res.json();
        setBecas(data);
      } catch (err) {
        console.error('Error fetching becas:', err);
      }
    }

    fetchUsers();
    fetchOfertas();
    fetchReportes();
    fetchLogs();
    fetchBecas();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div>
        <Navbar />
        <p className="text-gray-600">Por favor, inicia sesión para acceder a esta funcionalidad.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl mb-4 text-center">Generar Backup</h2>
        <button
          onClick={() => generarZIPConCSV({ users, reportes, ofertas, logs, becas })}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mx-auto block"
        >
          Descargar Backup (.zip)
        </button>
      </main>
    </div>
  )
}