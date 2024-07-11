import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryConfig } from '../../utils/queryConfig'
import { getTeam } from '../../services/teams'
import { UserCard } from '../../components/UserCard'
import { SkillsRadar } from '../../components/SkillsRadar'
import { IoMdPersonAdd } from 'react-icons/io'
import { useCardToggle } from '../../hooks/useCardToggle'
import { AddPersonModal } from '../../components/AddPersonModal'
import { CompleteTeamAutoModal } from '../../components/CompleteTeamAutoModal'

const EquipoEspecifico = () => {
  const { teamId } = useParams();
  const { cardAddMemberRef, isAddMemberOpen, setIsAddMemberOpen } = useCardToggle();
  const { cardGenerateTeamRef, isGenerateTeamOpen, setIsGenerateTeamOpen } = useCardToggle();


  const { data: teamInfo, isLoading } = useQuery(
    "teamInformation",
    () => getTeam(teamId),
    queryConfig
  );

  return (
    <div className="flex flex-col h-min gap-4 p-4 md:p-8">
        {isLoading && <p>Cargando...</p>}
        {!isLoading && (
          <>
            <h2 className="text-4xl text-gray-400/80">{teamInfo.team.equipo.team.nombre}</h2>

          <div className="flex flex-col lg:flex-row w-full">
            <div className="border border-gray-300 rounded-lg p-4 lg:mr-5 mb-5 lg:mb-0">
                <h4 className="text-lg font-[500] mb-4">Skills</h4>
                  <SkillsRadar skills={teamInfo?.team.skills} className={"w-full"}/>
            </div>

            <div className="flex flex-col border border-gray-300 rounded-lg p-4 grow-1 w-full justify-between">
              <div className="flex">
                <h4 className="text-lg font-[500] mb-4">Miembros del Equipo</h4>
                <IoMdPersonAdd
                  className="size-5 m-1 ml-2 cursor-pointer"
                  onClick={() => setIsAddMemberOpen(true)}
                />
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 items-start grow-1 mb-auto">
                {teamInfo.users?.map(({ name, username, profilePic }) => (
                  <UserCard
                    key={username}
                    profilePic={profilePic}
                    name={name}
                    username={username}
                    className={"w-full"}
                  />
                ))}
              </div>
              <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5'
                onClick={() => setIsGenerateTeamOpen(true)}
              >Generar sugerencias para completar el equipo FALTA MODAL</button>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className='flex'>
              <h4 className="text-lg font-[500]">Proyectos</h4>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded ml-5'>Nuevo Proyecto FALTA MODAL</button>
            </div>            
            <div className='flex flex-col md:grid md:grid-cols-[repeat(auto-fit,_minmax(600px,_1fr))] gap-2 items-start'>
              {
              teamInfo.team.projects.map(project => (
                <div key={project.identifier} className="border border-gray-300 rounded-lg p-4 mt-4 h-full">
                  <Link to={`/proyecto/${project.identifier}`}>
                    <h5 className="text-lg font-[500] mb-2">{project.titulo}</h5>     
                  </Link>                                 
                  <div className='flex flex-col md:flex-row'>
                    <Link to={`/proyecto/${project.identifier}`} className='w-auto h-auto max-w-40 md:mr-5 self-center'>
                      <img src={project.portadaLink} alt={project.titulo}/>   
                    </Link>                    
                    <div>
                      <h6 className="text-md font-[500] mt-2 md:mt-0">Descripción: </h6>                      
                      <p className='ml-3 break-words text-left mt-1'>{project.descripcion}</p>
                      <h6 className="text-md font-[500] mt-2">Links: </h6>
                      <ul className='ml-3 mt-1'>
                        {project.links.map(link => (
                          <li key={link}>
                            <a href={link} target="_blank" rel="noreferrer" className='text-sm text-blue-500 underline break-all text-left'>{link}</a>
                          </li>
                        ))}
                      </ul>   
                    </div>
                  </div>
                  
                </div>
              ))
            }
            </div>
            
          </div>
            
            

            
          
          </>
        )}
        <AddPersonModal
                  cardRef={cardAddMemberRef}
                  isOpen={isAddMemberOpen}
                  setIsOpen={setIsAddMemberOpen}
                  team={teamInfo.team.equipo.team}
                />
                
        <CompleteTeamAutoModal isOpen={isGenerateTeamOpen} setIsOpen={setIsGenerateTeamOpen} cardRef={cardGenerateTeamRef} team={teamInfo.team.equipo} />
    </div>
  )
}

export default EquipoEspecifico