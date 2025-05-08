import Link from 'next/link';

function Registro() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-3xl font-bold'>Eres un...</h1>
			<div className="flex flex-col gap-4 mt-4 border p-4 rounded-lg shadow-lg bg-gray-300 pt-8 max-h-[80vh] overflow-y-auto w-full max-w-80 min-w-40">
				<Link href="/registro/estudiante" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Estudiante</Link>
				<Link href="/registro/profesor" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Profesor</Link>
				<Link href="/registro/escuela" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Escuela/Departamento</Link>
				<Link href="/registro/administrador" className='bg-blue-400 hover:bg-blue-500 text-gray-100 py-2 px-1 text-center border rounded-2xl border-none w-full'>Administrador</Link>
				<Link href="/login" className="text-center text-gray-700 w-fit mx-auto">¿Ya tiene cuenta? Inicie sesión</Link>
			</div>
		</div>
	)
}

export default Registro;