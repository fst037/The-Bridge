import { useEffect, useState } from 'react'
import {UserCard} from './UserCard'

export const UsersComunidad = ({users}) => {
  const [searchName, setSearchName] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)


  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users.filter((usuario) => {
        return usuario?.name.toLowerCase().includes(searchName.toLowerCase());
      }));        
    }
  }, [users, searchName]);


  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-5">
      <input type="text" placeholder="Buscar usuario" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4" />
      <div className="flex flex-col sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2">
        {filteredUsers?.map(({ name, username, profilePic, commonBuilders}) => (
          <UserCard
            key={username}
            profilePic={profilePic}
            name={name}
            username={username}
            commonCount={commonBuilders}
            className={"w-full"}
          />
        ))}
      
        {filteredUsers?.length === 0 && (
          <div className="text-center text-gray-400/80">
            No se encontraron usuarios
          </div>
        )}
      </div>
    </div>
  )
}
