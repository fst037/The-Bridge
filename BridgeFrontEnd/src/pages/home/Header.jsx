import LogoBridge from "../../assets/LogoBridge.png";
import Bridge from "../../assets/Bridge.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between items-center p-2 h-auto gap-4 w-full bg-secondary py-4 px-10">
      <div className="flex items-center space-x-4">
        <img src={LogoBridge} className="h-16" alt="The Bridge logo" />
        <img src={Bridge} alt="Bridge" className="w-40" />
      </div>
      <div className="flex flex-row md:items-center gap-4 items-center text-[#FAFAFA]">
        <Link
          className="rounded-md bg-button2 px-4 py-2 hover:bg-button2/80 transition-all"
          to={"/register"}
        >
          Sign Up
        </Link>
        <Link
          className="rounded-md bg-button1 px-4 py-2 hover:bg-button1/80 transition-all"
          to={"/login"}
        >
          Log In
        </Link>
      </div>
    </header>
  );
};
