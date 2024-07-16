import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { getCreateTeamsSugestions } from "../services/teams";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export const SugerirEquiposAutoModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  setSugerencias,
  course,
}) => {
  const [teamMembers, setTeamMembers] = useState("");

  const mutation = useMutation(getCreateTeamsSugestions, {
    onSuccess: (data) => {
      setSugerencias(data);
      toast.success(`Sugerencias generadas exitosamente`);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Error al generar las sugerencias: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamMembers) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    mutation.mutate({ courseCode: course.code, teamMembers: teamMembers });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Generar sugerencias para armar equipo"}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          type={"number"}
          Icon={RiTeamLine}
          placeholder={"Tamaño del equipo"}
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
        />
        <AddActionButton
          text={"Generar sugerencias"}
          isLoading={mutation.isLoading}
        />
      </form>
    </Modal>
  );
};
