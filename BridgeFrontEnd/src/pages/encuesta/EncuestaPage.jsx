import React from 'react'
import Encuesta from './Encuesta'

const EncuestaPage = () => {

  return (
    <div className="items-center gap-4 p-8 rounded-lg">
        <h3 className="text-4xl text-gray-400/80">Encuesta de Auto-Evaluación</h3>
        <Encuesta />
    </div>    
  )
}

export default EncuestaPage