import LogoBridge from "../assets/LogoBridge.png";
import Bridge from "../assets/Bridge.svg";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCardToggle } from "../hooks/useCardToggle";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();
  const { authUser } = useAuthContext();

  return (
    <header className="fixed flex justify-between items-center px-2 top-0 w-full h-14 bg-[#DBCEF6] z-10 md:px-4 md:h-16">
      <div className="flex items-center cursor-pointer">
        <img src={LogoBridge} className="h-10 md:h-12" />
        <img src={Bridge} className="h-6 md:h-8" />
      </div>
      <div className="relative">
        <img
          src={authUser.profilePic}
          className="size-12 md:size-14 rounded-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <ProfileCard
          cardRef={cardRef}
          isOpen={isOpen}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </header>
  );
};

const ProfileCard = ({ cardRef, isOpen, onClick = () => {} }) => {
  return (
    <div
      ref={cardRef}
      className={`profile-card ${isOpen ? "scale-100" : "scale-0"}`}
      onClick={onClick}
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
