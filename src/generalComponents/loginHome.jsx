import React from 'react'
import { Routes, Route} from "react-router-dom"

import { UpdatePersonalDetails } from "../Login/UpdatePersonalDetails";
import { VehiclePickupInspection } from "../Login/VehiclePickupInspection";


export function LoginHome() {
  return (
    <div> 
        <Routes>
            <Route path="UpdatePersonalDetails" element={<UpdatePersonalDetails/>}></Route>
            <Route path="VehiclePickupInspection" element={<VehiclePickupInspection/>}></Route>
        </Routes>              
    </div>
  )
}
