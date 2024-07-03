import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useCardToggle } from "../../hooks/useCardToggle";
import { modifyIntroduction } from "../../services/modifyIntroduction";
import { ImageCropper } from "./ImageCropper";
import { useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export const MiPerfil = ({ user }) => {
  const { authUser } = useAuthContext();
  const { isOpen, setIsOpen, cardRef } = useCardToggle();
  const [introduction, setIntroduction] = useState(user?.introduction || "");
  const introductionRef = useRef();
  const queryClient = useQueryClient();

  const mutation = useMutation(modifyIntroduction, {
    onSuccess: () => {
      toast.success("Introduccion modificada correctamente");
      queryClient.invalidateQueries("profileDetail");
      introductionRef.current = introduction;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (introductionRef.current === undefined) {
      introductionRef.current = introduction;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(introduction);
  };

  return (
    <article className="flex items-center h-[200px]">
      <div className="relative flex justify-center md:justify-end w-1/3">
        <div
          className="relative group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={authUser.profilePic}
            className="size-24 md:size-40 aspect-auto rounded-full"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full flex items-center justify-center transition-opacity">
            <span className="text-white text-center">Editar imagen</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-2/3">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <form
          className="flex flex-col items-center w-full gap-4"
          onSubmit={handleSubmit}
        >
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="w-3/4 h-32 p-1 border rounded-sm"
          ></textarea>
          <button
            className="bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-2 md:px-6 py-1 rounded-md text-white disabled:bg-[#D96756]"
            disabled={
              introductionRef.current === introduction || mutation.isLoading
            }
          >
            {mutation.isLoading ? (
              <ClipLoader size={16} color="#fff" />
            ) : (
              "Editar introduccion"
            )}
          </button>
        </form>
        <ImageCropper isOpen={isOpen} setIsOpen={setIsOpen} cardRef={cardRef} />
      </div>
    </article>
  );
};
