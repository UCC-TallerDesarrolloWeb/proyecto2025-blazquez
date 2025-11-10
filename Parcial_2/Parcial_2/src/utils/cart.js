const KEY = "cart";

/** Estructura esperada de item:
 * { id, nombre, precio, img, cantidad }
 */

export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    // normalizamos cantidades mínimas
    return Array.isArray(arr)
      ? arr.map((p) => ({ ...p, cantidad: Math.max(1, Number(p.cantidad || 1)) }))
      : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function removeItem(cart, id) {
  return cart.filter((p) => p.id !== id);
}

export function updateQty(cart, id, delta) {
  return cart
    .map((p) => (p.id === id ? { ...p, cantidad: Math.max(1, Number(p.cantidad || 1) + delta) } : p));
}
