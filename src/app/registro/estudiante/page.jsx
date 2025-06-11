'use client'

import Link from "next/link";
import FileSelector from "@/components/FileSelector";

function RegistroEstudiante() {

	const onSubmit = async (e) => {
		e.preventDefault();

		if (
			!e.target.correo.value ||
			!e.target.nombre.value ||
			!e.target.apellidos.value ||
			!e.target.carnet.value ||
			!e.target.carrera.value ||
			!e.target.nivel.value ||
			!e.target.contacto.value ||
			!e.target.contrasena.value
		) {
			alert("Por favor, complete todos los campos.");
			return;
		}

		if (!e.target.correo.value.endsWith("@estudiantec.cr")) {
			alert("El correo debe ser del dominio @estudiantec.cr");
			return;
		}

		const email = e.target.correo.value;
		const name = e.target.nombre.value;
		const apellidos = e.target.apellidos.value;
		const password = e.target.contrasena.value;
		const carnet = e.target.carnet.value;
		const carrera = e.target.carrera.value;
		const nivelAcademico = e.target.nivel.value;
		const contacto = e.target.contacto.value;
		const tipoUsuario = "ESTUDIANTE";

		const res = await fetch(`/api/users`, {
			method: 'POST',
			body: JSON.stringify({email, name, apellidos, password, carnet, carrera, nivelAcademico, contacto, tipoUsuario}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className='text-3xl font-bold'>Estudiante</h1>
				<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-80 min-w-40">
					<div className="flex flex-col">
						<input type="email" id="correo" placeholder="Correo ITCR" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="text" id="nombre" placeholder="Nombre" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="text" id="apellidos" placeholder="Apellidos" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="number" id="carnet" placeholder="Carnet" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<select
							id="carrera"
							name="carrera"
							className="text-center border border-none rounded-2xl bg-white p-3 text-gray-500"
							defaultValue=""
							required
						>
							<option value="" disabled>Elige una carrera</option>
							<option value="TI">Administración de Tecnología de Información</option>
							<option value="AU">Arquitectura</option>
							<option value="AE">Bachillerato en Administración de Empresas</option>
							<option value="EM">Enseñanza de la Matemática con Entornos Tecnológicos</option>
							<option value="TS">Gestión del Turismo Sostenible</option>
							<option value="TR">Gestión en Sostenibilidad Turística</option>
							<option value="IA">Ingeniería Agrícola</option>
							<option value="AI">Ingeniería Ambiental</option>
							<option value="EL">Ingeniería Electrónica</option>
							<option value="AN">Ingeniería en Agronegocios</option>
							<option value="IB">Ingeniería en Biotecnología</option>
							<option value="IC">Ingeniería en Computación</option>
							<option value="CE">Ingeniería en Computadores</option>
							<option value="ID">Ingeniería en Diseño Industrial</option>
							<option value="CM">Ingeniería en Materiales</option>
							<option value="PI">Ingeniería en Producción Industrial</option>
							<option value="SO">Ingeniería en Seguridad Laboral e Higiene Ambiental</option>
							<option value="IF">Ingeniería Física</option>
							<option value="FO">Ingeniería Forestal</option>
							<option value="LA">Licenciatura en Administración de Empresas</option>
							<option value="LE">Licenciatura en Educación Técnica</option>
							<option value="AG">Licenciatura en Ingeniería en Agronomía</option>
							<option value="BL">Licenciatura en Ingeniería en Biotecnología</option>
							<option value="CO">Licenciatura en Ingeniería en Construcción</option>
							<option value="MT">Licenciatura en Ingeniería Mecatrónica</option>
							<option value="MI">Licenciatura en Mantenimiento Industrial</option>
						</select>
					</div>
					<div className="flex flex-col">
						<select
							id="nivel"
							name="nivel"
							className="text-center text-gray-500 border border-none rounded-2xl bg-white p-3"
							defaultValue=""
							required
						>
							<option value="" disabled>Elige un nivel academico</option>
							<option value="GT">Grado Técnico</option>
							<option value="PG">Postgrado</option>
						</select>
					</div>
					<div className="flex flex-col">
						<input type="tel" id="contacto" placeholder="Contacto" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<FileSelector />
					<div className="flex flex-col">
						<input type="password" id="contrasena" placeholder="Contraseña" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<button type="submit" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-xl w-fit mx-auto">Registrarse</button>
					</div>
					<div className="flex flex-col">
						<Link href="/login" className="w-fit mx-auto text-gray-700">¿Ya tiene cuenta? Inicie sesión</Link>
					</div>
				</form>
		</div>
	)
}

export default RegistroEstudiante;