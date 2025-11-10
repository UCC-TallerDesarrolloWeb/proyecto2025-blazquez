import { Link } from "react-router-dom";
import "@styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-categorias" aria-label="atajos para productos">
      <div className="segmented">
        <Link className="nav-cat" to="/lista_de_productos?cat=Bebes">Bebes</Link>
        <Link className="nav-cat" to="/lista_de_productos?cat=Belleza">Belleza</Link>
        <Link className="nav-cat" to="/lista_de_productos?cat=Medicamentos">Medicamentos</Link>
        <Link className="nav-cat" to="/lista_de_productos?cat=Vitaminas">Vitaminas</Link>
        <Link className="nav-cat" to="/lista_de_productos?cat=Pelo">Pelo</Link>
        <Link className="nav-cat" to="/lista_de_productos?cat=Higiene">Higiene</Link>
      </div>
    </nav>
  );
}
