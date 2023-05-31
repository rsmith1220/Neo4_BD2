import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home, Page2, Page3 } from './paginas';

const rootElement = document.getElementById("root");
const NotFound = () => <h1>404: Page Not Found</h1>;

function App() {
  render(
    
    <BrowserRouter>
      <Routes>
        {/* Pagina principal */}
        <Route path="/" element={<Home />} />
        <Route path="/navegar" element={<Page2 />} />
        <Route path="/modifier" element={<Page3 />} />
        
      </Routes>
    </BrowserRouter>,
  rootElement
  );
  
  
}

export default App;
