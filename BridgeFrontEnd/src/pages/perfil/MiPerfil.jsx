import { useAuthContext } from "../../context/AuthContext";
import { useCardToggle } from "../../hooks/useCardToggle";
import { ImageCropper } from "./ImageCropper";
import { MdEdit } from "react-icons/md";

export const MiPerfil = ({ user }) => {
  const { authUser } = useAuthContext();
  const { isOpen, setIsOpen, cardRef } = useCardToggle();

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
            <span className="text-white">Editar imagen</span>
          </div>
          <MdEdit className="absolute bottom-2 right-2 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-2/3">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <p className="text-lg text-gray-600">{user?.introduction}</p>
        <button className="bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white">
          Editar perfil
        </button>
        <ImageCropper isOpen={isOpen} setIsOpen={setIsOpen} cardRef={cardRef} />
      </div>
    </article>
  );
};
