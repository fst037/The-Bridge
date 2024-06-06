import { useNavigate } from "react-router-dom";
import { IconoUser } from "./IconoUser";
import { PersonasInfo } from "./PersonasInfo";
import { PersonasInfoWrapper } from "./PersonasInfoWrapper";
import "./style.css";

export const PaginaInicio = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="pagina-inicio">
      <div className="overlap-3">
        <div className="PLANTILLA-PARA">
          <div className="overlap-4">
            <div className="overlap-5">
              <div className="barra-superior">
                <IconoUser className="icono-user-instance" />
                <img className="bridge" alt="Bridge" src="bridge.png" />
              </div>
              <img className="logo" alt="Logo" src="logo.png" />
              <div className="buscador">
                <div className="overlap-6">
                  <img className="buscar" alt="Buscar" src="buscar-2.png" />
                  <div className="text-wrapper-4">Buscar</div>
                </div>
              </div>
            </div>
            <div className="iconos-wrapper">
              <div className="iconos">
                <div className="home" />
                <img className="setting" alt="Setting" src="setting-1.png" />
                <div className="notificaciones" />
                <div className="ratings" />
                <div className="mi-perfil" />
                <div className="mis-equipos" />
                <div className="mis-cursos" />
                <div className="comunidad" />
              </div>
            </div>
            <div className="text-wrapper-5">Mis Cursos</div>
            <div className="curso-info">
              <div className="group">
                <div className="overlap-group-3">
                  <div className="text-wrapper-6">NombreCurso</div>
                  <div className="text-wrapper-7">Informacion del curso</div>
                </div>
              </div>
              <div className="group-2">
                <div className="overlap-7">
                  <div className="text-wrapper-8">NombreCurso</div>
                  <div className="text-wrapper-9">Informacion del curso</div>
                </div>
                <div className="overlap-group-wrapper">
                  <div className="overlap-group-3">
                    <div className="text-wrapper-6">NombreCurso</div>
                    <div className="text-wrapper-7">Informacion del curso</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-wrapper-10">Comunidad</div>
            <div className="text-wrapper-11">Mis Equipos</div>
            <img className="line" alt="Line" src="line-3.svg" />
            <img className="line-2" alt="Line" src="line-2.svg" />
            <div className="equipos-info">
              <div className="overlap-group-3">
                <div className="text-wrapper-6">NombreEquipo</div>
                <div className="text-wrapper-7">Informacion del curso</div>
                <img
                  className="contarmiembros"
                  alt="Contarmiembros"
                  src="contarmiembros-1-2.png"
                />
                <div className="text-wrapper-12">8</div>
              </div>
            </div>
            <div className="overlap-8">
              <div className="personas">
                <PersonasInfo
                  className="personas-info-instance"
                  iconouser="iconouser2-1-2.png"
                />
                <PersonasInfoWrapper
                  className="design-component-instance-node"
                  iconouser="iconouser3-1-2.png"
                />
                <div className="overlap-wrapper">
                  <div className="overlap-9">
                    <div className="text-wrapper-13">NombreUsuario</div>
                    <div className="overlap-10">
                      <div className="text-wrapper-14">infoUsuario</div>
                      <img
                        className="iconouser-2"
                        alt="Iconouser"
                        src="iconouser4-3.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="agregaruser"
                alt="Agregaruser"
                src="agregaruser-1.png"
              />
              <img
                className="agregaruser-2"
                alt="Agregaruser"
                src="agregaruser-3.png"
              />
            </div>
            <div className="equipos-info-2">
              <div className="overlap-7">
                <div className="text-wrapper-6">NombreEquipo</div>
                <div className="text-wrapper-7">Informacion del curso</div>
                <img
                  className="contarmiembros"
                  alt="Contarmiembros"
                  src="contarmiembros-1.png"
                />
                <div className="text-wrapper-12">7</div>
              </div>
              <div className="div-wrapper">
                <div className="overlap-group-3">
                  <div className="text-wrapper-6">NombreEquipo</div>
                  <div className="text-wrapper-7">Informacion del curso</div>
                  <img
                    className="contarmiembros"
                    alt="Contarmiembros"
                    src="image.png"
                  />
                  <div className="text-wrapper-12">10</div>
                </div>
              </div>
            </div>
            <div className="boton-nuevo">
              <div className="overlap-11">
                <div className="text-wrapper-15">Nuevo +</div>
              </div>
            </div>
            <div className="boton-nuevo-2">
              <div className="overlap-11">
                <div className="text-wrapper-16">Nuevo +</div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="agregaruser-3"
          alt="Agregaruser"
          src="agregaruser-2.png"
        />
        <div className="ver-ms">
          <div className="overlap-12">
            <img className="line-3" alt="Line" src="line-1.svg" />
            <div className="rectangle" />
            <div className="text-wrapper-17">+ Ver más</div>
          </div>
        </div>
        <div className="ver-ms-2">
          <div className="overlap-13">
            <div className="rectangle-2" />
            <div className="text-wrapper-18">+ Ver más</div>
          </div>
        </div>
        <div className="ver-ms-3">
          <div className="overlap-14">
            <div className="text-wrapper-18">+ Ver más</div>
          </div>
        </div>
        <div className="text-wrapper-19">Inicio</div>
        <button onClick={handleRegisterClick}>Registrarme</button>
      </div>
    </div>
  );
};
