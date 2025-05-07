import Link from "next/link";

export default function Page() {
	return (
		<div>
			<h1>Iniciar Sesion</h1>
			<form>
				<div>
					<input type="text" placeholder="Usuario" />
				</div>
				<div>
					<input type="password" placeholder="Contraseña" />
				</div>
				<div>
					<button type="submit">Iniciar Sesion</button>
				</div>
				<div>
					<Link href="/register">Registrarse</Link>
				</div>
			</form>
		</div>
	)
}