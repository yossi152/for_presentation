import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { ProgressBar } from "../generalComponents/ProgressBar";




export function CheckCard({ pageNum, cardExist, creditCardMessage, travelPhone }) {
    const navigate = useNavigate()

    useEffect(() => {
    if (cardExist)
        navigate("/pick/ExistCard")
    }, [cardExist, navigate]);

return (
    <>
    <ProgressBar pageNum={pageNum} />

    {creditCardMessage}
    <p><strong>טלפון לבירורים:</strong> <a href={"tel:"+travelPhone}>{travelPhone}</a> </p>
    <div className="mt-3 d-flex justify-content-between">        
        <button className="btn"><Link className="text-dark" to="/pick/IsHealth">חזור</Link></button>
        <button className="btn btn-success"><Link className="text-light" to="/pick/PersonalInformation">המשך</Link></button>
    </div>
    </>
    )
}

