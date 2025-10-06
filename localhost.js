/**
 * @file localhost.js
 * @description Lógica de catálogo y carrito para una tienda simple:
 *  - Render del catálogo de productos
 *  - Búsqueda, filtros por categoría y por rango de precios
 *  - Integración del buscador del header y navegación por categorías
 *  - Carrito persistido en localStorage con badge en el botón
 *
 * El archivo asume que existen ciertos IDs/clases en el DOM:
 *  - #catalogo, #detalle, #detalle-img, #detalle-nombre, #descr-prod
 *  - inputs: #search, #price-min, #price-max y checkboxes name="cats"
 *  - formularios/clases: form.buscador, .nav-cat
 *  - carrito: #carrito-grid, #carrito-total, #btn-vaciar
 *  - botón de carrito: button[aria-label="carrito"]
 *
 * @see Render del catálogo: {@link mostrarCatalogo}
 * @see Filtros y búsqueda: {@link filtrarProducto}, {@link buscarPorNombreEnCatalogo}
 * @see Carrito: {@link agregar_al_carrito}, {@link renderCarrito}
 */



/**
 * Producto disponible en la tienda.
 * @typedef {Object} Producto
 * @property {string}  nombre        - Nombre comercial (visible al usuario).
 * @property {string}  description   - Descripción breve del producto.
 * @property {string}  categoria     - Categoría (ej.: "Medicamentos", "Belleza").
 * @property {number}  precio        - Precio en ARS (entero).
 * @property {string}  imagen        - Nombre de archivo de imagen relativo a `imagenes/productos/`.
 */

/**
 * ID de producto según su posición en el arreglo global `productos`.
 * @typedef {number} ProductId
 */



/** @type {Producto[]} Lista base de productos del catálogo. */
const productos = [
  { nombre: "Axual 75mg",            description: "Analgésico 20 comprimidos.", categoria: "Medicamentos", precio: 20000, imagen: "axual75dividosis.webp" },
  { nombre: "Tío Nacho Rubio 200ml", description: "Shampoo fortalecedor",        categoria: "Pelo",         precio: 20000, imagen: "Tio-nacho.webp" },
  { nombre: "Vitamina C 1000",       description: "Inmune + energía",            categoria: "Vitaminas",    precio: 15000, imagen: "vitamina-c.webp" },
  { nombre: "Crema Facial Día",      description: "Hidratación 24h",             categoria: "Belleza",      precio: 18500, imagen: "crema-facial.webp" },
  { nombre: "Pañales Talle M",       description: "Pack x30 unidades",           categoria: "Bebes",        precio: 26000, imagen: "paniales-bebe.webp" },
  { nombre: "Alcohol en gel 250ml",  description: "Antibacterial",                categoria: "Higiene",      precio: 7000,  imagen: "alcohol-gel.jpg" },
  { nombre: "Pintura de Uñas",       description: "20ml color rojo",             categoria: "Belleza",      precio: 7000,  imagen: "pinta-unas.webp" },
  { nombre: "Ibuprofeno 400",        description: "Antiinflamatorio 20 comp.",   categoria: "Medicamentos", precio: 12000, imagen: "ibuprofeno.webp" }
];

/** @constant {string} Ruta (relativa) de la página de productos. */
const PRODUCTS_PAGE = "lista_de_productos.html";
/** @constant {string} Ruta (relativa) de la página del carrito. */
const CART_PAGE     = "carrito.html";

/**
 * Formatea un número como moneda ARS sin decimales.
 * @param {number} price - Monto a formatear.
 * @returns {string} Precio formateado (ej.: "$ 20.000").
 */
const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);




/**
 * Renderiza el catálogo dentro de `#catalogo`.
 * Si `lista` está vacía, muestra un mensaje de "sin resultados".
 *
 * @param {Producto[]} [lista=productos] - Lista de productos a mostrar.
 * @returns {void}
 */
