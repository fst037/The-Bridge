import React, { useEffect } from "react";
import { SkillsRadar } from "./SkillsRadar";
import { UserCard } from "./UserCard";
import { useState } from "react";

const SugerenciasEquipos = ({ sugerencias, usersProfilePic }) => {
  if (!usersProfilePic) usersProfilePic = {};

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(550px,_1fr))]">
      {sugerencias?.map((sugerencia, index) => (
        <div
          className="flex flex-col m-2 p-2 border border-gray-300 rounded-md"
          key={index}
        >
          <div
            className="p-3 text-white text-center text-2xl rounded-lg mb-3"
            style={{
              background: `rgb(${255 * (1 - sugerencia.compatibility)}, ${255 * sugerencia.compatibility}, 0)`,
            }}
          >
            {parseFloat(sugerencia.compatibility * 100).toFixed(2)}%
          </div>
          <div className="flex flex-col sm:flex-row align-center justify-center h-full">
            <SkillsRadar skills={sugerencia.skills} className={"self-center"} />

            <div className="flex flex-col gap-2 w-full mt-3 sm:mt-0">
              {sugerencia?.members?.map((user) => (
                <UserCard
                  key={user.username}
                  profilePic={usersProfilePic[user.username]}
                  username={user.username}
                  name={user.name}
                  className={"w-full"}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SugerenciasEquipos;
