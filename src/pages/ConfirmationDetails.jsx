import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { ProgressBar } from "../generalComponents/ProgressBar";
import convertDateFormat from '../generalComponents/ConvertDate';




export function ConfirmationDetails ({ pageNum, orderDetails, carPicking, handleConfirmation, role }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    handleConfirmation()
      .then((success) => {
        if (success) {
          console.log('Action triggered on success');
          navigate("/pick/EndPage");
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };
  
    return (
        <>
          <ProgressBar pageNum = {pageNum} />

        <h1 className='mb-3'>אישור פרטים</h1>
        <div >
          <div className='mb-2'>
            <strong>שם המזמין/ה:</strong> 
            <br/> 
            {orderDetails.first_name}
          </div>
          <div className='mb-2'>
            <strong>מספר רישוי:</strong> 
            <br/> 
            {orderDetails.car_license_number}
          </div>
          <div className='mb-2'>
            <strong>תאריך איסוף:</strong> 
            <br/> 
            {convertDateFormat(carPicking.start_date)}
          </div>
          <div className='mb-2'>
            <strong>שעת איסוף:</strong> 
            <br/> 
            {carPicking.pickup_time}
          </div>
          <div className='mb-2'>
            <strong>תאריך החזרה משוערת:</strong> 
            <br/> 
            {convertDateFormat(carPicking.end_date)}
          </div>
          <div className='mb-2'>
            <strong>שעת החזרה משוערת:</strong> 
            <br/> 
            {carPicking.estimated_return_time}
          </div>
          <div className='h3 text-danger'>שים לב! לאחר לחיצה על סיום לא יהיה ניתן לערוך את הטופס</div>
        </div>
        <div className="d-flex justify-content-between">
          <Link to={"/pick/" + (role.includes("Administrative driver") ? "kilometers" : "GeneralInstructions")} className="text-dark">חזור</Link>
          <button 
            onClick={(e)=>{handleSubmit(e)}}
            style={{float:"left"}} 
            className="btn btn-success text-light"
          >
            סיים
          </button>
        </div>  

        </>
    )
}