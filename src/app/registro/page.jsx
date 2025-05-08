import Link from 'next/link';

function Registro() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1>Eres...</h1>
			<div className="flex flex-col gap-4 mt-8 border p-8 rounded-2xl shadow-lg bg-gray-300">
				<Link href="/registro/estudiante" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Estudiante</Link>
				<Link href="/registro/profesor" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Profesor</Link>
				<Link href="/registro/escuela" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Escuela/Departamento</Link>
				<Link href="/registro/administrador" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Administrador</Link>
			</div>
		</div>
	)
}

export default Registro;