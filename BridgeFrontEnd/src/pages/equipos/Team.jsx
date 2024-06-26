import { FaUsers } from "react-icons/fa";
import { useQuery } from "react-query";
import { getProfilePic } from "../../services/getUserData";

export const Team = ({ students }) => {
  return (
    <article className="flex flex-col min-h-20 p-2 gap-1 border border-gray-400 rounded-lg md:mx-8 md:flex-row">
      <div className="flex items-start gap-4 md:w-1/2">
        <p>Nombre de equipo</p>
        <div className="flex items-center gap-1">
          <FaUsers />
          <span>{students.length}</span>
        </div>
      </div>
      <hr className="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 md:h-auto md:w-px md:bg-gradient-to-b md:inline-block" />
      <div className="flex flex-col w-1/2 p-1 gap-2">
        {students.map((student) => (
          <Student key={student} student={student} />
        ))}
      </div>
    </article>
  );
};

const Student = ({ student }) => {
  const { data: profilePic } = useQuery(["profilePic", student.username], () =>
    getProfilePic(student.username)
  );

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <img src={profilePic} className="size-8 rounded-full" />
      <p>{student.name}</p>
    </div>
  );
};
