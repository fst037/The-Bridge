import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { uploadImage } from "../../services/uploadImage";
import toast from "react-hot-toast";

export const MiPerfil = () => {
  const [image, setImage] = useState(null);
  const { authUser, setAuthUser } = useAuthContext();

  const handleFileInput = async () => {
    if (image === null) return;
    try {
      const profilePic = await uploadImage(image, authUser.email);

      const newUser = { ...authUser, profilePic };
      localStorage.setItem("bridge-user", JSON.stringify(newUser));
      setAuthUser(newUser);

      toast.success("Foto actualizada correctamente");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <article className="flex items-center h-[200px]">
      <div className="flex justify-center md:justify-end w-1/3">
        <img
          src={authUser.profilePic}
          className="size-24 md:size-40 aspect-auto rounded-full"
        />
      </div>
      <div className="flex flex-col items-center gap-8 w-2/3">
        <h3 className="text-2xl font-semibold">Nombre Apellido</h3>
        <p className="text-lg text-gray-600">Introduccion</p>
        <button
          className="bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white"
          onClick={handleFileInput}
        >
          Editar perfil
        </button>
        <input
          type="file"
          className="w-40"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
    </article>
  );
};
