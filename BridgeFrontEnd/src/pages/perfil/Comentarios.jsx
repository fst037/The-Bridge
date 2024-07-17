import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getProfilePic } from "../../services/getUserData";
import { queryConfig } from "../../utils/queryConfig";
import { useAuthContext } from "../../context/AuthContext";
import { FormInput } from "../../components/FormInput";
import { FaRegCommentDots } from "react-icons/fa";
import { AddActionButton } from "../../components/AddActionButton";
import {
  commentProfile,
  handleCommentVisibility,
} from "../../services/comments";
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
    <article className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
      <h4 className="text-lg font-[500]">
        Comentarios - {user?.comments.length}
      </h4>
      {authUser.email !== user.username && (
        <form onSubmit={handleSubmit} className="flex gap-4">
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
      <div className="flex flex-col gap-2 max-h-[600px] overflow-auto">
        {user?.comments.map((comment) => (
          <Comentario
            key={comment.timestamp + comment.remitente}
            comment={comment}
            isMyProfile={authUser.email === user.username}
          />
        ))}
      </div>
    </article>
  );
};

const Comentario = ({ comment, isMyProfile }) => {
  const { data: profilePicUrl, isLoading: isLoadingProfilePicUrl } = useQuery(
    "commentProfilePic" + comment.remitente + comment.mensaje,
    () => getProfilePic(comment.remitente),
    queryConfig
  );
  const queryClient = useQueryClient();

  const timeAgo = calculateTimeAgo(comment.timestamp);

  const visibilityMutation = useMutation(handleCommentVisibility, {
    onSuccess: (message) => {
      queryClient.invalidateQueries("profileDetail");
      queryClient.invalidateQueries("myComments");
      toast.success(message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg">
      <div className="flex gap-1 lg:gap-4 w-full">
        <img
          src={isLoadingProfilePicUrl ? "" : profilePicUrl}
          className="size-8 p-1 sm:size-10 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 w-full border-b border-black">
            <span>{comment.remitente}</span>
            <span className="text-sm text-[#AAA] font-light">{timeAgo}</span>
          </div>
          <p className="text-sm p-1">{comment.mensaje}</p>
        </div>
      </div>
      {isMyProfile && (
        <div className="flex h-[16px] m-2">
          <button
            onClick={() => {
              visibilityMutation.mutate({
                username: comment.remitente,
                timestamp: comment.timestamp,
                isHidden: !comment.visible,
              });
            }}
          >
            {comment.visible ? (
              <FaRegEye className="flex cursor-pointer h-[16px] w-auto justify-center self-top" />
            ) : (
              <FaRegEyeSlash className="flex cursor-pointer h-[16px] w-auto justify-center self-top" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
