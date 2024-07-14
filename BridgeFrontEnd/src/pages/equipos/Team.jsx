import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { getProfilePic } from "../../services/getUserData";
import { IoMdPersonAdd } from "react-icons/io";
import { useCardToggle } from "../../hooks/useCardToggle";
import { AddPersonModal } from "../../components/AddPersonModal";
import { queryConfig } from "../../utils/queryConfig";
import { Link } from "react-router-dom";

export const Team = ({ students, team }) => {
  const { cardRef, isOpen, setIsOpen } = useCardToggle();

  return (
    <article className="flex flex-col min-h-20 p-2 gap-1 border border-gray-400 rounded-lg md:flex-row">
      <div className="flex justify-between p-1 items-start md:w-1/2">
        <div className="flex gap-4">
          <Link to={`/equipo/${team.identifier}`} ><p>{team.nombre}</p></Link>
          <div className="flex items-center gap-1">
            <FaUsers />
            <span>{students.length}</span>
          </div>
        </div>
        <IoMdPersonAdd
          className="size-5 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400 md:h-auto md:w-[2px] md:bg-gradient-to-b md:inline-block" />
      <div className="flex flex-col w-fit p-1 gap-2">
        {students.map((student) => (
          <Student key={student.username} student={student} />
        ))}
      </div>
      <AddPersonModal
        cardRef={cardRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        team={team}
      />
    </article>
  );
};

const Student = ({ student }) => {
  const { data: profilePic } = useQuery(
    ["profilePic", student.username],
    () => getProfilePic(student.username),
    queryConfig
  );

  return (
    <div className="flex items-center gap-2">
      <img src={profilePic} className="size-8 rounded-full" />
      <Link to={`/perfil/${student.username}`}><p>{student.name}</p></Link>
    </div>
  );
};
