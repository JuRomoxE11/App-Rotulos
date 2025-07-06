import React from 'react';
import BuscarOrden from './components/BuscarOrden';
import './BuscarOrden.css';
import Centro from './components/Centro';
// import './Centrodes.css';
import Unidad from './components/Unidad';
import './unidad.css'
import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <h1>Generador de Rótulos</h1>
      </header>
      
    <div Container= "App-Container">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous"></link>
      <main>
        <BuscarOrden />
      </main>
      <main>
        <Centro />
      </main>
      <main>
        <Unidad />
      </main>
     <button> Buscar </button>
 </div>
    
    </div>
  );
}

export default App;