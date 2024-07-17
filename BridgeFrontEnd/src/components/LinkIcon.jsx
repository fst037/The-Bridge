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
    let icon;

    if (link.includes("linkedin.com")) {
      icon = <FaLinkedin className={`size-5 ${className}`} />;
    } else if (link.includes("github.com")) {
      icon = <FaGithub className={`size-5 ${className}`} />;
    } else if (link.includes("figma.com")) {
      icon = <FaFigma className={`size-5 ${className}`} />;
    } else if (link.includes("discord.gg")) {
      icon = <FaDiscord className={`size-5 ${className}`} />;
    }
    return (
      <div className="flex gap-1 items-center">
        <span className="text-blue-500 hover:underline">{link}</span>
        {icon ? icon :<FaExternalLinkAlt className="text-blue-500" />}
      </div>
    );
  };
  return (
    <a href={"https://"+link} target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${className}`}>
      {getIcon()}
    </a>
  );
};
