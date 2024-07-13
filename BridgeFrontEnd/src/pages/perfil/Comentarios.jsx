import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getComments } from "../../services/getUserData";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegEye } from "react-icons/fa";

export const Comentarios = () => {
  const { data: comments } = useQuery("comments", getComments, queryConfig);

  return (
    <article className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4">
      <h4 className="text-lg font-[500]">Comentarios {comments?.length}</h4>
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <Comentario key={comment.timestamp} comment={comment} />
        ))}
      </div>
    </article>
  );
};

const Comentario = ({ comment }) => {
  const timeAgo = calculateTimeAgo(comment.timestamp);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 lg:gap-4">
        <img
          src={comment.profilePic}
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
      <div className="relative">
        <button onClick={() => {}}>
          <FaRegEye className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};
