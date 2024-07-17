import { useParams } from "react-router-dom";
import { MiPerfil } from "../perfil/MiPerfil";
import { useQuery } from "react-query";
import { getProfilePic, getUserDetail } from "../../services/getUserData";
import { queryConfig } from "../../utils/queryConfig";
import { RatingRadar } from "../../components/RatingRadar";
import { InformacionGeneral } from "../perfil/InformacionGeneral";
import { Builders } from "../perfil/Builders";
import { Comentarios } from "../perfil/Comentarios";
import { Proyecto } from "../../components/Proyecto";

export const PerfilEspecifico = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useQuery(
    ["specificProfileDetail", username],
    () => getUserDetail(username),
    queryConfig
  );

  const { data: profilePicUrl, isLoadingProfilePic } = useQuery(
    ["specificProfilePic"],
    () => getProfilePic(username),
    queryConfig
  );


  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 lg:gap-8">
      <h2 className="text-4xl text-gray-400/80">Perfil</h2>
      {(isLoading || isLoadingProfilePic) && <p>Cargando...</p>}
      {!isLoading && !isLoadingProfilePic && (
        <>
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <MiPerfil user={user} profilePic={profilePicUrl} />
            <RatingRadar skills={user?.skills} username={user?.username}/>
            <InformacionGeneral user={user} />
            <Builders builders={user?.builders} />
          </main>
          <Comentarios user={user} />
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex">
              <h4 className="text-lg font-[500]">Proyectos</h4>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(600px,_1fr))] gap-2 items-start mb-4">
              {user?.projects.map((project) => {
                return <Proyecto key={project?.identifier} project={project} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
