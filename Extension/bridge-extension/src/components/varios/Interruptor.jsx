import React, { useEffect, useState } from 'react'
import './Interruptor.css'

const Interruptor = ({nombre}) => {

  const [encendido, setEncendido] = useState
  (
    localStorage.getItem(nombre) === 'true' ? true : false
  )

  useEffect(() => {
    localStorage.setItem(nombre, encendido)
  }, [encendido])

  return (
    <div className='WrapperInterruptor'>
      <h2>{nombre}</h2>
      {
        encendido 
        ? 
        <button className='buttonApagar' onClick={() => setEncendido(false)}>
          Apagar
        </button> 
        :
        <button className='buttonEncender' onClick={() => setEncendido(true)}>
          Encender
        </button>
      }
    </div>
  )
}

export default Interruptor