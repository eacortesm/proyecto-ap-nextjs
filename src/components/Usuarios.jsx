'use client'

import { useRouter } from "next/navigation"

export default function Usuarios({ usuario }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/${usuario.email}`);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
      <h3 className="text-xl font-semibold text-cyan-900 mb-1">{usuario.name} {usuario.apellidos}</h3>
      <p className="text-gray-700 mb-4">{usuario.tipoUsuario}</p>
    </div>
  )
}