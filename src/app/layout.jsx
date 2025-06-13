import { inter } from '@/app/ui/fonts';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UsuarioProvider } from './context/UsuarioContext';
import { GET as getUsuario } from './api/users/route'; // ⚠️ Importas el handler directamente

export const metadata = {
  title: 'Asistencias y Tutorías',
  description: 'Sistema de gestión de asistencias y tutorías para estudiantes del Tecnológico de Costa Rica',
};

export default async function RootLayout({ children }) {
  let initialUser = null;

  try {
    const res = await getUsuario(); // ✅ Llamada directa al handler del endpoint
    const data = await res.json();
    if (data.success) {
      initialUser = data.usuario;
    }
  } catch (err) {
    console.error('Error al obtener usuario desde cookie:', err);
  }

  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
      </head>
      <body className={`${inter.className}`}>
        <UsuarioProvider initialUsuario={initialUser}> {/* ✅ Pasa el usuario inicial */}
          <Toaster position="top-right" />
          {children}
        </UsuarioProvider>
      </body>
    </html>
  );
}
