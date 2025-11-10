import { useEffect, useMemo, useState } from "react";
import CartItem from "@components/CartItem";
import { loadCart, saveCart, clearCart, updateQty, removeItem } from "@utils/cart";
import "@styles/cart.css";

export default function Carrito() {
  const [cart, setCart] = useState(() => loadCart());

  // total en ARS con separador de miles
  const total = useMemo(
    () =>
      cart.reduce((acc, p) => acc + (Number(p.precio) || 0) * (Number(p.cantidad) || 1), 0),
    [cart]
  );

  // persistir en localStorage
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const onClear = () => {
    clearCart();
    setCart([]);
  };

  const onRemove = (id) => {
    const next = removeItem(cart, id);
    setCart(next);
  };

  const onChangeQty = (id, delta) => {
    const next = updateQty(cart, id, delta);
    setCart(next);
  };

  return (
    <main className="container carrito-wrap">
      <div className="carrito-controls">
        <button className="btn-danger btn-pill-grande" type="button" onClick={onClear}>
          BORRAR TODO
        </button>
      </div>

      <section id="carrito-grid" className="carrito-grid" aria-live="polite">
        {cart.length === 0 && (
          <p className="carrito-empty">Tu carrito está vacío.</p>
        )}

        {cart.map((prod) => (
          <CartItem
            key={prod.id}
            prod={prod}
            onRemove={() => onRemove(prod.id)}
            onInc={() => onChangeQty(prod.id, +1)}
            onDec={() => onChangeQty(prod.id, -1)}
          />
        ))}
      </section>

      <div className="total-box">
        <span>Total:</span>{" "}
        <strong id="carrito-total">
          {total.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
        </strong>
      </div>

      {/* Modal de detalle (opcional; mostrar si ya lo usas en otros lados) */}
      <dialog id="detalle" className="modal-detalle">
        <article className="detalle-card">
          <button
            className="cerrar"
            aria-label="cerrar"
            onClick={() => document.getElementById("detalle")?.close()}
          >
            ✕
          </button>
          <h3 id="detalle-nombre"></h3>
          <img id="detalle-img" alt="" />
          <p id="descr-prod"></p>
        </article>
      </dialog>
    </main>
  );
}
