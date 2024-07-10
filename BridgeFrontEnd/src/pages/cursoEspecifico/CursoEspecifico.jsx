import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCourseMembers, getSuggestions } from "../../services/courses";
import { queryConfig } from "../../utils/queryConfig";
import { UserCard } from "../../components/UserCard";
import { SkillsRadar } from "../../components/SkillsRadar";

const CursoEspecifico = () => {
  const { courseId } = useParams();
  const [isDisponible, setIsDisponible] = useState(false);
  const { data: sugerencias } = useQuery(
    "suggestions",
    () => getSuggestions(courseId),
    queryConfig
  );
  const { data: curso } = useQuery(
    "courseMembers",
    () => getCourseMembers(courseId),
    queryConfig
  );

  const usersProfilePic = useMemo(() => {
    if (!curso || !curso.users) return {};
    return curso.users.reduce((acc, user) => {
      acc[user.username] = user.profilePic;
      return acc;
    }, {});
  }, [curso]);

  return (
    <div className="flex flex-col p-8">
      <h3 className="text-3xl text-gray-400/80">{curso?.name}</h3>
      <div className="mt-4 text-lg">
        <h3>Código: {curso?.code}</h3>
        <h3>Turno: {curso?.shift}</h3>
        <h3>Día: {curso?.day}</h3>
        <h3>Período: {curso?.period}</h3>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-content-space-between">
          <div>
            <input
              name="disponibleToggle"
              className="border border-gray-300 rounded-md"
              type="radio"
              value={isDisponible}
              id="disponibleToggle"
            />
            <label htmlFor="disponibleToggle">
              {" "}
              Usuario disponible para formar Equipos
            </label>
          </div>
        </div>
        
         {/* <div>
          <input type="text" />
        </div>  */}


        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Buscar
        </button>

        <div className="grid grid-cols-1">
          {sugerencias?.map((sugerencia, index) => (
            <div
              className="flex flex-col lg:flex-row m-2 p-2 border border-gray-300 rounded-md"
              key={index}
            >
              <div
                className="p-3 text-white text-center text-2xl rounded-lg"
                style={{
                  background: `rgb(${255 * (1 - sugerencia.compatibility)}, ${255 * sugerencia.compatibility}, 0)`,
                }}
              >
                {parseFloat(sugerencia.compatibility * 100).toFixed(2)}%
              </div>
              <SkillsRadar
                skills={sugerencia.skills}
                className={"self-center"}
              />

              <div className="flex flex-col gap-2 w-full">
                {sugerencia?.members?.map((user) => (
                  <UserCard
                    key={user.username}
                    profilePic={usersProfilePic[user.username]}
                    username={user.username}
                    name={user.name}
                    className={"sm:w-full lg:max-w-[300px]"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default CursoEspecifico;
