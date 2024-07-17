import { useQueries } from "react-query";
import { UserCard } from "../../components/UserCard";
import { getProfilePic } from "../../services/getUserData";

export const Builders = ({ builders }) => {
  const profilePicQueries = useQueries(
    builders?.map((builder) => {
      return {
        queryKey: ["profilePic", builder.username],
        queryFn: () => getProfilePic(builder.username),
        enabled: !!builder.username,
      };
    })
  );

  const buildersWithPics = builders?.map((builder, index) => ({
    ...builder,
    profilePic: profilePicQueries[index]?.data,
  }));

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h4 className="text-lg font-[500] mb-4">Builders</h4>
      <div className="max-h-[600px] md:max-h-[450px] overflow-auto">
        <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
          {buildersWithPics?.map(({ name, username, profilePic }) => (
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
    </div>
  );
};
