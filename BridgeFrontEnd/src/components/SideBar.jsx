import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="fixed top-12 md:top-16 left-0 h-screen w-12 md:w-16 m-0 flex flex-col bg-[#F0E9FF] items-center shadow">
      <SideBarIcon icon={<TiHome size={32} />} text="Inicio" to="/inicio" />
      <SideBarIcon icon={<FaUser size={32} />} text="Perfil" to="/perfil" />
      <SideBarIcon
        icon={<FaGraduationCap size={32} />}
        text="Cursos"
        to="/cursos"
      />
      <SideBarIcon
        icon={<HiUserGroup size={32} />}
        text="Equipos"
        to="/equipos"
      />
      <SideBarIcon
        icon={<TbWorld size={32} />}
        text="Comunidad"
        to="/comunidad"
      />
      <SideBarIcon icon={<FaStar size={32} />} text="Ratings" to="/ratings" />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", to = "/inicio" }) => {
  return (
    <Link to={to} className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </Link>
  );
};
