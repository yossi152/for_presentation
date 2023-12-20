import React from 'react'
import { Routes, Route} from "react-router-dom"

import {Cars} from "../managementInterface/Cats"



export function ManagementInterface() {
  return (
    <Routes>
    <Route path="Cars" element={<Cars/>}></Route>
    <Route path="VehiclePickupInspection" element={<VehiclePickupInspection/>}></Route>
</Routes>              
)
}
