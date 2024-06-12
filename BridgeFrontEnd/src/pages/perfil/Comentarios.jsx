import { FiEye } from "react-icons/fi";
// import { FiEyeOff } from "react-icons/fi";

export const Comentarios = () => {
  return (
    <article className="p-4 min-h-[200px] border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <h4 className="text-lg font-[500]">Comentarios</h4>
        <FiEye className="size-8 font-extralight" />
      </div>
    </article>
  );
};
