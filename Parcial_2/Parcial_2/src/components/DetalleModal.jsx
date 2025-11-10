
import React, { useEffect, useRef } from "react";

export default function DetalleModal({ open, onClose, producto }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (open) ref.current.showModal?.();
    else ref.current.close?.();
  }, [open]);

  if (!producto) return null;

  return (
    <dialog ref={ref} className="modal-detalle" onClose={onClose}>
      <article className="detalle-card">
        <button className="cerrar" onClick={onClose} aria-label="cerrar">✕</button>
        <h3 id="detalle-nombre">{producto.nombre}</h3>
        <img id="detalle-img" src={`./${producto.imagen}`} alt={producto.nombre} />
        <p id="descr-prod">{producto.description}</p>
      </article>
    </dialog>
  );
}
