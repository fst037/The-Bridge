import { FiEye } from "react-icons/fi";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getComments } from "../../services/getUserData";
// import { FiEyeOff } from "react-icons/fi";

export const Comentarios = () => {
  const { data: comments } = useQuery("comments", getComments, queryConfig);

  return (
    <article className="p-4 max-h-[200px] border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <h4 className="text-lg font-[500]">Comentarios</h4>
        <FiEye className="size-8 font-extralight" />
      </div>
      {comments?.map(({ timestamp, mensaje, remitente, profilePic }) => (
        <div key={timestamp} className="flex flex-col">
          <div className="flex gap-1">
            <img src={profilePic} className="size-8 rounded-full" />
            <div className="flex flex-col text-sm">
              <span className="">{remitente}</span>
              <p>{mensaje}</p>
            </div>
          </div>
        </div>
      ))}
    </article>
  );
};
