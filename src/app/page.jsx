'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "./context/UsuarioContext";
import Offer from "@/components/Offer";
import { useRouter } from "next/navigation";

function Page() {
  const { usuario } = useUsuario();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async (titulo) => {
    try {
      const res = await fetch('/api/oferta', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar la oferta');
      }
      setOfertas(ofertas.filter(oferta => oferta.titulo !== titulo));
    } catch (err) {
      setError(err.message);
    }
  }

  const handleUpdate = async (titulo) => {
    router.push(`/oferta/${titulo}/editar`);
  }

  useEffect(() => {
    async function fetchOfertas() {
      try {
        const res = await fetch('/api/oferta'); 
        if (!res.ok) throw new Error('Error al obtener las ofertas');
        const data = await res.json();
        setOfertas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOfertas();
  }, []);

  return (
    <div>
      {usuario ? (
        <div>
          <Navbar tipoUsuario={usuario.tipoUsuario} />
          <main>
            <h2 className="text-2xl mb-4 text-center">¡Bienvenido {usuario.name}!</h2>
            {loading && <p>Cargando ofertas...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
              <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <li key={oferta._id || oferta.id} className="mb-2">
                      <Offer offer={oferta} tipoUsuario={usuario.tipoUsuario} correo={usuario.email} handleDelete={() => handleDelete(oferta.titulo)} handleUpdate={() => handleUpdate(oferta.titulo)} />
                    </li>
                  ))
                ) : (
                  <p>No hay ofertas disponibles.</p>
                )}
              </ul>
            )}
          </main>
        </div>
      ) : (
        <div>
          <Navbar />
          <h2>No has iniciado sesión.</h2>
        </div>
      )}
    </div>
  );
}

export default Page;
