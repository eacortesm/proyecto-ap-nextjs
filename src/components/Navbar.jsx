import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex flex-col">
      <div className="flex justify-between p-5 bg-cyan-900">
        <Link 
          className="text-3xl font-bold text-blue-200 hover:text-blue-300"
          href="/"
        >
          <h1>Asistencias y Tutorías</h1>
        </Link>
        <ul className="flex gap-4">
          <li className="text-lg font-bold text-blue-200 hover:text-blue-300 border-2 rounded-2xl border-blue-200 px-4 py-2">
            <Link href="/login">Iniciar Sesion</Link>
          </li>
          <li className="text-lg font-bold text-blue-200 hover:text-blue-300 border-2 rounded-2xl border-blue-200 px-4 py-2">
            <Link href="/register">Registrarse</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-center bg-cyan-800 p-1">
        <ul>
          <li>
            <Link className="text-xl" href="/">Inicio</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;