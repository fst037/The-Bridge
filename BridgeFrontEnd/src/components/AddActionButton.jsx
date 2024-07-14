import { ClipLoader } from "react-spinners";

export const AddActionButton = ({
  text,
  onClick = () => {},
  className = "",
  isLoading = false,
}) => {
  return (
    <button
      className={`px-4 py-1 text-xl text-white transition hover:bg-[#01AAB3] active:bg-[#009CA4] outline-none ${isLoading ? "bg-[#009CA4]" : "bg-[#00BCC6]"} ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <ClipLoader size={16} color="#fff" /> : text}
    </button>
  );
};
