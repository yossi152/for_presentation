import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import { ReturnProgressBar } from "./ReturnProgessCar";
import { AddPicture } from "../generalComponents/AddPicture";

export function KilometersReturn ({ pageNum,  role, lastKilometers, messages, onKilometersReturnSubmit}) {
  const [formData, setFormData] = useState({ number: "", image: "" });
  const [message, setMessage] = useState('');
  const [checkedUpload, setCheckedUpload] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.number < lastKilometers)
      setMessage(messages.Smaller) 
    else if (formData.number > lastKilometers+1500 ) 
      setMessage(messages.Bigger)
    else 
    {onKilometersReturnSubmit(formData.number); navigate("/ret/TollRoads")}
  };

  
  return (
    <div>
      <ReturnProgressBar pageNum={pageNum} />

      <h1 className="mb-3">צילום פנים הרכב</h1>
      <div> מלא את הק"מ של הרכב </div>
      <div>
        <input 
          className="form-control"
          placeholder="קילומטראז'"
          type="number" 
          id="number" 
          name="number" 
          min="0"
          value={formData.number} 
          onChange={handleChange}
          onKeyDown={(event) => {
            const allowedKeys = ["-", ".", "+"];

            if (allowedKeys.includes(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <AddPicture
        label={isPictureTaken ? "" : "צלם מד דלק ומד קילומטר"} 
        side="dashboard" 
      IsUpload={()=>{setCheckedUpload(true); setIsPictureTaken(true)}}/>
        
      {!message && (
          <div className="mt-3">
            <button className="btn">
              <Link to={(role.includes("Administrative driver") ? "/HomePage" : "/ret/CarDetails")} className="text-dark">חזור</Link>
            </button>
            <button 
              onClick={handleSubmit}
              style={{float:"left"}} 
              className={"btn btn-" + (formData.number>0 && checkedUpload ? "success" : "secondary")} 
              disabled={!(formData.number>0 && checkedUpload)}
            >המשך</button>
          </div>
        )}
      {message &&(
        <div className='mt-3'>
          <div>{message}</div>
          
          <div className="mt-3">
            <button onClick={()=>setMessage('')} className="btn text-dark">חזור</button>

            <button onClick={()=>onKilometersReturnSubmit(formData.number)} style={{float:"left"}}  className="btn btn-secondary">
              <Link to="/ret/TollRoads" className="text-light">כן</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


