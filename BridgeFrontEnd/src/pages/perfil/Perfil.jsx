import { Comentarios } from "./Comentarios";
import { Builders } from "./Builders";
import { InformacionGeneral } from "./InformacionGeneral";
import { MiPerfil } from "./MiPerfil";
import { RatingRadar } from "../../components/RatingRadar";
import { useQuery } from "react-query";
import { getUserDetail } from "../../services/getUserData";
import { useAuthContext } from "../../context/AuthContext";
import { queryConfig } from "../../utils/queryConfig";

export const Perfil = () => {
  const { authUser } = useAuthContext();
  const { data: user, isLoading } = useQuery(
    ["profileDetail", authUser.email],
    () => getUserDetail(authUser.email),
    queryConfig
  );
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <h2 className="text-4xl text-gray-400/80">Perfil</h2>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 lg:pb-4">
            <MiPerfil user={user} profilePic={authUser.profilePic} />
            <RatingRadar skills={user?.skills} />
            <InformacionGeneral user={user} />
            <Builders builders={user?.builders} />
          </main>
          <Comentarios user={user} />
        </>
      )}
    </div>
  );
};
