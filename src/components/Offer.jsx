function Offer({ offer }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-cyan-900 mb-2">{offer.titulo}</h3>
      <p className="text-gray-700 mb-4">{offer.descripcion}</p>
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Inicio: <time>{offer.fechaInicio}</time></span>
        <span>Fin: <time>{offer.fechaFin}</time></span>
      </div>
    </div>
  );
}

export default Offer;