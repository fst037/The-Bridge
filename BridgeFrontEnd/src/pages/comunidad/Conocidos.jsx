import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getUserKnown } from "../../services/getUserData";
import { UsersComunidad } from "../../components/UsersComunidad";


export const Conocidos = () => {
  const { data: known, isLoading } = useQuery("conocidos", getUserKnown, queryConfig);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4">
            <h3 className="text-4xl text-gray-400/80">Conocidos</h3>
      </div>
      {isLoading && <div className="mt-5">Cargando...</div>}
      {known && (          
        <div>
          <UsersComunidad users={known} />
        </div>
      )}
    </div>
  );
};