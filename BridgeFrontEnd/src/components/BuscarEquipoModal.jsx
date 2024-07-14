import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { getTeamsSugestions2 } from "../services/teams";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export const BuscarEquipoModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  setSugerencias,
  courseCode,
}) => {
  const [teamMembers, setTeamMembers] = useState("");

  const mutation = useMutation(getTeamsSugestions2, {
    onSuccess: (data) => {
      console.log(data);
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
    if (!teamMembers || !courseCode) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    mutation.mutate({ courseCode, teamMembers });
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
          placeholder={"Introduce la cantidad de personas totales del equipo"}
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
        />
        <AddActionButton text={"Buscar"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};

export default BuscarEquipoModal;