function mostrarCatalogo(lista = productos) {
  const cont = document.getElementById("catalogo");
  if (!cont) return;

  if (!lista.length) {
    cont.innerHTML = `<div class="sin-resultados">No se encontraron productos con esos filtros.</div>`;
    return;
  }

  cont.innerHTML = lista.map((item, i) => `
    <div class="producto">
      <div class="prod-media">
        <img src="imagenes/productos/${item.imagen}" alt="${item.nombre}">
      </div>
      <h3 class="prod-nombre">${item.nombre}</h3>
      <p class="prod-precio">${formatPrice(item.precio)}</p>

      <div class="btn-row">
        <button type="button" class="btn-sec"     onclick="mostrardetalle(${i})">Ver descripción</button>
        <button type="button" class="btn-primary" onclick="agregar_al_carrito(${i})">Añadir al carrito</button>
      </div>
    </div>
  `).join("");
}

/**
 * Abre un diálogo de detalle con la info del producto seleccionado.
 * Requiere elementos: #detalle, #detalle-img, #detalle-nombre, #descr-prod.
 *
 * @param {ProductId} id - Índice del producto en `productos`.
 * @returns {void}
 */
function mostrardetalle(id) {
  const prod = productos[id];
  if (!prod) return;

  const el1 = document.getElementById("detalle-nombre");
  if (el1) el1.innerText = prod.nombre;

  const el2 = document.getElementById("descr-prod");
  if (el2) el2.innerText = prod.description;

  const img = document.getElementById("detalle-img");
  if (img){
    img.src = `imagenes/productos/${prod.imagen}`;
    img.alt = prod.nombre;
  }

  const dlg = document.getElementById("detalle");
  if (dlg?.showModal) dlg.showModal();
  else dlg?.setAttribute("open", "open");
}



/**
 * Aplica filtros combinados:
 *  - Texto (en `nombre` o `description`)
 *  - Rango de precio mínimo/máximo
 *  - Categorías seleccionadas (checkboxes name="cats")
 *
 * Renderiza el resultado en `#catalogo`.
 * @returns {void}
 */
function filtrarProducto() {
  const searchWord = (document.getElementById("search")?.value || "").trim().toLowerCase();
  const min = parseFloat(document.getElementById("price-min")?.value) || 0;
  const max = parseFloat(document.getElementById("price-max")?.value) || Number.POSITIVE_INFINITY;

  const catsSel = Array.from(document.querySelectorAll('input[name="cats"]:checked')).map(c => c.value);

  let lista = productos
    .filter(p => (p.nombre.toLowerCase().includes(searchWord) || p.description.toLowerCase().includes(searchWord)))
    .filter(p => p.precio >= min && p.precio <= max);

  if (catsSel.length) {
    lista = lista.filter(p => catsSel.includes(p.categoria));
  }

  mostrarCatalogo(lista);
}

/**
 * Conecta listeners de inputs (búsqueda, min/max) y checkboxes de categorías.
 * También implementa el botón "Limpiar" (si existe) para resetear filtros.
 * @returns {void}
 */
function addEvents() {

  ["search", "price-min", "price-max"].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener("input", filtrarProducto);
    el.addEventListener("change", filtrarProducto);
  });


  document.querySelectorAll('input[name="cats"]').forEach(chk =>
    chk.addEventListener("change", filtrarProducto)
  );


  const btnLimpiar = document.getElementById("btn-limpiar");
  if(btnLimpiar){
    btnLimpiar.addEventListener("click", (e) => {
      e.preventDefault();
      const search = document.getElementById("search");
      const pmin = document.getElementById("price-min");
      const pmax = document.getElementById("price-max");
      if(search) search.value = "";
      if(pmin) pmin.value = "";
      if(pmax) pmax.value = "";
      document.querySelectorAll('input[name="cats"]').forEach(chk => (chk.checked = false));
      mostrarCatalogo(productos);
    });
  }
}

/**
 * Busca por nombre dentro del catálogo ya renderizado.
 * Si `term` está vacío, muestra todos los productos.
 * Desplaza la vista hacia `#catalogo`.
 *
 * @param {string} term - Texto a buscar (no sensible a mayúsculas).
 * @returns {void}
 */
function buscarPorNombreEnCatalogo(term){
  const t = (term || "").trim().toLowerCase();
  if (!document.getElementById("catalogo")) return;
  if (!t) { mostrarCatalogo(productos); return; }

  const lista = productos.filter(p => p.nombre.toLowerCase().includes(t));
  mostrarCatalogo(lista);
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth", block:"start"});
}

