import React from 'react'
import { useState } from 'react'
import { RatingRadar } from '../perfil/RatingRadar'
import TeamSkills from './TeamSkills'
import { Link } from 'react-router-dom'

const CursoEspecifico = () => {

  let courseCode = window.location.pathname.split("/")[2]

  let data = {
    "name": "PROCESO DE DESARROLLO DE SOFTWARE",
    "code": "468118",
    "shift": "TARDE",
    "day": "LUNES",
    "period": "2024-1C",
    "users": [
        {
            "name": "Rosas Vernet, Pedro Arturo",
            "username": "perosasvernet@uade.edu.ar",
            "legajo": "1137062"
        },
        {
            "name": "Mardones Daher, Santiago",
            "username": "smardones@uade.edu.ar",
            "legajo": "1155085"
        },
        {
            "name": "Poggi Toledo, Dahiana Romina",
            "username": "dpoggitoledo@uade.edu.ar",
            "legajo": "1151380"
        },
        {
            "name": "Alonso, Lara Trinidad",
            "username": "laralonso@uade.edu.ar",
            "legajo": "1155144"
        },
        {
            "name": "Archua, Joaquin",
            "username": "jarchua@uade.edu.ar",
            "legajo": "1159213"
        },
        {
            "name": "Boriero, Lautaro",
            "username": "lboriero@uade.edu.ar",
            "legajo": "1157216"
        },
        {
            "name": "Bejarano Arce, Juan Martin",
            "username": "jbejaranoarce@uade.edu.ar",
            "legajo": "1150726"
        },
        {
            "name": "Floridia, Santino Juan",
            "username": "sfloridia@uade.edu.ar",
            "legajo": "1161626"
        },
        {
            "name": "Carle, Santiago",
            "username": "sacarle@uade.edu.ar",
            "legajo": "1149016"
        },
        {
            "name": "Carrozzo Ruiz, Gonzalo",
            "username": "gcarrozzoruiz@uade.edu.ar",
            "legajo": "1157467"
        },
        {
            "name": "Casartelli, Federico",
            "username": "fcasartelli@uade.edu.ar",
            "legajo": "1159335"
        },
        {
            "name": "Cosentino, Francisco",
            "username": "fconsentino@uade.edu.ar",
            "legajo": "1155525"
        },
        {
            "name": "Cristiani, Tiziano",
            "username": "tcristiani@uade.edu.ar",
            "legajo": "1146378"
        },
        {
            "name": "Diaz, Lola Miranda",
            "username": "loldiaz@uade.edu.ar",
            "legajo": "1148293"
        },
        {
            "name": "Ferreira Bazalar, Diego",
            "username": "diferreira@uade.edu.ar",
            "legajo": "1158885"
        },
        {
            "name": "Gaito, Bárbara",
            "username": "bgaito@uade.edu.ar",
            "legajo": "1155822"
        },
        {
            "name": "Garcia, Pilar Jimena",
            "username": "pilargarcia@uade.edu.ar",
            "legajo": "1148446"
        },
        {
            "name": "Gomez, Patricio Matias",
            "username": "patgomez@uade.edu.ar",
            "legajo": "1146620"
        },
        {
            "name": "Gonzalez, Homero Ivan",
            "username": "hogonzalez@uade.edu.ar",
            "legajo": "1153714"
        },
        {
            "name": "Grande , Agustin",
            "username": "aggrande@uade.edu.ar",
            "legajo": "1164504"
        },
        {
            "name": "Gschwind, Juan Manuel",
            "username": "jgschwind@uade.edu.ar",
            "legajo": "1163925"
        },
        {
            "name": "Ingrassia , Luis Pedro",
            "username": "lingrassia@uade.edu.ar",
            "legajo": "1147700"
        },
        {
            "name": "Leiva, Maria Victoria",
            "username": "marileiva@uade.edu.ar",
            "legajo": "1157085"
        },
        {
            "name": "Lencina, Yanina",
            "username": "ylencina@uade.edu.ar",
            "legajo": "1159420"
        },
        {
            "name": "Losauro, Juan Andrés",
            "username": "jlosauro@uade.edu.ar",
            "legajo": "1159408"
        },
        {
            "name": "Maldonado, Emanuel Agustin",
            "username": "malemanuel@uade.edu.ar",
            "legajo": "1147403"
        },
        {
            "name": "Migueltorena, Lara",
            "username": "lmigueltorena@uade.edu.ar",
            "legajo": "1158597"
        },
        {
            "name": "Mociulsky Molas, Santiago Bernardo",
            "username": "smociulsky@uade.edu.ar",
            "legajo": "1158033"
        },
        {
            "name": "Moens Rocabado, Rodrigo Alfredo",
            "username": "rmoensrocabado@uade.edu.ar",
            "legajo": "1158518"
        },
        {
            "name": "Muntaabski, Federico",
            "username": "fmuntaabski@uade.edu.ar",
            "legajo": "1158981"
        },
        {
            "name": "Ortiz, Luis",
            "username": "luiortiz@uade.edu.ar",
            "legajo": "1149267"
        },
        {
            "name": "Pariso Dos Santos, Martina Abril",
            "username": "mparisodos@uade.edu.ar",
            "legajo": "1145174"
        },
        {
            "name": "Peña, Tomas Ignacio",
            "username": "tpena@uade.edu.ar",
            "legajo": "1142403"
        },
        {
            "name": "Regueira, Tomas",
            "username": "tregueira@uade.edu.ar",
            "legajo": "1150229"
        },
        {
            "name": "Salemme, Christian Carlos",
            "username": "csalemme@uade.edu.ar",
            "legajo": "1152248"
        },
        {
            "name": "Schaschin, Ian Mateo",
            "username": "ischaschin@uade.edu.ar",
            "legajo": "1154513"
        },
        {
            "name": "Suazo Verger, Juan Ignacio",
            "username": "jsuazoverger@uade.edu.ar",
            "legajo": "1152309"
        },
        {
            "name": "Trigueiro, Martiniano",
            "username": "mtrigueiro@uade.edu.ar",
            "legajo": "1156140"
        },
        {
            "name": "Zega, Facundo Emiliano",
            "username": "fzega@uade.edu.ar",
            "legajo": "1155781"
        },
        {
            "name": "Carschmit, Donna Isabel",
            "username": "dcarschmit@uade.edu.ar",
            "legajo": "1922125"
        },
        {
            "name": "Ovando Martinez, Daniel",
            "username": "dovando@uade.edu.ar",
            "legajo": "1158285"
        },
        {
            "name": "Rico, Candela Celeste",
            "username": "carico@uade.edu.ar",
            "legajo": "1155065"
        },
        {
            "name": "Botner Bakovic, Federico Alejandro",
            "username": "fbotnerbakovic@uade.edu.ar",
            "legajo": "1148851"
        },
        {
            "name": "Bottazzini, Francisco",
            "username": "fbottazzini@uade.edu.ar",
            "legajo": "1159349"
        },
        {
            "name": "Choclin, Tobias",
            "username": "tchoclin@uade.edu.ar",
            "legajo": "1194508"
        },
        {
            "name": "Daroca, Matias",
            "username": "mdaroca@uade.edu.ar",
            "legajo": "1110793"
        },
        {
            "name": "Dominguez, Tomas Ignacio",
            "username": "tomasdominguez@uade.edu.ar",
            "legajo": "1161967"
        },
        {
            "name": "Fantauzzo, Bautista",
            "username": "bfantauzzo@uade.edu.ar",
            "legajo": "1163941"
        },
        {
            "name": "Figuerero Mantilla, Manuel Vicente",
            "username": "mafiguerero@uade.edu.ar",
            "legajo": "1158507"
        },
        {
            "name": "Galiano, Lucía Agustina",
            "username": "lugaliano@uade.edu.ar",
            "legajo": "1145263"
        },
        {
            "name": "Mayordomo, Facundo Martin",
            "username": "fmayordomo@uade.edu.ar",
            "legajo": "1149479"
        },
        {
            "name": "Medina Barrondo, Sebastian Aitor",
            "username": "semedina@uade.edu.ar",
            "legajo": "1081481"
        },
        {
            "name": "Ravaschio, Guido",
            "username": "gravaschio@uade.edu.ar",
            "legajo": "1147343"
        },
        {
            "name": "Rubattino, Alexander",
            "username": "arubattino@uade.edu.ar",
            "legajo": "1140557"
        },
        {
            "name": "Suriano, Pilar",
            "username": "psuriano@uade.edu.ar",
            "legajo": "1066373"
        },
        {
            "name": "Tirado Mateu, Ivana Ainara",
            "username": "itiradomateu@uade.edu.ar",
            "legajo": "1158915"
        }
    ]
}

  const [isDisponible, setIsDisponible] = useState(false)

  let sugerencias = []

      sugerencias = [
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p2",
                "username": "p2@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.8960114,
        "skills": {
            "Organización": 0.60854703,
            "Ideación": 0.6974359,
            "Liderazgo": 0.4769231,
            "Comunicación": 0.5982906,
            "Desarrollo": 0.61880344
        }
    },
    {
        "members": [
            {
                "name": "p3",
                "username": "p3@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.82407415,
        "skills": {
            "Organización": 0.46111113,
            "Ideación": 0.76666665,
            "Liderazgo": 0.6333333,
            "Comunicación": 0.6111111,
            "Desarrollo": 0.5277778
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p5",
                "username": "p5@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.81766385,
        "skills": {
            "Organización": 0.45299146,
            "Ideación": 0.7863248,
            "Liderazgo": 0.63247865,
            "Comunicación": 0.5982906,
            "Desarrollo": 0.52991456
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p1",
                "username": "p1@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.81766385,
        "skills": {
            "Organización": 0.45299146,
            "Ideación": 0.7863248,
            "Liderazgo": 0.63247865,
            "Comunicación": 0.5982906,
            "Desarrollo": 0.52991456
        }
    },
    {
        "members": [
            {
                "name": "p2",
                "username": "p2@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.8148148,
        "skills": {
            "Organización": 0.64444447,
            "Ideación": 0.73333335,
            "Liderazgo": 0.53333336,
            "Comunicación": 0.44444445,
            "Desarrollo": 0.64444447
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p7",
                "username": "p7@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.79843307,
        "skills": {
            "Organización": 0.8418803,
            "Ideación": 0.5641026,
            "Liderazgo": 0.57692313,
            "Comunicación": 0.5982906,
            "Desarrollo": 0.41880342
        }
    },
    {
        "members": [
            {
                "name": "p2",
                "username": "p2@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p5",
                "username": "p5@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.7592592,
        "skills": {
            "Organización": 0.4888889,
            "Ideación": 0.6888889,
            "Liderazgo": 0.62222224,
            "Comunicación": 0.7777778,
            "Desarrollo": 0.42222223
        }
    },
    {
        "members": [
            {
                "name": "p1",
                "username": "p1@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p2",
                "username": "p2@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.7592592,
        "skills": {
            "Organización": 0.4888889,
            "Ideación": 0.6888889,
            "Liderazgo": 0.62222224,
            "Comunicación": 0.7777778,
            "Desarrollo": 0.42222223
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p3",
                "username": "p3@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.75356126,
        "skills": {
            "Organización": 0.42521366,
            "Ideación": 0.7307693,
            "Liderazgo": 0.57692313,
            "Comunicación": 0.76495725,
            "Desarrollo": 0.50213677
        }
    },
    {
        "members": [
            {
                "name": "p1",
                "username": "p1@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.7407408,
        "skills": {
            "Organización": 0.4888889,
            "Ideación": 0.82222223,
            "Liderazgo": 0.6888889,
            "Comunicación": 0.44444445,
            "Desarrollo": 0.5555556
        }
    },
    {
        "members": [
            {
                "name": "p5",
                "username": "p5@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.7407408,
        "skills": {
            "Organización": 0.4888889,
            "Ideación": 0.82222223,
            "Liderazgo": 0.6888889,
            "Comunicación": 0.44444445,
            "Desarrollo": 0.5555556
        }
    },
    {
        "members": [
            {
                "name": "p7",
                "username": "p7@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.7407408,
        "skills": {
            "Organización": 0.87777776,
            "Ideación": 0.6,
            "Liderazgo": 0.6333333,
            "Comunicación": 0.44444445,
            "Desarrollo": 0.44444445
        }
    },
    {
        "members": [
            {
                "name": "p2",
                "username": "p2@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p3",
                "username": "p3@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6851852,
        "skills": {
            "Organización": 0.46111113,
            "Ideación": 0.6333333,
            "Liderazgo": 0.5666667,
            "Comunicación": 0.9444445,
            "Desarrollo": 0.39444444
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p8",
                "username": "p8@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.67378914,
        "skills": {
            "Organización": 0.60854703,
            "Ideación": 0.8307693,
            "Liderazgo": 0.5435898,
            "Comunicación": 0.26495728,
            "Desarrollo": 0.75213677
        }
    },
    {
        "members": [
            {
                "name": "p3",
                "username": "p3@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p9",
                "username": "p9@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6620371,
        "skills": {
            "Organización": 0.6944444,
            "Ideación": 0.6666667,
            "Liderazgo": 0.8333334,
            "Comunicación": 0.6111111,
            "Desarrollo": 0.19444445
        }
    },
    {
        "members": [
            {
                "name": "p1",
                "username": "p1@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p4",
                "username": "p4@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6481482,
        "skills": {
            "Organización": 0.7777778,
            "Ideación": 0.7777778,
            "Liderazgo": 0.5555556,
            "Comunicación": 0.6666667,
            "Desarrollo": 0.22222222
        }
    },
    {
        "members": [
            {
                "name": "p5",
                "username": "p5@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p7",
                "username": "p7@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6481482,
        "skills": {
            "Organización": 0.7222222,
            "Ideación": 0.5555556,
            "Liderazgo": 0.7222222,
            "Comunicación": 0.7777778,
            "Desarrollo": 0.22222222
        }
    },
    {
        "members": [
            {
                "name": "p1",
                "username": "p1@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p7",
                "username": "p7@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6481482,
        "skills": {
            "Organización": 0.7222222,
            "Ideación": 0.5555556,
            "Liderazgo": 0.7222222,
            "Comunicación": 0.7777778,
            "Desarrollo": 0.22222222
        }
    },
    {
        "members": [
            {
                "name": "p4",
                "username": "p4@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p5",
                "username": "p5@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6481482,
        "skills": {
            "Organización": 0.7777778,
            "Ideación": 0.7777778,
            "Liderazgo": 0.5555556,
            "Comunicación": 0.6666667,
            "Desarrollo": 0.22222222
        }
    },
    {
        "members": [
            {
                "name": "Carschmit, Donna Isabel",
                "username": "dcarschmit@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p6",
                "username": "p6@uade.edu.ar",
                "legajo": "1922125"
            },
            {
                "name": "p0",
                "username": "p0@uade.edu.ar",
                "legajo": "1922125"
            }
        ],
        "compatibility": 0.6324786,
        "skills": {
            "Organización": 0.7863248,
            "Ideación": 0.5641026,
            "Liderazgo": 0.8547009,
            "Comunicación": 0.37606838,
            "Desarrollo": 0.41880342
        }
    }
]


  return (
    <div className='m-8'>
      <h1>{data.name}</h1>
      <div className='ml-2'>
        <h3>Código: {data.code}</h3>
        <h3>Turno: {data.shift}</h3>
        <h3>Día: {data.day}</h3>
        <h3>Período: {data.period}</h3>
      </div>

      <div className='w-full m-6'>
        <div className='flex justify-content-space-between'>
          <h2>Crear Equipo</h2>
          <div>
            <label htmlFor="disponibleToggle"> Usuario disponible para formar Equipos</label>
            <input name="disponibleToggle" className='border border-gray-300 rounded-md m-2' type='radio' value={isDisponible} id='disponibleToggle'/>
          </div>          
        </div>

        <div>
          <input type="text" />

        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Buscar</button>

        <div>
          {
            sugerencias == [] ? "" : 
            sugerencias.map((sugerencia, index) => (
              <div className='m-2 p-2 border border-gray-300 rounded-md flex'>

              <h3 style={{
                      fontSize: '36px', // Tamaño de letra grande
                      textAlign: 'center', // Texto centrado
                      verticalAlign: 'middle', // Alinear verticalmente
                      borderRadius: '10px', // Bordes redondeados
                      padding: '10px', // Padding para no tocar los bordes
                      background: `rgb(${255 * (1 - sugerencia.compatibility)}, ${255 * sugerencia.compatibility}, 0)`,
                      color: 'white',
                    }}>{parseFloat(sugerencia.compatibility * 100).toFixed(2) }%</h3>               
                  <TeamSkills skills={sugerencia.skills} id={index}/>                 


                <div>

                  {
                    sugerencia.members.map((user) => (
                      <Link to={`/perfil/${user.username}`}>
                        <div key={user.legajo} className='m-2 p-2 border border-gray-300 rounded-md flex'>
                          <h3>{user.name}  |  {user.username}  |  {user.legajo}</h3>
                        </div>
                      </Link>
                    ))
                  }

                </div>

              </div>

            ))
          }
        </div>
      </div>

      <h2>Alumnos</h2>

      <div className='flex flex-wrap'>
        {data.users.map((user) => (
          <Link to={`/perfil/${user.username}`}>
            <div key={user.legajo} className='m-2 p-2 border border-gray-300 rounded-md flex'>
              <h3>{user.name}  |  {user.username}  |  {user.legajo}</h3>
            </div>
          </Link>
        ))}
      </div>
      

    </div>
  )
}

export default CursoEspecifico