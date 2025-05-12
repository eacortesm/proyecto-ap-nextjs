import Link from "next/link";

function RegistroEscuela() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold">Escuela/Departamento</h1>
			<form className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-80 min-w-40">
					<div className="flex flex-col">
						<input type="email" id="correo" placeholder="Correo ITCR" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="text" id="nombre" placeholder="Nombre" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="tel" id="telefono" placeholder="Telefono" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<select
							id="departamento"
							name="rol"
							className="text-center text-gray-500 border border-none rounded-2xl bg-white p-3"
							defaultValue=""
							required
						>
							<option value="" disabled>Elige un nivel academico</option>
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
					</div>
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

export default RegistroEscuela;