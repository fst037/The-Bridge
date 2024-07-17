import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const UserCard = ({
  profilePic = "",
  name,
  username,
  className,
  extraButton,
  commonCount,
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado al portapapeles");
    });
  };

  return (
    <div
      className={`flex size-max overflow-y-hidden border items-center gap-2 p-2 border-gray-300 rounded-md ${className}`}
    >
      <div>
        <Link to={`/perfil/${username}`}>
          <img
            src={profilePic}
            alt="profile picture"
            className="size-8 min-w-8 rounded-full"
          />
        </Link>
      </div>
      <div className="grow-1">
        <Link to={`/perfil/${username}`}>
          <p>{name}</p>
        </Link>
        <div
          className="flex items-center gap-1 text-gray-400 font-light text-sm overflow-hidden hover:underline hover:cursor-pointer break-all"
          onClick={() => copyToClipboard(username)}
        >
          {username}
          <FaRegCopy />
        </div>
        {commonCount && (
          <div className="flex items-center gap-1 text-gray-400 font-light text-sm overflow-hidden">
            <p className="text-gray-400 text-sm">
              {commonCount} builders en común
            </p>
          </div>
        )}
      </div>
      {extraButton && (
        <div className="self-left ml-auto p-2">{extraButton}</div>
      )}
    </div>
  );
};
