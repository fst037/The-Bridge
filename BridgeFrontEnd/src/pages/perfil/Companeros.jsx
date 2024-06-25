import { FaUser } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
// import { FiEyeOff } from "react-icons/fi";

export const Companeros = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-[500] mb-4">Compañeros</h4>
        <FiEye className="size-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Companero />
        <Companero />
        <Companero />
        <Companero />
        <Companero />
      </div>
    </div>
  );
};

const Companero = () => {
  return (
    <div className="flex border items-center gap-4 p-2 max-w-[300px] border-gray-300 rounded-md ">
      <div>
        <FaUser className="size-8" />
      </div>
      <div>
        <p>Nombre usuario</p>
        <div className="flex items-center gap-1 text-gray-400 font-light text-sm overflow-hidden hover:underline hover:cursor-pointer">
          usuario@uade.edu.ar
          <FaRegCopy />
        </div>
      </div>
    </div>
  );
};
