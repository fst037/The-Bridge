import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { RiTeamLine } from "react-icons/ri";
import { AddActionButton } from "./AddActionButton";
import { getTeamsSugestions2 } from '../services/teams';
import { useMutation } from 'react-query';
import toast from "react-hot-toast";

export const BuscarEquipoModal = ({ isOpen, setIsOpen, cardRef, setSugerencias }) => {
  const [teamMembers, setTeamMembers] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const mutation = useMutation(getTeamsSugestions2, {
    onSuccess: (data) => {
      setSugerencias(data);
      toast.success(`Sugerencias generadas exitosamente`);
      setIsOpen(false);
    },
    onError: (error) => {
      const errorMessage = error.response?.data || error.message || "Error desconocido";
      toast.error("Error al generar las sugerencias: " + error.message);
      console.error("Error al generar las sugerencias:", error.response || error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamMembers || !courseCode) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    mutation.mutate({ courseCode, cantIntegrantes: teamMembers });
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
        <FormInput
          type={"text"}
          Icon={RiTeamLine}
          placeholder={"Introduce el codigo del curso"}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <AddActionButton text={"Buscar"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};

export default BuscarEquipoModal;