/**
 * Conecta el formulario del header (`form.buscador`) para:
 *  - Si la página actual tiene catálogo, filtra en el lugar.
 *  - Si no lo tiene, redirige a PRODUCTS_PAGE con `?q=...`.
 * @returns {void}
 */
function conectarBuscadorHeader(){
  const formHeader = document.querySelector("form.buscador");
  if(!formHeader) return;

  formHeader.addEventListener("submit", (e)=>{
    e.preventDefault();
    const term = (document.getElementById("q")?.value || "").trim();
    const hayCatalogo = !!document.getElementById("catalogo");

    if(hayCatalogo){
      buscarPorNombreEnCatalogo(term);
    }else{
      const url = new URL(PRODUCTS_PAGE, location.href);
      if(term) url.searchParams.set("q", term);
      location.href = url.toString();
    }
  });
}

/**
 * Conecta enlaces de navegación por categoría (.nav-cat con data-cat):
 *  - En páginas con catálogo: aplica el filtro en el lugar.
 *  - En otras páginas: redirige a PRODUCTS_PAGE con `?cat=...`.
 * @returns {void}
 */
function conectarNavCategorias(){
  document.querySelectorAll(".nav-cat").forEach(a=>{
    a.addEventListener("click", (e)=>{
      const cat = a.dataset.cat;
      const hayCatalogo = !!document.getElementById("catalogo");

      if(hayCatalogo){
        e.preventDefault();
        document.querySelectorAll('input[name="cats"]').forEach(
          chk => chk.checked = (chk.value.toLowerCase() === cat.toLowerCase())
        );
        const searchInput = document.getElementById("search");
        if(searchInput) searchInput.value = "";
        filtrarProducto();
        document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
      }else{
        e.preventDefault();
        const url = new URL(PRODUCTS_PAGE, location.href);
        url.searchParams.set("cat", cat);
        location.href = url.toString();
      }
    });
  });
}

/**
 * Lee parámetros de la URL (`q`, `cat`) y aplica:
 *  - `q`: búsqueda por nombre
 *  - `cat`: selección de categoría
 * Si no hay filtros, renderiza el catálogo completo.
 * Requiere que exista `#catalogo` en la página.
 * @returns {void}
 */
function aplicarFiltroInicialDesdeURL(){
  if(!document.getElementById("catalogo")) return;

  const params = new URLSearchParams(location.search);
  const q   = (params.get("q")   || "").trim();
  const cat = (params.get("cat") || "").trim();

  if(q){
    buscarPorNombreEnCatalogo(q);
    return; 
  }
  if(cat){
    document.querySelectorAll('input[name="cats"]').forEach(
      chk => chk.checked = (chk.value.toLowerCase() === cat.toLowerCase())
    );
    filtrarProducto();
  }else{
    mostrarCatalogo(productos);
  }
}



/** @constant {string} Clave del carrito en localStorage. */
const CART_KEY = "carrito";

/**
 * Obtiene el carrito persistido (arreglo de ProductId).
 * Maneja errores del parseo devolviendo un arreglo vacío.
 * @returns {ProductId[]} Carrito actual.
 */
const getCart   = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };

/**
 * Persiste el carrito y actualiza el badge del botón de carrito.
 * @param {ProductId[]} arr - Carrito a guardar.
 * @returns {void}
 */
const setCart   = (arr) => { localStorage.setItem(CART_KEY, JSON.stringify(arr)); updateCartBadge(); };

/**
 * Cantidad de ítems (unidades) en el carrito.
 * @returns {number} Número de unidades.
 */
const cartCount = () => getCart().length;

/**
 * Asegura que el botón del carrito:
 *  - Redirija a la página del carrito al hacer click.
 *  - Muestre un badge con la cantidad de ítems.
 * Requiere `button[aria-label="carrito"]` en el DOM.
 * @returns {void}
 */
function ensureCartButton(){
  const btn = document.querySelector('button[aria-label="carrito"]');
  if(!btn) return;

  btn.addEventListener("click", ()=> location.href = CART_PAGE);


  if(!btn.querySelector(".badge")){
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = "0";
    btn.style.position = "relative";
    btn.appendChild(b);
  }
  updateCartBadge();
}

