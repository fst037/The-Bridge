import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { AddActionButton } from "./AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import { addUserToTeam } from "../services/addUserToTeam";
import toast from "react-hot-toast";

export const AddPersonModal = ({ isOpen, setIsOpen, cardRef, team }) => {
  const [username, setUsername] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(addUserToTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("teams");
      toast.success(
        `Se ha agregado a ${username} al equipo ${team.nombre} correctamente`
      );
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;
    mutate({ username, identifier: team.identifier });
  };

  return (
    <Modal
      title={`Agrega un companero a ${team?.nombre}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          type={"text"}
          value={username}
          Icon={FaUser}
          placeholder={"Introduce el email de tu companero"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AddActionButton text={"Agregar companero"} isLoading={isLoading} />
      </form>
    </Modal>
  );
};
