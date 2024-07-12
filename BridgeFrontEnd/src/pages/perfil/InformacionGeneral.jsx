import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { modifyUserInformation } from "../../services/modifyUserInformation";
import { ClipLoader } from "react-spinners";
import { FormInput } from "../../components/FormInput";
import { v4 as uuidv4 } from "uuid";
import { FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

export const InformacionGeneral = ({ user }) => {
  const initializeLinks = (contactLinks) => {
    const links = contactLinks.slice(0, 3).map((link) => ({
      value: link || "",
      id: uuidv4(),
    }));

    while (links.length < 3) {
      links.push({ value: "", id: uuidv4() });
    }

    return links;
  };

  const [userInformation, setUserInformation] = useState({
    introduction: user?.introduction || "",
    links: initializeLinks(user?.contactLinks || []),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(modifyUserInformation, {
    onSuccess: () => {
      toast.success("Introducción modificada correctamente");
      queryClient.invalidateQueries("profileDetail");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleLinkChange = (id) => (e) => {
    const { value } = e.target;
    setUserInformation((prev) => {
      const newLinks = prev.links.map((link) =>
        link.id === id ? { ...link, value } : link
      );
      return { ...prev, links: newLinks };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      introduction: userInformation.introduction,
      links: userInformation.links,
    });
  };

  return (
    <article className="flex flex-col gap-4">
      <h4 className="text-xl font-[500]">Información general</h4>
      <form
        className="flex flex-col items-center w-full gap-4"
        onSubmit={handleSubmit}
      >
        <textarea
          name="introduction"
          value={userInformation.introduction}
          onChange={(e) =>
            setUserInformation((prev) => ({
              ...prev,
              introduction: e.target.value,
            }))
          }
          className="w-full h-32 p-2 border rounded-md border-gray-400 focus:border-gray-600 outline-none"
        />
        {userInformation.links.map((link) => (
          <FormInput
            key={link.id}
            placeholder={"Introduce un link de contacto"}
            value={link.value}
            onChange={handleLinkChange(link.id)}
            Icon={FaLink}
          />
        ))}
        <button
          className="self-end bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white disabled:bg-[#D96756]"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <ClipLoader size={16} color="#fff" />
          ) : (
            "Guardar"
          )}
        </button>
      </form>
    </article>
  );
};
