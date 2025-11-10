import { Link } from "react-router-dom";
import "@styles/navbar.scss";

export default function Navbar() {
  return (
    <nav className="nav-categorias" aria-label="atajos para productos">
      <div className="segmented">
        <Link className="nav-cat" to="/productos?cat=Bebes">Bebes</Link>
        <Link className="nav-cat" to="/productos?cat=Belleza">Belleza</Link>
        <Link className="nav-cat" to="/productos?cat=Medicamentos">Medicamentos</Link>
        <Link className="nav-cat" to="/productos?cat=Vitaminas">Vitaminas</Link>
        <Link className="nav-cat" to="/productos?cat=Pelo">Pelo</Link>
        <Link className="nav-cat" to="/productos?cat=Higiene">Higiene</Link>
      </div>
    </nav>
  );
}
