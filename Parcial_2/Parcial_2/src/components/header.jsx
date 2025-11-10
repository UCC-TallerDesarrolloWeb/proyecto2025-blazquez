import { Link } from "react-router-dom";
import '@styles/header.scss';
import logo from '@assets/home/logo_farmacia.png';


export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-container">

        <div className="logo" role="img" aria-label="logo-farmacia">
          <img src={logo} alt="logo-farmacia" />
        </div>

        <h1 className="siteTitle">Farmacia Rondeau</h1>

       
        <form className="buscador" role="search" onSubmit={(e) => e.preventDefault()}>
          <span className="material-symbols-outlined lupa">search</span>
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Buscar productos"
            maxLength={60}
          />
        </form>


      
        <Link to="/carrito">
          <button className="pill" aria-label="carrito">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </Link>

      
        <Link to="/">
          <button className="pill" aria-label="main"><h4>Main</h4></button>
        </Link>

      </div>
    </header>
  );
}
