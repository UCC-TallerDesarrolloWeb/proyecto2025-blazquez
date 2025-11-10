// src/pages/ListaDeProductos.jsx
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@components/ProductCard.jsx";
import Filters from "@components/Filters.jsx";
import DetalleModal from "@components/DetalleModal.jsx";
import { productos } from "@data/products.js";
import { useLocalStorage } from "@utils/useLocalStorage.js";
import "@styles/tienda.css";

const CART_KEY = "carrito";

export default function ListaDeProductos() {
  const [searchText, setSearchText] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [cats, setCats] = useState([]);
  const [detalle, setDetalle] = useState(null);

  // carrito: array de índices (como en tu JS)
  const [ setCart] = useLocalStorage(CART_KEY, []);



  // Filtro por URL (?q, ?cat), como en tu HTML/JS original
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = (params.get("q") || "").trim();
    const cat = (params.get("cat") || "").trim();

    if (q) setSearchText(q);
    if (cat) {setCats([cat]);}
  }, []);

  const listaFiltrada = useMemo(() => {
    const s = searchText.trim().toLowerCase();
    return productos
      .filter(p => !s || p.nombre.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
      .filter(p => (priceMin == null || p.precio >= priceMin))
      .filter(p => (priceMax == null || p.precio <= priceMax))
      .filter(p => (cats.length ? cats.includes(p.categoria) : true));
  }, [searchText, priceMin, priceMax, cats]);

  const limpiar = () => {
    setSearchText("");
    setPriceMin(undefined);
    setPriceMax(undefined);
    setCats([]);
  };

  const addToCart = (id) => setCart((prev) => [...prev, id]);

  return (
    <main className="container tienda">
      <Filters
        searchText={searchText} setSearchText={setSearchText}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        cats={cats} setCats={setCats}
        onClear={limpiar}
      />

      <section className="catalogo" id="catalogo" aria-live="polite" role="list">
        {listaFiltrada.length === 0 ? (
          <div className="sin-resultados">No se encontraron productos con esos filtros.</div>
        ) : (
          listaFiltrada.map((p, i) => (
            <ProductCard
              key={`${p.nombre}-${i}`}
              producto={p}
              onAdd={() => addToCart(productos.indexOf(p))}
              onDetail={() => setDetalle(p)}
            />
          ))
        )}
      </section>

      <DetalleModal open={!!detalle} producto={detalle} onClose={()=>setDetalle(null)} />
    </main>
  );
}
