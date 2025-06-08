'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

function RegistroAdministrador() {
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const name = e.target.name.value;
		const apellidos = e.target.apellidos.value;
		const telefono = e.target.telefono.value;
		const password = e.target.password.value;
		const tipoUsuario = 'ADMINISTRADOR';

		try {
			const response = await fetch('/api/users', {
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
					tipoUsuario
				})
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error al registrar el administrador');
			}
			const data = await response.json();
			console.log('Administrador registrado:', data);
			router.push('/login');
		} catch (error) {
			console.error('Error al registrar el administrador:', error);
			alert('Error al registrar el administrador. Por favor, inténtelo de nuevo.');
			return;
		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-3xl font-bold">Administrador</h1>
			<form className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-80 min-w-40" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<input type="email" id="email" name="email" placeholder="Correo ITCR" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="text" id="name" name="name" placeholder="Nombre" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="tel" id="telefono" name="telefono" placeholder="Telefono" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
					</div>
					<div className="flex flex-col">
						<input type="password" id="password" name="password" placeholder="Contraseña" className="border rounded-2xl border-none p-2 bg-white text-center text-black" required />
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

export default RegistroAdministrador;