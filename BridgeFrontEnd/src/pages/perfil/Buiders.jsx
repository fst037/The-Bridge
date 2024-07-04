import { FiEye } from "react-icons/fi";
import { useQuery } from "react-query";
import { queryConfig } from "../../utils/queryConfig";
import { getUserBuilders } from "../../services/getUserData";
import { UserCard } from "../../components/UserCard";

export const Builders = () => {
  const { data: builders } = useQuery("builders", getUserBuilders, queryConfig);

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-[500] mb-4">Compañeros</h4>
        <FiEye className="size-8" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2">
        {builders?.map(({ name, username, profilePic }) => (
          <UserCard
            key={username}
            profilePic={profilePic}
            name={name}
            username={username}
            className={"w-full"}
          />
        ))}
      </div>
    </div>
  );
};
