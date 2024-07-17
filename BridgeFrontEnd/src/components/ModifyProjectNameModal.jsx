import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { FaPeopleGroup } from "react-icons/fa6";
import { AddActionButton } from "./AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { modifyProjectName } from "../services/projects";

export const ModifyProjectNameModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  project,
}) => {
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(modifyProjectName, {
    onSuccess: () => {
      queryClient.invalidateQueries("projectInformation" + project.identifier);
      toast.success("Nombre cambiado correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setNewName("");
      setIsOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ newName, projectId: project.identifier });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Modificar nombre del equipo"}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormInput
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={"Ingresa un nuevo nombre de equipo"}
          Icon={FaPeopleGroup}
        />
        <AddActionButton
          text={"Guardar"}
          className="rounded-sm"
          isLoading={mutation.isLoading}
        />
      </form>
    </Modal>
  );
};
