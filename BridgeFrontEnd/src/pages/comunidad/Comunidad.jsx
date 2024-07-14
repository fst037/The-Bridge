import React from 'react';
import { useQuery } from 'react-query';
import { queryConfig } from '../../utils/queryConfig';
import { getUserBuilders } from '../../services/getUserData';
import { UserCard } from '../../components/UserCard';
import { getUserRecommended } from '../../services/getUserData';
import { getUserKnown } from '../../services/getUserData';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';

export const Comunidad = () => {

  const { data: builders, isLoading: buildersLoading } = useQuery("builders", getUserBuilders, queryConfig);
  const { data: recomendados, isLoading: recomendadosLoading } = useQuery("recomendados", getUserRecommended, queryConfig);
  const { data: conocidos, isLoading: conocidosLoading } = useQuery("conocidos", getUserKnown, queryConfig);
  const { width } = useWindowSize();
  const maxCards = width >= 640 ? 12 : 4;

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4">
        <h3 className="text-4xl text-gray-400/80">Comunidad</h3>
      </div>
      <div>          
        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <h4 className="text-lg font-[500] mb-4">Builders</h4>
          {buildersLoading && <div>Cargando...</div>}
          {builders && (          
            <>
              {builders?.length === 0 ? 
              (
                <div className="text-center text-gray-400/80">
                  No se encontraron usuarios
                </div>
              ):(
                <>
                  <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
                    {builders?.slice(0, maxCards).map(({ name, username, profilePic }) => (
                      <UserCard
                        key={username}
                        profilePic={profilePic}
                        name={name}
                        username={username}
                        className={"w-full"}
                      />
                    ))}
                  </div>
                  <Link to="/builders">
                    <button className="w-full rounded-lg text-xl text-white transition hover:bg-[#01AAB3] bg-[#009CA4] mt-2 p-1">
                      Ver más
                    </button>
                  </Link>
                </>
              )}                
            </>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <h4 className="text-lg font-[500] mb-4">Recomendados</h4>
          {recomendadosLoading && <div>Cargando...</div>}
          {recomendados && (          
            <>
              {recomendados?.length === 0 ? 
              (
                <div className="text-center text-gray-400/80">
                  No se encontraron usuarios
                </div>
              ):(
                <>
                  <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
                    {recomendados?.slice(0, maxCards).map(({ name, username, profilePic }) => (
                      <UserCard
                        key={username}
                        profilePic={profilePic}
                        name={name}
                        username={username}
                        className={"w-full"}
                      />
                    ))}
                  </div>
                  <Link to="/recomendados">
                    <button className="w-full rounded-lg text-xl text-white transition hover:bg-[#01AAB3] bg-[#009CA4] mt-2 p-1">
                      Ver más
                    </button>
                  </Link>
                </>
              )}                
            </>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <h4 className="text-lg font-[500] mb-4">Conocidos</h4>
          {conocidosLoading && <div>Cargando...</div>}
          {conocidos && (          
            <>
              {conocidos?.length === 0 ? 
              (
                <div className="text-center text-gray-400/80">
                  No se encontraron usuarios
                </div>
              ):(
                <>
                  <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
                    {conocidos?.slice(0, maxCards).map(({ name, username, profilePic }) => (
                      <UserCard
                        key={username}
                        profilePic={profilePic}
                        name={name}
                        username={username}
                        className={"w-full"}
                      />
                    ))}
                  </div>
                  <Link to="/conocidos">
                    <button className="w-full rounded-lg text-xl text-white transition hover:bg-[#01AAB3] bg-[#009CA4] mt-2 p-1">
                      Ver más
                    </button>
                  </Link>
                </>
              )}                
            </>
          )}
        </div>        
      </div>
    </div>
  );
};

