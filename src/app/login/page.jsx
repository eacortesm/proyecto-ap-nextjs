'use client';

import Link from "next/link";

export default function Page() {

	const onSubmit = async (e) => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		const res = await fetch(`/api/login`, {
			method: 'POST',
			body: JSON.stringify({email, password}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await res.json();
		console.log(data);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Iniciar Sesion</h1>
			<form className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-min" onSubmit={onSubmit}>
				<div className="flex flex-col">
					<input type="email" id="email" placeholder="Correo ITCR" className="border rounded-2xl border-none p-2 bg-white text-center text-black" />
				</div>
				<div className="flex flex-col">
					<input type="password" id="password" placeholder="Contraseña" className="border rounded-2xl border-none p-2 bg-white text-center text-black" />
				</div>
				<div className="flex flex-col">
					<button type="submit" className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-xl w-fit mx-auto">Siguiente</button>
				</div>
				<div className="flex flex-col">
					<Link href="/registro" className="w-fit mx-auto text-gray-700">¿No tiene cuenta? Registrese</Link>
				</div>
			</form>
		</div>
	)
}