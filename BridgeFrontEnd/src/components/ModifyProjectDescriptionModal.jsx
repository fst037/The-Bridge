import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { AddActionButton } from "./AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import { modifyProjectDescription } from "../services/projects";
import toast from "react-hot-toast";
import { RiPencilLine } from "react-icons/ri";

export const ModifyProjectDescriptionModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  project,
}) => {
  const [newDescription, setNewDescription] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(modifyProjectDescription, {
    onSuccess: () => {
      queryClient.invalidateQueries("projectInformation" + project.identifier);
      toast.success("Descripcion actualizada correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setNewDescription("");
      setIsOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ newDescription, projectId: project.identifier });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Cambiar descripcion de proyecto"}
    >
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormInput
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder={"Ingresa una nueva descripcion"}
          Icon={RiPencilLine}
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
