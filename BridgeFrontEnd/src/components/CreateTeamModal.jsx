import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { createTeam } from "../services/teams";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

export const CreateTeamModal = ({ isOpen, setIsOpen, cardRef }) => {
  const [teamName, setTeamName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(createTeam, {
    onSuccess: (data) => {
      toast.success(`Equipo ${data.team.nombre} creado exitosamente`);
      queryClient.invalidateQueries("teams");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Error al crear el equipo: " + error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) return;
    mutation.mutate({ teamName });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Nuevo Equipo"}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          type={"text"}
          Icon={RiTeamLine}
          placeholder={"Introduce el nombre del equipo"}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <AddActionButton text={"Crear equipo"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};
