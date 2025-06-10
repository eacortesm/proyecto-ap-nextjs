export default function Usuarios({ usuario }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-cyan-900 mb-2">{usuario.name}</h3>
      <p className="text-gray-700 mb-4">{usuario.tipoUsuario}</p>
    </div>
  )
}