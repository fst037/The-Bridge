import { useState } from "react";
import { FormInput } from "./FormInput";
import { Modal } from "./Modal";
import { FaPeopleGroup } from "react-icons/fa6";
import { AddActionButton } from "./AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import { modifyTeamName } from "../services/teams";
import toast from "react-hot-toast";

export const ModifyTeamNameModal = ({ isOpen, setIsOpen, cardRef, team }) => {
  const [newName, setNewName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(modifyTeamName, {
    onSuccess: () => {
      queryClient.invalidateQueries("teamInformation" + team.identifier);
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
    mutation.mutate({ teamId: team.identifier, newName });
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
