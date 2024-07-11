import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { getTeamsSugestions } from '../services/teams'
import { useMutation } from 'react-query'
import toast from "react-hot-toast";

export const CompleteTeamAutoModal = ({ isOpen, setIsOpen, cardRef, team, sugerencias, setSugerencias}) => {
  const [teamMembers, setTeamMembers] = useState(team.estudiantes.length);
  const [courseCode, setCourseCode] = useState("");

  const mutation = useMutation(
    getTeamsSugestions,  
    {
      onSuccess: (data) => {
        setSugerencias(data);
        toast.success(`Sugerencias generadas exitosamente`);
        console.log("sugerencias", data);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error("Error al generar las sugerencias: " + error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    console.log("teamMembers", teamMembers);
    console.log("courseCode", courseCode);
    console.log("team", team.team.identifier);
    e.preventDefault();
    if (!teamMembers || !courseCode) return;
    mutation.mutate({teamMembers, teamIdentifier:team.team.identifier , courseCode});
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
        <AddActionButton text={"Generar"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};