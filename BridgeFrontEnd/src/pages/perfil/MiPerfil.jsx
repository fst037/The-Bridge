import { useAuthContext } from "../../context/AuthContext";
import { useCardToggle } from "../../hooks/useCardToggle";
import { ImageCropper } from "./ImageCropper";
import { LinkIcon } from "../../components/LinkIcon";

export const MiPerfil = ({ user, profilePic }) => {
  const { isOpen, setIsOpen, cardRef } = useCardToggle();
  const { authUser } = useAuthContext();

  return (
    <article className="flex items-center">
      <div className="relative flex justify-center md:justify-end w-1/3">
        <div
          className="relative group cursor-pointer"
          onClick={() => {
            if (authUser.email === user?.username) setIsOpen(true);
          }}
        >
          <img
            src={profilePic}
            className="size-24 md:size-40 aspect-auto rounded-full"
          />
          {authUser.email === user?.username && (
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-full flex items-center justify-center transition-opacity">
              <span className="text-white text-center">Editar imagen</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-2/3">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <h1 className="text-gray-400/80 font-light text-xl">
          {user?.username}
        </h1>
        <div className="flex gap-1">
          {user?.contactLinks?.map((link) => (
            <LinkIcon key={link} link={link} />
          ))}
        </div>
        <ImageCropper isOpen={isOpen} setIsOpen={setIsOpen} cardRef={cardRef} />
      </div>
    </article>
  );
};
