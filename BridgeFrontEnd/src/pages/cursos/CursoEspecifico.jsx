import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCourseMembers, setUserAvailability } from "../../services/courses";
import { queryConfig } from "../../utils/queryConfig";
import { UserCard } from "../../components/UserCard";
import SugerenciasEquipos from "../../components/SugerenciasEquipos";
import { SugerirEquiposAutoModal } from "../../components/SugerirEquiposAutoModal";
import { useCardToggle } from "../../hooks/useCardToggle";
import { RiArrowDownLine } from "react-icons/ri";
import { getLoggedUsername } from "../../services/getUserData";
import { isUserAvailable } from "../../services/courses";

export const CursoEspecifico = () => {
  const { courseId } = useParams();  
  const {isOpen, setIsOpen, cardRef } = useCardToggle();
  const [sugerencias, setSugerencias] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const { data: curso, isLoading } = useQuery(
    ("courseMembers"+courseId),
    () => getCourseMembers(courseId),
    queryConfig
  );

  const { data: isAvailable } = useQuery(
    "isUserAvailable"+courseId+getLoggedUsername,
    () => isUserAvailable(courseId),
    queryConfig
  );

  const [isDisponible, setIsDisponible] = useState(false);

  useEffect(() => {
    if (isAvailable !== undefined) {
      setIsDisponible(isAvailable);
    }
  }, [isAvailable]);


  const handleDisponibilidad = () => {
    setIsDisponible(!isDisponible);
    setUserAvailability(courseId, !isDisponible);
  };

  const usersProfilePic = useMemo(() => {
    if (!curso || !curso.users) return {};
    return curso.users.reduce((acc, user) => {
      acc[user.username] = user.profilePic;
      return acc;
    }, {});
  }, [curso]);

  return (
    <div className="p-4 md:p-8">
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>          
          <h3 className="text-3xl text-gray-400/80">{curso?.name}</h3>

          <div className="border border-gray-300 rounded-lg p-4 mt-4">
            <h4 className="text-lg font-[500]">Detalles</h4>            
            <h3>Código: {curso?.code}</h3>
            <h3>Turno: {curso?.shift}</h3>
            <h3>Día: {curso?.day}</h3>
            <h3>Período: {curso?.period}</h3> 
          </div>        

          <div className="border border-gray-300 rounded-lg p-4 mt-4">
            <div className="flex justify-between flex-col md:flex-row gap-4">
              <h4 className="text-lg font-[500]">Sugerencias de Equipo</h4>
              <div className="flex justify-content-space-between gap-3 items-center">
                <h4 className="text-lg font-[500]">Estoy disponible para formar un equipo</h4>
                <div className={`toggle-container min-w-[60px] ${isDisponible ? 'bg-green-400' : ''}`} onClick={handleDisponibilidad}>
                  <span className={`toggle-text ${isDisponible ? '' : 'hidden'}`}>SI</span>
                  <div className={`toggle-knob ${isDisponible ? 'toggled' : ''}`}></div>
                  <span className={`toggle-text self-right ml-auto ${isDisponible ? 'hidden' : ''}`}>NO</span>
                </div>
              </div>
            </div>
                        

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 mb-4"
              onClick={() => setIsOpen(true)}
            >
              Generar sugerencias de equipos
            </button>

            <RiArrowDownLine onClick={() => setShowSuggestions(!showSuggestions)}  className={`h-6 w-auto self-center mx-auto cursor-pointer ${(showSuggestions && sugerencias.length != 0) ? 'rotate-180 mb-4' : 'rotate-0'} transition`}/>

            {(showSuggestions && sugerencias.length != 0) && <SugerenciasEquipos sugerencias={sugerencias} usersProfilePic={usersProfilePic}/>}                       
          </div>

          <h2 className="mt-4 mb-4 text-2xl">Alumnos</h2>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
            {curso?.users?.map((user) => (
              <UserCard
                key={user.username}
                profilePic={user.profilePic}
                name={user.name}
                username={user.username}
                className={"w-full"}
              />
            ))}
          </div>
          <SugerirEquiposAutoModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  cardRef={cardRef}
                  setSugerencias={setSugerencias}
                  course={curso}
                />
        </>
      )}
    </div>      
  );
};

