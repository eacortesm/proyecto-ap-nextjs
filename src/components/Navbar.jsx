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
          <li className="text-lg font-bold text-blue-200 hover:text-blue-300">
            <Link href="/login">
              <span className="material-symbols-outlined align-middle">logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-center bg-cyan-800 p-1">
        <ul className="flex justify-between p-2 text-white font-bold text-lg">
          <li>
            <Link className="text-xl" href="/">Inicio</Link>
          </li>
          <li>
            <Link className="text-xl" href="/asistencias">Buscar oferta</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;