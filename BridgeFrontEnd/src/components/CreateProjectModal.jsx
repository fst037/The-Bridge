import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiFolderLine} from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { useQuery } from 'react-query'
import { queryConfig } from '../utils/queryConfig'
import { getTeamsSugestions } from '../services/teams'

export const CreateProjectModal = ({ isOpen, setIsOpen, cardRef, teams, courses}) => {
  let isLoading = false;
  const [projectName, setProjectName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teamIdentifier, setTeamIdentifier] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Nuevo Proyecto"}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          type={"text"}
          Icon={RiFolderLine}
          placeholder={"Introduce el nombre del proyecto"}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <select
          className="form-select w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={teamIdentifier}
          onChange={(e) => setTeamIdentifier(e.target.value)}
        >
          {teams.map(team => (
            <option key={team.identifier} value={team.identifier}>{team.nombre}</option>
          ))}
        </select>

        <select
          className="form-select w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          <option disabled>Selecciona el curso</option>
          {courses.map(course => (
            <option key={course.code} value={course.code}>{course.name}</option>
          ))}
        </select>
        <AddActionButton text={"Crear Proyecto"} isLoading={isLoading} />
      </form>
    </Modal>
  );
};