import './App.css';
import React, { useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Interruptor from './components/varios/Interruptor.jsx';
import { Link } from 'react-router-dom';


function App() {
  
  useEffect(() => {
    let ubicacion = window.location.href;
    console.log(ubicacion);
  }, []);

  return (
    <div className="App">
      <Header />      
      <div className='alertaDesarrollo'>
        <p styles={"width:100%; margin: 0; height: 100%"}>
          La extensión esta en desarrollo. Puedes disfrutar de todas las funciones de Bridge en nuestra <a href='http://localhost:5173/' target='_blank'>Página web</a>
        </p>
      </div>
    </div>
  );
}

export default App;
