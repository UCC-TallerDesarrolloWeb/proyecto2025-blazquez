
export default function CartItem({ prod, onInc, onDec, onRemove }) {
  const { nombre, precio, img, cantidad } = prod;

  const precioFmt = Number(precio || 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const subtotal = (Number(precio || 0) * Number(cantidad || 1)).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <article className="carrito-card" role="article">
      <div className="carrito-img">

     
        <img src={img || "/placeholder.png"} alt={`Imagen de ${nombre}`} loading="lazy" />
      </div>

      <div className="carrito-info">
        <h3 className="carrito-nombre">{nombre}</h3>
        <p className="carrito-precio">Precio: {precioFmt}</p>

        <div className="carrito-qty">
          <button type="button" className="btn-qty" onClick={onDec} aria-label="disminuir cantidad">−</button>
          <output className="qty" aria-live="polite">{cantidad}</output>
          <button type="button" className="btn-qty" onClick={onInc} aria-label="aumentar cantidad">+</button>
        </div>

        <p className="carrito-subtotal">
          Subtotal: <strong>{subtotal}</strong>
        </p>
      </div>

      <div className="carrito-actions">
        <button type="button" className="btn-remove" onClick={onRemove} aria-label="quitar del carrito">
          Quitar
        </button>
      </div>
    </article>
  );
}
