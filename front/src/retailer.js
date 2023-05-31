import './App.css';
import { Link} from "react-router-dom";


// PAGINA DE CREACION
// AQUI SE CREA PARA CREAR CREACIONES

function Retailer() {
  return (
    <div className="app">
      <header>
        
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
    <div className = 'buscador'>
      <p>Creando</p>
    </div>
    <Link to='/navegar'><button className='cambios'>
        
        Navigation page
        
    </button></Link>
<div className='contiene'>
  <p className='infor'>Node label<input></input>
  </p>
  

  <p className='infor'>Node key<input></input>
  </p>
  

  <p className='infor'>Node value<input></input>
  </p>
  

</div>
    
    </div>
  );
}

export default Retailer;
