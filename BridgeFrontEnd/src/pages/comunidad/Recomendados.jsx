import React from 'react'
import { getUserRecommended } from '../../services/getUserData';
import { useQuery } from 'react-query';
import { queryConfig } from '../../utils/queryConfig';
import { UsersComunidad } from '../../components/UsersComunidad';

export const Recomendados = () => {
  const { data: recommended, isLoading } = useQuery("recomendados", getUserRecommended, queryConfig);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4">
            <h3 className="text-4xl text-gray-400/80">Recomendados</h3>
      </div>
      {isLoading && <div className="mt-5">Cargando...</div>}
      {recommended && (          
        <div>
          <UsersComunidad users={recommended} />
        </div>
      )}
    </div>
  );
}
