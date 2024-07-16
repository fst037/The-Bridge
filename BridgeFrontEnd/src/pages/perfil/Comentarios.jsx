import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import { FaRegEye } from "react-icons/fa";
import { getProfilePic } from "../../services/getUserData";
import { queryConfig } from "../../utils/queryConfig";
import { useAuthContext } from "../../context/AuthContext";
import { FormInput } from "../../components/FormInput";
import { FaRegCommentDots } from "react-icons/fa";
import { AddActionButton } from "../../components/AddActionButton";
import { commentProfile } from "../../services/comments";
import toast from "react-hot-toast";

export const Comentarios = ({ user }) => {
  const [message, setMessage] = useState("");
  const { authUser } = useAuthContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(commentProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("specificProfileDetail");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setMessage("");
    },
  });

  const handleSubmit = (e) => {
    if (!message) return;
    e.preventDefault();
    mutation.mutate({ username: user.username, message });
  };

  return (
    <article className="flex flex-col gap-2 rounded-lg p-4">
      <h4 className="text-lg font-[500]">
        Comentarios {user?.comments.length}
      </h4>
      {authUser.email !== user.username && (
        <form onSubmit={handleSubmit} className="flex">
          <FormInput
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"Introduce un comentario"}
            value={message}
            Icon={FaRegCommentDots}
          />
          <AddActionButton
            text={"Enviar"}
            className="w-24 rounded-md"
            isLoading={mutation.isLoading}
          />
        </form>
      )}
      <div className="flex flex-col gap-2">
        {user?.comments.map((comment) => (
          <Comentario
            key={comment.timestamp}
            comment={comment}
            isMyProfile={authUser.email === user.username}
          />
        ))}
      </div>
    </article>
  );
};

const Comentario = ({ comment, isMyProfile }) => {
  const { data: profilePicUrl, isLoadingProfilePicUrl } = useQuery(
    "commentProfilePic",
    () => getProfilePic(comment.remitente),
    queryConfig
  );

  const timeAgo = calculateTimeAgo(comment.timestamp);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 lg:gap-4">
        <img
          src={isLoadingProfilePicUrl ? "" : profilePicUrl}
          className="size-8 lg:size-10 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 lg:gap-2">
            <span>{comment.remitente}</span>
            <span className="text-sm text-[#AAA] font-light">{timeAgo}</span>
          </div>
          <p className="text-sm">{comment.mensaje}</p>
        </div>
      </div>
      {isMyProfile && (
        <div className="relative">
          <button onClick={() => {}}>
            <FaRegEye className="cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
};
