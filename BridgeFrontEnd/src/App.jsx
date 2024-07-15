import "react-image-crop/dist/ReactCrop.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Layout } from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import { Perfil } from "./pages/perfil/Perfil";
import { Cursos } from "./pages/cursos/Cursos";
import { Equipos } from "./pages/equipos/Equipos";
import { Comunidad } from "./pages/comunidad/Comunidad";
import { Builders } from "./pages/comunidad/Builders";
import { Recomendados } from "./pages/comunidad/Recomendados";
import { Conocidos } from "./pages/comunidad/Conocidos";
import { Inicio } from "./pages/inicio/Inicio";
import { CursoEspecifico } from "./pages/cursos/CursoEspecifico";
import { Proyectos } from "./pages/proyectos/Proyectos";
import { EquipoEspecifico } from "./pages/equipos/EquipoEspecifico";
import { EncuestaPage } from "./pages/encuesta/EncuestaPage";
import { PerfilEspecifico } from "./pages/perfilEspecifico/PerfilEspecifico";
import { ProyectoEspecifico } from "./pages/proyectos/ProyectoEspecifico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="perfil/encuesta" element={<EncuestaPage />} />
          <Route path="perfil/:username" element={<PerfilEspecifico />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="curso/:courseId" element={<CursoEspecifico />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="equipo/:teamId" element={<EquipoEspecifico />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="proyecto/:projectId" element={<ProyectoEspecifico />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="builders" element={<Builders />} />
          <Route path="recomendados" element={<Recomendados />} />
          <Route path="conocidos" element={<Conocidos />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
