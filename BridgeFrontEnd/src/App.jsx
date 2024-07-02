import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Layout } from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import { Perfil } from "./pages/perfil/Perfil";
import { Cursos } from "./pages/cursos/Cursos";
import { Equipos } from "./pages/equipos/Equipos";
import { Comunidad } from "./pages/Comunidad";
import { Ratings } from "./pages/Ratings";
import { Inicio } from "./pages/inicio/Inicio";
import EncuestaPage from "./pages/encuesta/EncuestaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="perfil/encuesta" element={<EncuestaPage />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
