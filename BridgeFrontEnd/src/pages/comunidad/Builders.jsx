import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getUserBuilders } from "../../services/getUserData";
import { UsersComunidad } from "../../components/UsersComunidad";


export const Builders = () => {  
  const { data: builders, isLoading } = useQuery("builders", getUserBuilders, queryConfig);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4">
            <h3 className="text-4xl text-gray-400/80">Builders</h3>
      </div>
      {isLoading && <div className="mt-5">Cargando...</div>}
      {builders && (          
        <div>
          <UsersComunidad users={builders} />
        </div>
      )}
    </div>
  );
};