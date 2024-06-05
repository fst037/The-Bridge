import './App.css';
import React, { useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Interruptor from './components/varios/Interruptor.jsx';


function App() {
  
  useEffect(() => {
    let ubicacion = window.location.href;
    console.log(ubicacion);
  }, []);

  return (
    <div className="App">
      <Header />      
      <ul className='ListaConfiguraciones'>
        
      <li><Interruptor nombre="Cargar Compañeros"/></li>
        <li><Interruptor nombre="Cargar Cursos"/></li>
        <li><Interruptor nombre="Mostrar Perfiles"/></li>
      </ul>


    </div>
  );
}

export default App;
