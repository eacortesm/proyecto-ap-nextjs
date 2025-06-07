'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUsuario } from '@/app/context/UsuarioContext';

function Navbar({ tipoUsuario }) {
  const { setUsuario } = useUsuario();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        setUsuario(null);
        router.push('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              type="button"
            >
              <span className="material-symbols-outlined text-xl select-none">logout</span>
              <span className="hidden sm:inline">Salir</span>
            </button>
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
              href="/oferta/buscar" 
              className={`material-symbols-outlined cursor-pointer transition-colors ${
                pathname === '/oferta/buscar' ? 'text-gray-900' : 'hover:text-gray-900'
              }`}
              aria-label="Buscar Oferta"
              title="Buscar Oferta"
            >
              search
            </Link>
          </li>
          { (tipoUsuario === 'PROFESOR' || tipoUsuario == 'ESCUELA' || tipoUsuario == 'ADMINISTRADOR') && (
            <li>
              <Link
                href="/oferta/crear"
                className={`material-symbols-outlined cursor-pointer transition-colors ${
                  pathname === '/oferta/crear' ? 'text-gray-900' : 'hover:text-gray-900'
                }`}
                aria-label="Crear Oferta"
                title="Crear Oferta"
              >
                add_circle
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
