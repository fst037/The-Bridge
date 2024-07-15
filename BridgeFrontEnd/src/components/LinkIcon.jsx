import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaExternalLinkAlt,
  FaFigma,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export const LinkIcon = ({ link = "", className = "" }) => {
  const getIcon = () => {
    if (link.includes("linkedin.com")) {
      return <FaLinkedin className={`size-8 ${className}`} />;
    } else if (link.includes("github.com")) {
      return <FaGithub className={`size-8 ${className}`} />;
    } else if (link.includes("figma.com")) {
      return <FaFigma className={`size-8 ${className}`} />;
    } else if (link.includes("discord.gg")) {
      return <FaDiscord className={`size-8 ${className}`} />;
    }
    return (
      <div className="flex gap-1 items-center">
        <span className="text-blue-500 hover:underline">{link}</span>
        <FaExternalLinkAlt className="text-blue-500" />
      </div>
    );
  };

  return (
    <Link to={link} target="_blank" className="cursor-pointer">
      {getIcon()}
    </Link>
  );
};
