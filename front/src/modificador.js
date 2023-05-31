import './buyer.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


// PAGINA DE NAVEGACION DONDE NAVEGAMOS
// AQUI SE NAVEGA PARA NAVEGACION
// NAVEGANCIA


function Modificar() {

  

  return (
    <div className="app">
      <header>
        
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
    <div className = 'buscador'>
      <p>Modificando</p>

    </div>
    <Link to='/#'><button className='cambios'>
        
        Creation page
        
    </button></Link>
    


<div>
    {/*  */}
    <p>
        Node label
        <input>
    </input></p>

    <p>
        Node key
        <input>
    </input></p>

    <p>
        Node value
        <input>
    </input></p>
</div>
    
    </div>
  );
}

export default Modificar;
