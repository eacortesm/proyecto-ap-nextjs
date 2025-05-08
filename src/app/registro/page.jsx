import Link from 'next/link';

function Registro() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1>Eres...</h1>
			<div>
				<Link href="/registro/estudiante">Estudiante</Link>
				<Link href="/registro/profesor">Profesor</Link>
				<Link href="/registro/escuela">Escuela/Departamento</Link>
				<Link href="/registro/administrador">Administrador</Link>
			</div>
		</div>
	)
}

export default Registro;