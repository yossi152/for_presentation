import { Routes, Route} from "react-router-dom"

import { Identification } from "./Login/LoginIdentification";
import {HomePage} from "./Login/HomePage";
import { Pick } from "./generalComponents/pick";
import { Ret } from "./generalComponents/ret";
import { LoginHome } from "./generalComponents/loginHome";



function App(){


  return (
    <div className="container">



    <Routes>
      
      <Route path="/" element={<HomePage/>}/>
      <Route path="/pick/*" element={<Pick/>} />
      <Route path="/ret/*" element={<Ret/>} />
      <Route path="/loginHome/*" element={<LoginHome/>} />

      <Route path="/Identification" element={<Identification />}></Route>
      <Route path="/HomePage" element={<HomePage />}></Route>

    </Routes>

    </div>
  )
}

export default App