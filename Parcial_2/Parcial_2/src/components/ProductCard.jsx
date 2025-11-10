
import React from "react";
import { formatPrice } from "@utils/formatPrice";

export default function ProductCard({ producto, onAdd, onDetail }) {
  const { nombre, precio, imagen } = producto;
  return (
    <article className="producto" role="listitem">
      <div className="prod-media">
        <img src={`./${imagen}`} alt={nombre} />
      </div>
      <h3 className="prod-nombre">{nombre}</h3>
      <p className="prod-precio">{formatPrice(precio)}</p>

      <div className="btn-row">
        <button type="button" className="btn-sec" onClick={onDetail}>
          Ver descripción
        </button>
        <button type="button" className="btn-primary" onClick={onAdd}>
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
