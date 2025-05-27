import { inter } from '@/app/ui/fonts'
import Navbar from '@/components/Navbar';
import './globals.css';
import { UsuarioProvider } from './context/UsuarioContext';

export const metadata = {
  title: 'Asistencias y Tutorías',
  description: 'Sistema de gestión de asistencias y tutorías para estudiantes del Tecnológico de Costa Rica',
}

function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=logout" />
      </head>
      <body className={`${inter.className}`}>
        <UsuarioProvider>
          {children}
        </UsuarioProvider>
      </body>
    </html>
  );
}

export default RootLayout;