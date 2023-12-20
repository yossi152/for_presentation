import React from 'react'
import convertDateFormat from "../generalComponents/ConvertDate";
import {ProgressBar} from "../generalComponents/ProgressBar";
import {Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";




export function OrderDetails({ pageNum, role, details, phone }) {
    console.log(details)
    const navigate = useNavigate()
    useEffect(()=>{
        if (role.includes('Administrative driver'))
            navigate('/pick/IsHealth')
      }, [role, navigate])
      
    
  return (
    <div>
      <ProgressBar pageNum={pageNum} />

      <h1 className='mb-3'>פרטי הזמנת הרכב</h1>
    
      <div className='mb-3'>
      <div className='mb-2'>
          <strong>שם המזמין/ה:</strong>
          <div>{details.orderer_name}</div>
      </div>
      <div className='mb-2'>
          <strong>מספר הזמנה:</strong>
          <div>{details.order_id}</div>
      </div>
      {/* <div className='mb-2'>
          <strong>סוג הרכב:</strong>
          <div>{details.CarType}</div>
      </div> */}
      <div className='mb-2'>
          <strong>תאריך התחלה:</strong>
          <div>{convertDateFormat(details.start_date)}</div>
      </div>
      <div className='mb-2'>
          <strong>תאריך סיום:</strong>
          <div>{convertDateFormat(details.end_date)}</div>
      </div>
      <div className='mb-2'>
          <strong>מספר ימים:</strong>
          <div>{details.numbers_of_days}</div>
      </div>
      <div className='mb-2'>
          <strong>מחיר ליום:</strong>
          <div>{details.price_per_day}$</div>
      </div>
      <div className='mb-2'>
          <strong>סך הכול:</strong>
          <div> {details.numbers_of_days * details.price_per_day}$</div>
      </div>
       <span><strong>טלפון לבירורים:</strong> </span>
       <div><a href={"tel:" + phone}>{phone}</a> </div>

      </div>
      <div className="mb-3">
        <button className="btn btn-success"><Link to="/pick/Conditions" className="text-light">המשך</Link></button>
        </div>
    </div>
  )

}

