import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiFolderLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import { createProject } from "../services/projects";
import toast from "react-hot-toast";

export const CreateProjectModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  teams,
  courses,
}) => {
  const [projectName, setProjectName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [teamIdentifier, setTeamIdentifier] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (teams.length === 1) {
      setTeamIdentifier(teams[0].identifier);
    }
  }, [teams]);

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("teamInformation");
      toast.success("Equipo creado correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutate({ projectName, courseCode, teamIdentifier });
  };

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
          {teams.map((team) => (
            <option key={team.identifier} value={team.identifier}>
              {team.nombre}
            </option>
          ))}
        </select>

        <select
          className="form-select w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          <option disabled>Selecciona el curso</option>
          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.name}
            </option>
          ))}
        </select>
        <AddActionButton
          text={"Crear Proyecto"}
          isLoading={mutation.isLoading}
        />
      </form>
    </Modal>
  );
};
