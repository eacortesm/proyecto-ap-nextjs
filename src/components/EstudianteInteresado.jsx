'use client'

function EstudianteInteresado({ correoEstudiante, aceptado, promedioPonderado, onAceptar, onEliminar }) {
    return (
    <div className="border rounded p-3 flex items-center justify-between gap-3 bg-gray-50 shadow mb-2">
      <div>
        <div>
          <span className="font-semibold">Correo:</span> {correoEstudiante}
        </div>
        <div>
          <span className="font-semibold">Promedio ponderado:</span> {promedioPonderado ?? "No especificado"}
        </div>
        <div>
          <span className="font-semibold">Estado:</span>{" "}
          {aceptado === true ? (
            <span className="text-green-600 font-medium">Aceptado</span>
          ) : aceptado === false ? (
            <span className="text-red-600 font-medium">No aceptado</span>
          ) : (
            <span className="text-gray-500">Pendiente</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {!aceptado && (
          <button
            //onClick={onAceptar}
            className="text-green-600 hover:bg-green-100 rounded p-1 transition"
            title="Aceptar estudiante">
            <span className="material-symbols-outlined text-xl select-none">check</span>
          </button>
        )}
        <button
          onClick={onEliminar}
          className="text-red-600 hover:bg-red-100 rounded p-1 transition"
          title="Eliminar estudiante">
          <span className="material-symbols-outlined text-xl select-none">close</span>
        </button>
      </div>
    </div>
    )
}

export default EstudianteInteresado;