/**
 * Actualiza el badge del botón de carrito con la cantidad actual.
 * Oculta el badge si la cantidad es 0.
 * @returns {void}
 */
function updateCartBadge(){
  const btn = document.querySelector('button[aria-label="carrito"]');
  const badge = btn?.querySelector(".badge");
  if(!badge) return;
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n ? "flex" : "none";
}

/**
 * Agrega UNA unidad del producto `id` al carrito.
 * Efectos:
 *  - Persiste en localStorage
 *  - Actualiza badge
 *  - Loguea en consola el producto añadido
 *
 * @param {ProductId} id - Índice del producto en `productos`.
 * @returns {void}
 */
function agregar_al_carrito(id){
  const cart = getCart();
  cart.push(id);
  setCart(cart);
  updateCartBadge();


  try{ 
    const prod = productos[id]?.nombre || "Producto";
    console.log(`Añadido al carrito: ${prod}`);
  }catch{}
}

/**
 * Quita UNA unidad del producto `id` (primera aparición) del carrito.
 * Si la unidad existe, la elimina y vuelve a renderizar el carrito (si corresponde).
 *
 * @param {ProductId} id - Índice del producto en `productos`.
 * @returns {void}
 */
function quitar_una_del_carrito(id){
  const cart = getCart();
  const idx = cart.indexOf(id);
  if(idx !== -1){
    cart.splice(idx,1);
    setCart(cart);
  }
  renderCarrito(); 
}

/**
 * Vacía el carrito por completo y re-renderiza (si existe la vista de carrito).
 * @returns {void}
 */
function vaciar_carrito(){
  setCart([]);
  renderCarrito();
}

/**
 * Renderiza la grilla del carrito en `#carrito-grid` y el total en `#carrito-total`.
 * Si no hay ítems, muestra un mensaje con link para ver productos.
 * También enlaza el botón "BORRAR TODO" (`#btn-vaciar`) si existe.
 * @returns {void}
 */
function renderCarrito(){
  const cont = document.getElementById("carrito-grid");
  const totalEl = document.getElementById("carrito-total");
  if(!cont) return;

  const cart = getCart();

  if(!cart.length){
    cont.innerHTML = `<div class="sin-resultados">El carrito está vacío. <a href="${PRODUCTS_PAGE}">Ver productos</a></div>`;
    if(totalEl) totalEl.textContent = formatPrice(0);
    return;
  }

  cont.innerHTML = cart.map((id) => {
    const p = productos[id] || {};
    return `
      <div class="producto">
        <div class="prod-media">
          <img src="imagenes/productos/${p.imagen}" alt="${p.nombre || ""}">
        </div>
        <h3 class="prod-nombre">${p.nombre || "Producto"}</h3>
        <p class="prod-precio">${formatPrice(p.precio || 0)}</p>
        <div class="btn-row">
          <button type="button" class="btn-sec"     onclick="mostrardetalle(${id})">Ver descripción</button>
          <button type="button" class="btn-danger"  onclick="quitar_una_del_carrito(${id})">Borrar del carrito</button>
        </div>
      </div>`;
  }).join("");

  const total = cart.reduce((acc, id) => acc + (productos[id]?.precio || 0), 0);
  if(totalEl) totalEl.textContent = formatPrice(total);


  const btnVaciar = document.getElementById("btn-vaciar");
  if(btnVaciar && !btnVaciar.dataset.bound){
    btnVaciar.addEventListener("click", vaciar_carrito);
    btnVaciar.dataset.bound = "1";
  }
}




/**
 * Inicializa interacciones al cargar el DOM:
 *  - Conecta eventos de filtros
 *  - Renderiza el catálogo (si existe #catalogo)
 *  - Conecta buscador del header y nav de categorías
 *  - Aplica filtros iniciales desde la URL (q/cat)
 *  - Asegura botón y badge del carrito
 *  - Si estamos en la página de carrito, renderiza sus ítems
 * @listens DOMContentLoaded
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  addEvents();                
  mostrarCatalogo(productos);  
  conectarBuscadorHeader();
  conectarNavCategorias();
  aplicarFiltroInicialDesdeURL();

  ensureCartButton();
  updateCartBadge();

 
  if(document.getElementById("carrito-grid")){
    renderCarrito();
  }
});
