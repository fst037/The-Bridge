import { useState } from "react";
import { Modal } from "./Modal";
import { MdOutlineEmojiObjects } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { IoIosSettings } from "react-icons/io";
import { PiSpeakerLowBold } from "react-icons/pi";
import { FaPeoplePulling } from "react-icons/fa6";
import { AddActionButton } from "../components/AddActionButton";
import { useMutation, useQueryClient } from "react-query";
import { rateProfile } from "../services/modifyUserInformation";
import toast from "react-hot-toast";

const reactions = [
  {
    Icon: MdOutlineEmojiObjects,
    value: "Ideación",
  },
  {
    Icon: SlNotebook,
    value: "Organización",
  },
  {
    Icon: PiSpeakerLowBold,
    value: "Comunicacion",
  },
  {
    Icon: IoIosSettings,
    value: "Desarrollo",
  },
  {
    Icon: FaPeoplePulling,
    value: "Liderazgo",
  },
];

export const ValorarPerfilModal = ({
  isOpen,
  setIsOpen,
  cardRef,
  username,
}) => {
  const [reactionsSelected, setReactionsSelected] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation(rateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("profileDetail");
      toast.success("Perfil valorado correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setIsOpen(false);
      setReactionsSelected([]);
    },
  });

  const toggleReaction = (value) => {
    setReactionsSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((reaction) => reaction !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, ratings: reactionsSelected });
  };

  return (
    <Modal
      cardRef={cardRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Valorar perfil"}
    >
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          {reactions.map((reaction) => (
            <div
              key={reaction.value}
              className={`flex flex-col items-center gap-2 p-1 ${reactionsSelected.includes(reaction.value) && "bg-secondary/50"} 
							rounded-md transition-all border border-transparent hover:border-secondary/50`}
              onClick={() => toggleReaction(reaction.value)}
            >
              <reaction.Icon />
              <span>{reaction.value}</span>
            </div>
          ))}
        </div>
        <AddActionButton text={"Valorar"} isLoading={mutation.isLoading} />
      </form>
    </Modal>
  );
};
