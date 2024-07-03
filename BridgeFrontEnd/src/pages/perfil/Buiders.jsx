import { FiEye } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getUserBuilders } from "../../services/getUserData";
import toast from "react-hot-toast";

export const Builders = () => {
  const { data: builders } = useQuery("builders", getUserBuilders, queryConfig);

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-[500] mb-4">Compañeros</h4>
        <FiEye className="size-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {builders?.map(({ name, username, profilePic }) => (
          <Builder
            key={username}
            profilePic={profilePic}
            name={name}
            username={username}
          />
        ))}
      </div>
    </div>
  );
};

const Builder = ({ profilePic, name, username }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado al portapapeles");
    });
  };

  return (
    <div className="flex border items-center gap-4 p-2 max-w-[300px] border-gray-300 rounded-md ">
      <div>
        <img
          src={profilePic}
          alt="profile picture"
          className="size-8 rounded-full"
        />
      </div>
      <div>
        <p>{name}</p>
        <div
          className="flex items-center gap-1 text-gray-400 font-light text-sm overflow-hidden hover:underline hover:cursor-pointer"
          onClick={() => copyToClipboard(username)}
        >
          {username}
          <FaRegCopy />
        </div>
      </div>
    </div>
  );
};
