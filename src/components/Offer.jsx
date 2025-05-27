function Offer({ offer }) {
  return (
    <div className="offer">
      <h2>{offer.titulo}</h2>
      <p>{offer.descripcion}</p>
      <p>Fecha de inicio: {offer.fechaInicio}</p>
      <p>Fecha de terminacion: {offer.fechaFin}</p>
    </div>
  );
}

export default Offer;