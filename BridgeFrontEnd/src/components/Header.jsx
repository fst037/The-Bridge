import LogoBridge from "../assets/LogoBridge.svg";
import Bridge from "../assets/Bridge.svg";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCardToggle } from "../hooks/useCardToggle";

export const Header = () => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();

  return (
    <header className="fixed flex justify-between items-center sm:px-2  md:px-4 top-0 w-full h-12 md:h-16 bg-[#DBCEF6] z-10">
      <div className="flex items-center cursor-pointer">
        <img src={LogoBridge} className="h-10 md:h-12" />
        <img src={Bridge} className="h-6 md:h-8" />
      </div>
      <div className="relative">
        <CgProfile
          className="size-10 md:size-12 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div
          ref={cardRef}
          className={`header-profile-card ${isOpen ? "scale-100" : "scale-0"}`}
        >
          <ProfileCardItem
            text={"Mi perfil"}
            icon={<FaUser className="size-4" />}
            to={"/perfil"}
          />
          <ProfileCardItem
            text={"Cerrar sesion"}
            icon={<CiLogout className="size-4" />}
            to={"/login"}
          />
        </div>
      </div>
    </header>
  );
};

const ProfileCardItem = ({ text, icon, to }) => {
  return (
    <Link
      className="flex items-center gap-1 p-2 cursor-pointer bg-white hover:bg-gray-300"
      to={to}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
};
