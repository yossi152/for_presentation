import React, { useState, useEffect } from 'react';
import { ProgressBar } from "../generalComponents/ProgressBar";
import {Link } from "react-router-dom";


export function CarPicking({ pageNum, carPicking, handleCarPicking }) {

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);


  const [VehiclePickUpDate, setVehiclePickUpDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [carReturn, setCarReturn] = useState('');

  useEffect(() => {
    const isAllFilled = VehiclePickUpDate && pickupTime && expectedReturnDate && carReturn;
    setAllFieldsFilled(isAllFilled);
  }, [VehiclePickUpDate, pickupTime, expectedReturnDate, carReturn]);
  

  useEffect(() => {      
      setVehiclePickUpDate(carPicking.start_date)
      setPickupTime(carPicking.pickup_time)
      setExpectedReturnDate(carPicking.end_date)

  }, [carPicking.start_date, carPicking.pickup_time, carPicking.end_date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      start_date: VehiclePickUpDate,
      pickup_time : pickupTime,
      end_date: expectedReturnDate,
      estimated_return_time: carReturn
    }

    handleCarPicking(submitData)
  }

  
return (
<>
  <ProgressBar pageNum={pageNum} />

  <form >
    <h1 className='mb-4'>איסוף רכב</h1>

      <div>
      <strong><label htmlFor="VehiclePickUpDate">תאריך איסוף:</label></strong>
      <input
        className="form-control"
        type="date" 
        id="VehiclePickUpDate" 
        value={VehiclePickUpDate} 
        min={new Date().toISOString().split('T')[0]}
        onChange={e => setVehiclePickUpDate(e.target.value)} />
      </div>
      <div>
      <strong><label htmlFor="PickUpTime">שעת איסוף:</label></strong>
      <input
        className="form-control"type="time" id="pickupTime" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
      </div>
      <div>
      <strong><label htmlFor="ExpectedReturnDate">תאריך החזרה משוער:</label></strong>
      <input
        className="form-control"
        type="date" 
        id="expectedReturnDate" 
        value={expectedReturnDate}
        min={VehiclePickUpDate}
        onChange={e => setExpectedReturnDate(e.target.value)} />
      </div>
      <div>
      <strong><label htmlFor="CarReturn"><span style={{fontSize: "0.8rem", color: "red"}}>*</span> שעת החזרה משוערת: </label></strong>
      <input
        className="form-control"type="time" id="carReturn" value={carReturn} onChange={e => {setCarReturn(e.target.value)}} />
      </div>
      <div className='mt-3 d-flex justify-content-between'>
      <button className="btn"><Link to="/pick/PersonalInformation" className="text-dark">חזור</Link></button>
      <button 
        onClick={handleSubmit}
        className={"btn btn-" + (carReturn && allFieldsFilled ? "success" : "secondary")} 
        disabled={!carReturn && allFieldsFilled}>
        <Link to="/pick/CarPhoto" className="text-light">המשך</Link>
      </button>
      </div>


</form>
  </>
)
}