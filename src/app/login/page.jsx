import Link from "next/link";

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Iniciar Sesion</h1>
			<form className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8">
				<div className="flex flex-col">
					<input type="text" id="username" placeholder="Usuario" className="border rounded-lg p-2 bg-white text-center" />
				</div>
				<div className="flex flex-col">
					<input type="password" placeholder="Contraseña" className="border rounded-lg p-2 bg-white text-center" />
				</div>
				<div className="flex flex-col">
					<button type="submit" className="bg-slate-400 hover:bg-gray-400 px-4 py-2 rounded-xl w-fit mx-auto">Iniciar Sesion</button>
				</div>
				<div className="flex flex-col">
					<Link href="/registro" className="w-fit mx-auto">¿No tiene cuenta? Registrese</Link>
				</div>
			</form>
		</div>
	)
}