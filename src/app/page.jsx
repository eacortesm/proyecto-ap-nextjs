'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "./context/UsuarioContext";
import Offer from "@/components/Offer";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

function Page() {
  const { usuario, setUsuario } = useUsuario();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
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

  let ofertasFiltradas = showFavorites ?
  ofertas.filter(oferta => usuario?.favorites?.includes(oferta.titulo))
  : ofertas;

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

  const handleStar = async (titulo) => {
  let boolStar = usuario.favorites?.includes(titulo)
  let res;

  if (!boolStar) {
    res = await fetch(`/api/users/${usuario.email}/favorite`, {
      method: "POST",
      body: JSON.stringify({ "favoriteId": titulo })
    })
  } else {
    res = await fetch(`/api/users/${usuario.email}/delfavorite`, {
      method: "POST",
      body: JSON.stringify({ "favoriteId": titulo })
    })
  }

  if (res.ok) {
    let userData = await res.json()
    setUsuario(userData.usuario.usuario);
    boolStar ?
    toast.success('Agregado a Favoritos!', {
    position: 'top-center',
    icon: '⭐',
    style: {
      borderRadius: '10px',
      background: '#4ade80',
      color: '#fff',
      fontWeight: 'bold',
    },
    }) :
    toast('Eliminado de Favoritos', {
    position: 'top-center',
    icon: '❌',
    style: {
      borderRadius: '10px',
      background: '#f59e0b',
      color: '#fff',
      fontWeight: 'bold',
    },
    });
  } else {
    toast("Ocurrio un error", { position: 'top-center' });
  }}

  return (
    <div>
      
      {usuario ? (
        <div>
          <Navbar tipoUsuario={usuario.tipoUsuario} />
          <main>
            <div className="flex justify-between items-center mb-4 mt-4 max-w-6xl mx-auto px-4">
              <h2 className="text-2xl">¡Bienvenido {usuario.name}!</h2>
              <button 
                onClick={ () => { setShowFavorites(!showFavorites); } }
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors">
                <span className={`text-2xl ${showFavorites ? 'text-yellow-500' : 'text-gray-400'}`}>
                  ★
                </span>
                {showFavorites ? 'Mostrar todas' : 'Mostrar favoritos'}
              </button>
            </div>
            {loading && <p>Cargando ofertas...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
              <ul className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ofertasFiltradas.length > 0 ? (
                  ofertasFiltradas.map((oferta) => (
                    <li key={oferta._id || oferta.id} className="mb-2">
                      <Offer offer={oferta} 
                      tipoUsuario={usuario.tipoUsuario} 
                      correo={usuario.email} 
                      handleDelete={() => handleDelete(oferta.titulo)} 
                      handleUpdate={() => handleUpdate(oferta.titulo)} 
                      handleStar={() => handleStar(oferta.titulo)} />
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
