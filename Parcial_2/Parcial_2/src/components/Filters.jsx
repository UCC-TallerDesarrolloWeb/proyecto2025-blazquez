// src/components/Filters.jsx
import React from "react";

const CATS = ["Bebes", "Belleza", "Medicamentos", "Vitaminas", "Pelo", "Higiene"];

export default function Filters({
  searchText, setSearchText,
  priceMin, setPriceMin,
  priceMax, setPriceMax,
  cats, setCats,
  onClear
}) {
  const toggleCat = (c) =>
    setCats((prev) => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]));

  return (
    <aside className="filtros panel">
      <h3 className="titulo-filtros">FILTROS</h3>

      <div className="bloque-filtro">
        <label htmlFor="search" className="lbl">Nombre</label>
        <input id="search" className="inp" placeholder="BUSCAR"
               value={searchText} onChange={e=>setSearchText(e.target.value)} />
      </div>

      <div className="bloque-filtro">
        <div className="lbl">Precio</div>
        <div className="grid-precio">
          <label className="mini">Mínimo:</label>
          <input className="inp-minmax" type="number" min="0" step="1000"
                 value={priceMin ?? ""} onChange={e=>setPriceMin(e.target.value ? Number(e.target.value) : undefined)} />
          <label className="mini">Máximo:</label>
          <input className="inp-minmax" type="number" min="0" step="1000"
                 value={priceMax ?? ""} onChange={e=>setPriceMax(e.target.value ? Number(e.target.value) : undefined)} />
        </div>
      </div>

      <div className="bloque-filtro">
        <div className="lbl">Categoria</div>
        <ul className="lista-cats">
          {CATS.map((c) => (
            <li key={c}>
              <label>
                <input type="checkbox" checked={cats.includes(c)} onChange={()=>toggleCat(c)} />
                {" "}{c}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="acciones-filtro">
        <button className="btn-sec" onClick={onClear}>Limpiar filtros</button>
      </div>
    </aside>
  );
}
