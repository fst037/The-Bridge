import { useMutation, useQueries, useQuery } from "react-query";
import { useState } from "react";
import { UserCard } from "../../components/UserCard";
import { getProfilePic, getUserBuilders } from "../../services/getUserData";
import { queryConfig } from "../../utils/queryConfig";
import { AddActionButton } from "../../components/AddActionButton";
import { sendBuilderRequest } from "../../services/builders";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const Builders = ({ builders }) => {
  const { authUser } = useAuthContext();
  const { data: myBuilders } = useQuery(
    "myBuilders" + authUser.email,
    getUserBuilders,
    queryConfig
  );

  const [loadingUsernames, setLoadingUsernames] = useState(new Set());

  const mutation = useMutation(sendBuilderRequest, {
    onSuccess: () => {
      toast.success("Invitación enviada correctamente");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: (_, __, { username }) => {
      setLoadingUsernames((prev) => {
        const newSet = new Set(prev);
        newSet.delete(username);
        return newSet;
      });
    },
  });

  const handleButtonClick = (username) => {
    setLoadingUsernames((prev) => new Set(prev).add(username));
    mutation.mutate({ username });
  };

  const profilePicQueries = useQueries(
    builders?.map((builder) => {
      return {
        queryKey: ["profilePic", builder.username],
        queryFn: () => getProfilePic(builder.username),
        enabled: !!builder.username,
      };
    })
  );

  const myBuildersUsernames = new Set(
    myBuilders?.map((builder) => builder.username)
  );

  const buildersWithPics = builders.map((builder, index) => ({
    ...builder,
    profilePic: profilePicQueries[index]?.data,
  }));

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h4 className="text-lg font-[500] mb-4">Builders</h4>
      <div className="max-h-[600px] md:max-h-[450px] overflow-auto">
        <div className="flex flex-col gap-2">
          {buildersWithPics?.map(({ name, username, profilePic }) => {
            const isMyBuilder = myBuildersUsernames.has(username);
            const isLoading = loadingUsernames.has(username);
            return (
              <UserCard
                key={username}
                profilePic={profilePic}
                name={name}
                username={username}
                className={"min-w-full"}
                extraButton={
                  !isMyBuilder && (
                    <AddActionButton
                      text={"+"}
                      className="rounded-full"
                      isLoading={isLoading}
                      onClick={() => handleButtonClick(username)}
                    />
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
