import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { useQuery } from 'react-query'
import { queryConfig } from '../utils/queryConfig'
import { getTeamsSugestions } from '../services/teams'

export const CompleteTeamAutoModal = ({ isOpen, setIsOpen, cardRef, team}) => {
  const [teamMembers, setTeamMembers] = useState(team.estudiantes.lenght);
  const [courseCode, setCourseCode] = useState("");  
  let isLoading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data: teamsSugestions, isLoading } = useQuery(
      "teamsSugestions",
      () => getTeamsSugestions(teamMembers, team.team.identifier, courseCode),
      queryConfig
    );
    console.log("Generar sugerencias para completar el equipo");
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Generar sugerencias para completar el equipo"}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          type={"number"}
          Icon={RiTeamLine}
          placeholder={"Introduce la cantidad de personas totales del equipo"}
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
        />
        <FormInput
          type={"text"}
          Icon={RiTeamLine}
          placeholder={"Introduce el codigo del curso"}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <AddActionButton text={"Generar"} isLoading={isLoading} />
      </form>
    </Modal>
  );
};