import { useAuthContext } from "../../context/AuthContext";
import { useCardToggle } from "../../hooks/useCardToggle";
import { ImageCropper } from "./ImageCropper";
import { LinkIcon } from "../../components/LinkIcon";
import { AddActionButton } from "../../components/AddActionButton";
import { sendInviteAccount } from "../../services/users";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export const MiPerfil = ({ user, profilePic }) => {
  const { isOpen, setIsOpen, cardRef } = useCardToggle();
  const { authUser } = useAuthContext();

  const mutation = useMutation(sendInviteAccount, {
    onSuccess: () => {
      toast.success("Invitacion enviada exitosamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleInvite = () => {
    mutation.mutate({ username: user.username });
  };

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
      <div className="flex flex-col items-center gap-4 w-2/3">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <h1 className="text-gray-400/80 font-light text-xl">
          {user?.username}
        </h1>
        {user?.hasAccount ? (
          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="text-lg font-[500]">Contacto</h4>
            <div className="flex flex-col gap-1">
              {user?.contactLinks?.map((link) => (
                <LinkIcon key={link} link={link} />
              ))}
            </div>
            {(user?.contactLinks == null || user?.contactLinks == []) && (
              <p className="text-gray-400/80">No hay links de contacto</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col border border-gray-300 rounded-lg p-4 gap-2">
            Este usuario no tiene creada una cuenta en Bridge.
            <AddActionButton
              text="Enviar invitacion"
              className="bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white disabled:bg-[#D96756]"
              onClick={handleInvite}
              isLoading={mutation.isLoading}
            />
          </div>
        )}
        <ImageCropper isOpen={isOpen} setIsOpen={setIsOpen} cardRef={cardRef} />
      </div>
    </article>
  );
};
