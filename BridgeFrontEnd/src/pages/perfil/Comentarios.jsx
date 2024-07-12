import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getComments } from "../../services/getUserData";
import { calculateTimeAgo } from "../../utils/calculateTimeAgo";
import { SlOptionsVertical } from "react-icons/sl";
import { useCardToggle } from "../../hooks/useCardToggle";
import { FaRegEye } from "react-icons/fa";

export const Comentarios = () => {
  const { data: comments } = useQuery("comments", getComments, queryConfig);

  return (
    <article className="flex flex-col gap-2">
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
  const { cardRef, isOpen, setIsOpen } = useCardToggle();

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
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <SlOptionsVertical className="cursor-pointer" />
        </button>
        <OptionsCard
          cardRef={cardRef}
          isOpen={isOpen}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

const OptionsCard = ({ cardRef, isOpen, onClick = () => {} }) => {
  return (
    <div
      ref={cardRef}
      className={`profile-card ${isOpen ? "scale-100" : "scale-0"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-1 p-2 cursor-pointer bg-white hover:bg-gray-300">
        <FaRegEye className="size-4" />
        <p>Ocultar</p>
      </div>
    </div>
  );
};
