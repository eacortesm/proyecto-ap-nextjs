'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useUsuario } from '@/app/context/UsuarioContext';

export default function PromediosPage() {
  const router = useRouter();
  const { usuario } = useUsuario();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/users/promedio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResultado(data);
      } else {
        setError(data.error || "Ocurrió un error al obtener el promedio");
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar tipoUsuario={usuario?.tipoUsuario} />

      <main className="flex items-center justify-center py-10">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Obtener Promedio</h2>

        
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
                {error}
              </div>
            )}

            {resultado && (
              <div className="text-green-600 p-4 bg-green-50 rounded border border-green-200">
                <h3 className="font-bold mb-2">Resultado:</h3>
                <p>Promedio: {resultado.promedio}</p>
                {resultado.note && <p className="text-sm mt-2 text-gray-600">{resultado.note}</p>}
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/perfil')}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
              >
                Volver
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition flex items-center"
              >
                {loading ? "Procesando..." : "Consultar Promedio"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}