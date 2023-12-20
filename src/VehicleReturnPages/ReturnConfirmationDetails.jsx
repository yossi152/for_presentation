import React from 'react'
import {Link, useNavigate } from "react-router-dom";
import { ReturnProgressBar } from "./ReturnProgessCar";
import convertDateFormat from '../generalComponents/ConvertDate';




export function ReturnConfirmationDetails ({ pageNum, allData, handleConfirmation,role, isOrder}) {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        {/* {"/ret/" + (role.includes("Administrative driver") ? "ReturnConfirmationDetails" : "Payment")} */}
        handleConfirmation()
          .then((success) => {
            if (success) {
              console.log('Action triggered on success');
              navigate(isOrder === false ? "/ret/Thanks" : "/pick/OrderDetails");
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      };

    return (
        <>
        <ReturnProgressBar pageNum = {pageNum} />

        <h1 className='mb-3'>אישור פרטים</h1>
        <div >
          <div className="mb-2"><strong>שם המזמין/ה:</strong> <br/> {allData.orderer_name}</div>
          <div className="mb-2"><strong>מספר רישוי:</strong> <br/> {allData.car_license_number}</div>
          <div className="mb-2"><strong>תאריך איסוף:</strong> <br/> {convertDateFormat(allData.start_date)} </div>
          <div className="mb-2"><strong>שעת איסוף:</strong> <br/> {allData.pickup_time}</div>
          <div className="mb-2"><strong>תאריך החזרה:</strong> <br/> {convertDateFormat(allData.end_date)}</div>
          <div className="mb-2"><strong>שעת החזרה:</strong> <br/> {allData.actual_return_time}</div>
          <div className="mb-2"><strong>מספר קילומטרים:</strong> <br/> {allData.return_kilometers}</div>
          {/* {allData.tollRoads && 
            <div className="mb-2">
                <strong>כבישי אגרה:</strong> 
                <div>
                    {allData.tollRoads}
                </div>
            </div>
          }
          {allData.expenses && 
            <div className="mb-2">
                <strong>הוצאות:</strong> 
                <div>
                    {allData.expenses}
                </div>
            </div>
          }
          {allData.faults && 
            <div className="mb-2">
                <strong>נזקים:</strong> 
                <div>
                    {allData.faults}
                </div>
            </div>
          }
          {allData.eccidents && 
            <div className="mb-2">
                <strong>תאונות:</strong>
                <div>
                    {allData.eccident}
                </div> 
            </div>
          }
          {allData.fines && 
            <div className="mb-2">
                <strong>דו"חות:</strong>
                {allData.fines}
            </div>
          } */}
          <div className='h3 text-danger'>שים לב! לאחר לחיצה על סיום לא יהיה ניתן לערוך את הטופס</div>
        </div>
        <div className='mt-3'>
            <Link to={"/ret/" + (role.includes("Administrative driver") ? "AccidentDamageReports" : "Payment" )}className="text-dark">חזור</Link>
            <button 
                onClick={(e)=>{handleSubmit(e)}} 
                style={{float:"left"}} 
                className="btn btn-success text-light">
                    סיים
            </button>
        </div>
        </>
    )
}