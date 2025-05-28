'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const hideNavbarPaths = [
    '/login', 
    '/registro',
    '/registro/estudiante',
    '/registro/profesor',
    '/registro/escuela',
    '/registro/administrador',
  ];

  if (hideNavbarPaths.includes(pathname)) {
    return null;
  }

  return (
    <nav className="flex flex-col border-b border-gray-300 bg-gray-400 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <Link 
          href="/" 
          className="text-2xl font-semibold text-gray-800 hover:text-gray-700 transition-colors"
        >
          Asistencias y Tutorías
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <span className="material-symbols-outlined text-xl select-none">logout</span>
              <span className="hidden sm:inline">Salir</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="bg-gray-300">
        <ul className="flex justify-center max-w-screen-md mx-auto py-3 gap-12 text-gray-700 font-semibold text-lg">
          <li>
            <Link 
              href="/" 
              className={`material-symbols-outlined cursor-pointer transition-colors ${
                pathname === '/' ? 'text-gray-900' : 'hover:text-gray-900'
              }`}
              aria-label="Inicio"
              title="Inicio"
            >
              home
            </Link>
          </li>
          <li>
            <Link 
              href="/asistencias" 
              className={`material-symbols-outlined cursor-pointer transition-colors ${
                pathname === '/asistencias' ? 'text-gray-900' : 'hover:text-gray-900'
              }`}
              aria-label="Buscar Asistencias"
              title="Buscar Asistencias"
            >
              search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
