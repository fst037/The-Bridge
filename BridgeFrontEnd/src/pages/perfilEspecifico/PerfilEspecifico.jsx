import { useParams } from "react-router-dom";
import { MiPerfil } from "../perfil/MiPerfil";
import { useQuery } from "react-query";
import { getUserDetail } from "../../services/getUserData";
import { queryConfig } from "../../utils/queryConfig";
import { RatingRadar } from "../../components/RatingRadar";
import { InformacionGeneral } from "../perfil/InformacionGeneral";
import { Builders } from "../perfil/Builders";
import { Comentarios } from "../perfil/Comentarios";

const PerfilEspecifico = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useQuery(
    ["specificProfileDetail", username],
    () => getUserDetail(username),
    queryConfig
  );

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-8">
      <h2 className="text-4xl text-gray-400/80">Perfil</h2>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 pb-12">
        {isLoading && <p>Cargando...</p>}
        {!isLoading && (
          <>
            <MiPerfil user={user} />
            <RatingRadar skills={user?.skills} />
            <InformacionGeneral user={user} />
            <Builders /> <Comentarios />
            {/* Falta un endpoint para ver los builders y comentarios de un user.
						MisComentarios tendria que mostrar todos los comentarios con un atributo boolean de si esta oculto.
						y comentarios de otros users deberia mostrar solo los que no estan ocultos*/}
          </>
        )}
      </main>
    </div>
  );
};

export default PerfilEspecifico;
