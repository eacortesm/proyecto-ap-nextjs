'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegistroEscuela() {
  const [tipoFacultad, setTipoFacultad] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.correo.value;
    const name = e.target.nombre.value;
    const apellidos = e.target.apellidos.value;
    const telefono = e.target.telefono.value;
    const password = e.target.contrasena.value;

    if (tipoFacultad === "ES") {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          apellidos,
          telefono,
          password,
          escuela: e.target.escuela.value,
          tipoUsuario: 'ESCUELA',
        })
      })

      if (!res.ok) {
        console.error("Error al registrar la escuela");
        return;
      }

      const data = await res.json();
      console.log(data);
      router.push('/login')
    } else if (tipoFacultad === "DE") {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          apellidos,
          telefono,
          password,
          tipoUsuario: 'ESCUELA',
          departamento: e.target.departamento.value,
        })
      })

      if (!res.ok) {
        console.error("Error al registrar el departamento");
        return;
      }
      
      router.push('/login');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Escuela/Departamento</h1>

      <form className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-80 min-w-40" onSubmit={handleSubmit}>

        <input type="email" id="correo" placeholder="Correo ITCR" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />

        <input type="text" id="nombre" placeholder="Nombre" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />

        <input type="text" id="apellidos" placeholder="Apellidos" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />

        <input type="tel" id="telefono" placeholder="Teléfono" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />

        <select
          id="tipoFacultad"
          name="tipoFacultad"
          className="text-center text-gray-500 border border-none rounded-2xl bg-white p-3"
          value={tipoFacultad}
          onChange={(e) => setTipoFacultad(e.target.value)}
          required
        >
          <option value="" disabled>Elige el tipo de facultad</option>
          <option value="ES">Escuela</option>
          <option value="DE">Departamento</option>
        </select>

        {tipoFacultad === "DE" && (
          <select
            id="departamento"
            name="departamento"
            className="text-center text-gray-500 border border-none rounded-2xl bg-white p-3"
            defaultValue=""
            required
          >
            <option value="" disabled>Selecciona un departamento</option>
						<option value="DAM">Departamento de Administración de Mantenimiento</option>
						<option value="DATIC">Departamento de Administración de Tecnologías de Información y Comunicaciones</option>
						<option value="DAR">Departamento de Administración y Registro</option>
						<option value="DA">Departamento de Aprovisionamiento</option>
						<option value="DBGS">Departamento de Becas y Gestión Social</option>
						<option value="DGTH">Departamento de Gestión del Talento Humano</option>
						<option value="DOP">Departamento de Orientación y Psicología</option>
						<option value="DSG">Departamento de Servicios Generales</option>
						<option value="DEVESA">Departamento de Vida Estudiantil y Servicios Académicos</option>
						<option value="DVESA">Departamento de Vida Estudiantil y Servicios Académicos, Campus Tecnológico Local de San Carlos</option>
						<option value="DFC">Departamento Financiero Contable</option>
          </select>
        )}

        {tipoFacultad === "ES" && (
          <select
            id="escuela"
            name="escuela"
            className="text-center text-gray-500 border border-none rounded-2xl bg-white p-3"
            defaultValue=""
            required
          >
            <option value="" disabled>Selecciona una escuela</option>
            <option value="EAE">Escuela de Administración de Empresas</option>
            <option value="EATI">Escuela de Administración de Tecnologías de Información</option>
            <option value="EA">Escuela de Agronegocios</option>
            <option value="EAU">Escuela de Administración y Urbanismo</option>
            <option value="EB">Escuela de Biología</option>
            <option value="ECIM">Escuela de Ciencia e Ingeniería de los Materiales</option>
            <option value="ECL">Escuela de Ciencias del Lenguaje</option>
            <option value="ECNE">Escuela de Ciencias Naturales y Exactas</option>
            <option value="ECS">Escuela de Ciencias Sociales</option>
            <option value="ECD">Escuela de Cultura y Deporte</option>
            <option value="EDI">Escuela de Diseño Industrial</option>
            <option value="EET">Escuela de Educación Técnica</option>
            <option value="EF">Escuela de Física</option>
            <option value="EICS">Escuela de Idiomas y Ciencias Sociales</option>
            <option value="EIA">Escuela de Ingeniería Agrícola</option>
            <option value="EIE">Escuela de Ingeniería Electromecánica</option>
            <option value="EIEL">Escuela de Ingeniería Electromecánica</option>
            <option value="EIA">Escuela de Ingeniería en Agronomía</option>
            <option value="EIC">Escuela de Ingeniería en Computación</option>
            <option value="EICO">Escuela de Ingeniería en Computadores</option>
            <option value="EICC">Escuela de Ingeniería en Construcción</option>
            <option value="EIPI">Escuela de Ingeniería en Producción Industrial</option>
            <option value="EISLHA">Escuela de Ingeniería en Seguridad Laboral e Higiene Ambiental</option>
            <option value="EIF">Escuela de Ingeniería Forestal</option>
            <option value="EIM">Escuela de Ingeniería Mecatrónica</option>
            <option value="EM">Escuela de Matemática</option>
            <option value="EQ">Escuela de Química</option>
          </select>
        )}

        <input type="password" id="contrasena" placeholder="Contraseña" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />

        <button type="submit" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-xl w-fit mx-auto">
          Registrarse
        </button>

        <Link href="/login" className="w-fit mx-auto text-gray-700">
          ¿Ya tiene cuenta? Inicie sesión
        </Link>
      </form>
    </div>
  );
}

export default RegistroEscuela;
