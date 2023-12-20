import React from "react";
import { GrEmoji } from "react-icons/gr"; // import the emoji icon from react-icons
import Logo from "../img/Logo/guyLogo1704-03.jpg"
import {ProgressBar} from "../generalComponents/ProgressBar"
import { Link } from 'react-router-dom';



export function EndPage({ pageNum }) {
    
    return (
        <>
            <ProgressBar pageNum = {pageNum} />

            <div style={{width: "300px", height: "150px", backgroundColor: "white", color: "black", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                <h2>נסיעה טובה!</h2>
            </div>
            <GrEmoji size={50} color="blue" style={{display: "block", margin: "auto"}} /> 
            <div style={{textAlign: 'center'}}><img src={Logo} alt="Logo" style={{width: "30%", height: "auto"}} /></div>
            <button className="btn btn-outline-primary mt-5"><Link to="/HomePage" className="text-dark">חזרה לדף הבית</Link></button>
        </>
    );
    
}
