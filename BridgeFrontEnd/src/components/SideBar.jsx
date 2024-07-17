import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import { RiFolderLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { useCardToggle } from "../hooks/useCardToggle";
import { NotificationsModal } from "./NotificationsModal";

export const SideBar = () => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();

  return (
    <>
      <div className="fixed top-12 md:top-16 left-0 h-screen w-12 md:w-16 m-0 flex flex-col bg-[#F0E9FF] items-center shadow">
        <SideBarIcon
          icon={<TiHome className="h-6 w-6 md:w-auto md:h-8" />}
          text="Inicio"
          to="/inicio"
        />
        <SideBarIcon
          icon={<FaUser className="h-6 w-6 md:w-auto md:h-8" />}
          text="Perfil"
          to="/perfil"
        />
        <SideBarIcon
          icon={<FaGraduationCap className="h-6 w-6 md:w-auto md:h-8" />}
          text="Cursos"
          to="/cursos"
        />
        <SideBarIcon
          icon={<HiUserGroup className="h-6 w-6 md:w-auto md:h-8" />}
          text="Equipos"
          to="/equipos"
        />
        <SideBarIcon
          icon={<RiFolderLine className="h-6 w-6 md:w-auto md:h-8" />}
          text="Proyectos"
          to="/proyectos"
        />
        <SideBarIcon
          icon={<TbWorld className="h-6 w-6 md:w-auto md:h-8" />}
          text="Comunidad"
          to="/comunidad"
        />
        <SideBarIcon
          icon={<IoIosNotifications className="size-6 md:w-auto md:h-8" />}
          text="Notificaciones"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <NotificationsModal
        cardRef={cardRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", to, onClick = () => {} }) => {
  if (to) {
    return (
      <Link to={to} className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </Link>
    );
  } else {
    return (
      <div to={to} className="sidebar-icon group" onClick={onClick}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    );
  }
};
