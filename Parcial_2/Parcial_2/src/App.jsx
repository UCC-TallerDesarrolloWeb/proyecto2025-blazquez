// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Ajustá estos imports a cómo tengas configurados tus alias/rutas:
import Header from "@components/Header";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Home from "@pages/index";
import ListaDeProductos from "@pages/ListaDeProductos";
import Carrito from "@pages/carrito";

const App = () => {
  const { pathname } = useLocation();

  // Mostrar buscador solo en la página de lista
  const showSearch = pathname === "/lista_de_productos";

  return (
    <>
      <Header showSearch={showSearch} />
      <Navbar/>

      <main className={showSearch ? "container tienda" : "container"}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/lista_de_productos" element={<ListaDeProductos />} />
          <Route path="/carrito" element={<Carrito/>} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
