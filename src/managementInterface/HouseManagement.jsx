import React from 'react'
import { Link } from "react-router-dom";

export function HouseManagement() {
  return (
    <div className='d-flex flex-column justify-content-center'>
      <h1 className='my-4'> שלום מאיר, ברוך שובך </h1>
      { <button className=' my-4 btn btn-success'><Link to="/loginHome/ca" className="text-light">עריכת פרטים אישיים</Link></button> }
      <button className='mb-3 btn btn-success'>
        <Link to={isOrder ? "/ret/CarDetails" : "/pick/OrderDetails"} className="text-light">
          {isOrder ? "החלפת" : "איסוף"} הרכב
        </Link>
      </button>
      <button className='mb-3 btn btn-success'>
        <Link to="/ret/CarDetails" className="text-light">
          החזרת הרכב
        </Link>
      </button>
      {role === "admin" && <button>ממשק ניהול</button>}
      <p className='mt-5 d-flex justify-content-around'>
        <span onClick={handlePhoneClick} role="img" aria-label="phone" className='h1'>📞</span>
        <span onClick={handleEmailClick} role="img" aria-label="email" className='h1'>📧</span>
      </p>
    </div>
  )
}
