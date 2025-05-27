'use client';

import Navbar from "@/components/Navbar";
import { useUsuario } from "./context/UsuarioContext";

function Page() {
  const { usuario } = useUsuario();
  console.log(usuario);

  return (
    <div>
      <Navbar />
      {
        usuario ? (
          <h2 className="text-2xl">¡Bienvenido {usuario.name}!</h2>
        ) : (
          <h2>No has iniciado sesion. </h2>
        )
      }
    </div>
  )
}

export default Page;