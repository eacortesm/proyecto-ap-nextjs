'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUsuario } from '@/app/context/UsuarioContext';
import Button from '@/components/ui/Button';

export default function BackupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { usuario } = useUsuario();

  // Check user authorization on component mount
  useEffect(() => {
    // If not logged in or not an admin, redirect to home page
    if (!usuario || usuario.tipoUsuario !== 'ADMINISTRADOR') {
      router.push('/');
    }
  }, [usuario, router]);

  // If not authorized, don't render the page content
  if (!usuario || usuario.tipoUsuario !== 'ADMINISTRADOR') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Verificando permisos...</p>
      </div>
    );
  }

  const handleBackup = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/backup');
      
      if (!response.ok) {
        throw new Error(`Backup failed: ${response.statusText}`);
      }
      
      // Create download link
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString().slice(0,10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Backup Error:', err);
      setError(err.message || 'Failed to create backup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sistema de Backup</h1>
        <p className="text-gray-600 mb-6">
          Exporte todos los datos del sistema como archivos CSV comprimidos en un ZIP.
          Esta copia de seguridad incluye:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800">Colecciones Incluidas</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Becas (todas las tipologías)</li>
              <li>• Registros de actividad</li>
              <li>• Ofertas de trabajo</li>
              <li>• Reportes del sistema</li>
              <li>• Usuarios y perfiles</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800">Características</h3>
            <ul className="mt-2 space-y-1 text-sm text-green-700">
              <li>• Formato ZIP con CSV separados</li>
              <li>• Codificación UTF-8 para caracteres especiales</li>
              <li>• Nombres de columnas en español</li>
              <li>• Solo disponible para administradores</li>
              <li>• Generación en tiempo real</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <Button 
            onClick={handleBackup}
            disabled={isLoading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando Backup...
              </span>
            ) : (
              'Descargar Backup Completo (ZIP)'
            )}
          </Button>
          
          {error && (
            <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-md">
              Error: {error}
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500">
            <p className="font-medium">Notas Importantes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>La generación puede tardar varios minutos con grandes volúmenes de datos</li>
              <li>Los archivos CSV mantienen todos los campos y relaciones</li>
              <li>Los arrays se guardan como JSON strings para preservar estructura</li>
              <li>Los backups no incluyen contraseñas de usuarios</li>
              <li>Revise regularmente la integridad de los backups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}