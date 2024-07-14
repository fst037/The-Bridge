import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { getCompleteTeamsSugestions} from '../services/teams'
import { useMutation } from 'react-query'
import toast from "react-hot-toast";

export const CompleteTeamAutoModal = ({ isOpen, setIsOpen, cardRef, team, sugerencias, setSugerencias, courses}) => {
  const [teamMembers, setTeamMembers] = useState("");
  const [courseCode, setCourseCode] = useState("");

  useEffect(() => {
    setTeamMembers(team?.[0]?.estudiantes?.length);
    setCourseCode(courses?.[0]?.code);
  }, [team, courses]);

  const mutation = useMutation(
    getCompleteTeamsSugestions,  
    {
      onSuccess: (data) => {
        setSugerencias(data);
        toast.success(`Sugerencias generadas exitosamente`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error("Error al generar las sugerencias: " + error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamMembers || !courseCode) return;
    mutation.mutate({teamMembers, teamIdentifier:team?.[0]?.team.identifier , courseCode});
  }


  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Generar sugerencias para completar el equipo"}
    >
      <form className="flex flex-col gap-4 content-box" onSubmit={handleSubmit}>
        <FormInput
          type={"number"}
          Icon={RiTeamLine}
          placeholder={"Introduce la cantidad de personas totales del equipo"}
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
        />
        <select
          className="form-select w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          {courses?.map(course => (
            <option key={course.code} value={course.code}>{course.name}</option>
          ))}
        </select>
        <AddActionButton text={"Generar"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};