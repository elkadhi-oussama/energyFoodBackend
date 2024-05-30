import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Ingredients from "./Components/Ingredients";
import Plats from "./Components/Plats"
import Calcul from "./Components/Calcul"
import WelcomePage from "./Components/WelcomePage"
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [Ingrs, setIngrs] = useState([])
 
  return (
    <div>
      <Navbar />
      
      <Routes>
      <Route path="/" element={ <WelcomePage/> } />
      <Route path="/Ingredients" element={ <Ingredients Ingrs={Ingrs} setIngrs={setIngrs} /> } />
      <Route path="/Plats" element={ <Plats Ingrs={Ingrs} /> } />
      <Route path="/Calcul" element={ <Calcul/>} />
      </Routes>
    </div>
  );
}

export default App;
