import React from 'react';
import { ReturnProgressBar } from "./ReturnProgessCar";
import { GrEmoji } from "react-icons/gr"; // import the emoji icon from react-icons
import Logo from "../img/Logo/guyLogo1704-03.jpg"
import { Link } from 'react-router-dom';


export function Thanks({ pageNum }) {

    
    return (
        <>
        <ReturnProgressBar pageNum = {pageNum} />
            <div style={{width: "300px", height: "150px", backgroundColor: "white", color: "black", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                <h2>תודה רבה !</h2>
            </div>
            <div style={{width: "300px", height: "150px", backgroundColor: "white", color: "black", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                <h4>נשמח לראותך בהמשך!</h4></div>
            <GrEmoji size={50} color="blue" style={{display: "block", margin: "auto"}} /> 
            <div style={{textAlign: 'center'}}><img src={Logo} alt="Logo" style={{width: "30%", height: "auto"}} /></div>
            {/* react-icons אימוגי בר שינוי לפי סיפריית  */}
            <button className="btn"><Link to="/HomePage" className="text-dark">חזרה לדף בית</Link></button>
        </>
    );
}
