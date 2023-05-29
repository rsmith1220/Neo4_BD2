import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        
        <p className='titulo-principal'>
          Contenedor de libros punto com
        </p>
      </header>
    <div className = 'buscador'>
      <p>Nombre del libro</p>
      <input>
      </input>
    </div>
    
<div className='contiene'>
  <p className='infor'>El libro esta en WAREHOUSE</p>

    <p className='infor'>El supplier es SUPPLIER</p>

    <p className='infor'>Se puede encontrar en RETAILERS</p>

    <p className='infor'>Ha sido comprado por CUSTOMERS</p>

</div>
    
    </div>
  );
}

export default App;
