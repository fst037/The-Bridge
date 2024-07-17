import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { modifyUserInformation } from "../../services/modifyUserInformation";
import { ClipLoader } from "react-spinners";
import { FormInput } from "../../components/FormInput";
import { v4 as uuidv4 } from "uuid";
import { FaLink } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

export const InformacionGeneral = ({ user }) => {
  const { authUser } = useAuthContext();
  const initializeLinks = (contactLinks) => {
    const links = contactLinks.slice(0, 3);
    return links;
  };

  const [userInformation, setUserInformation] = useState({
    introduction: user?.introduction || "",
    links: initializeLinks(user?.contactLinks || []),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(modifyUserInformation, {
    onSuccess: () => {
      toast.success("Informacion modificada correctamente");
      queryClient.invalidateQueries("profileDetail");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [link1, setLink1] = useState(userInformation.links[0] || "");
  const [link2, setLink2] = useState(userInformation.links[1] || "");
  const [link3, setLink3] = useState(userInformation.links[2] || "");

  useEffect(() => {
    setLink1(userInformation.links?.[0] || "");
    setLink2(userInformation.links?.[1] || "");
    setLink3(userInformation.links?.[2] || "");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      introduction: userInformation.introduction,
      links: [link1, link2, link3],
    });
  };

  return (
    <article className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
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
          className={"w-full p-2 border rounded-md border-gray-400 focus:border-gray-600 outline-none " + (authUser.email !== user?.username ? "h-[300px]" : "h-[200px]")}
          disabled={authUser.email !== user?.username}
        />

        {authUser.email === user?.username && (
          <>
            <FormInput
              key={1}
              placeholder={"Introduce un link de contacto"}
              value={link1}
              onChange={e => setLink1(e.target.value)}
              Icon={FaLink}
              disabled={authUser.email !== user?.username}
            />
            <FormInput
              key={2}
              placeholder={"Introduce un link de contacto"}
              value={link2}
              onChange={e => setLink2(e.target.value)}
              Icon={FaLink}
              disabled={authUser.email !== user?.username}
            />
            <FormInput
              key={3}
              placeholder={"Introduce un link de contacto"}
              value={link3}
              onChange={e => setLink3(e.target.value)}
              Icon={FaLink}
              disabled={authUser.email !== user?.username}
            />
          </>
          
        )}
        {authUser.email === user?.username && (
          <button
            className="self-end bg-button2 hover:bg-[#FF573F] active:bg-[#FC3F24] px-6 py-1 rounded-md text-white disabled:bg-[#D96756] w-full"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <ClipLoader size={16} color="#fff" />
            ) : (
              "Guardar"
            )}
          </button>
        )}
      </form>
    </article>
  );
};
