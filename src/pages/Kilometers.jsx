
import {Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { ProgressBar } from "../generalComponents/ProgressBar";
import { AddPicture } from "../generalComponents/AddPicture";



export function Kilometers ({ pageNum, role, lastKilometers, message, handleKilometers }) {
  const [formData, setFormData] = useState({ number: "", image: "" });
  const [ToRender, setToRender] = useState(false);
  const [checkedUpload, setCheckedUpload] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((formData.number === String(lastKilometers) || lastKilometers === '') && role.includes("Administrative driver")) {handleKilometers(formData.number); navigate("/pick/ConfirmationDetails")}
    else if (formData.number === String(lastKilometers) || lastKilometers === '') {handleKilometers(formData.number); navigate("/pick/GeneralInstructions")}
    else setToRender(true)
  };
  
  return (
    <div>
      <ProgressBar pageNum={pageNum} />

      <h1 className="mb-2">צילום פנים הרכב</h1>
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
        
        {!ToRender && (
          <div className="mt-3">
            <button className="btn">
              <Link to="/pick/CarDamage" className="text-dark">חזור</Link>
            </button>
            <button 
              onClick={handleSubmit}
              style={{float:"left"}} 
              className={"btn btn-" + (formData.number>0 && checkedUpload ? "success" : "secondary")} 
              disabled={!(formData.number>0 && checkedUpload)}
            >המשך</button>
          </div>
        )}
        {ToRender && (
          <>
            <h3>{message}</h3>
            
            <div className="mt-3">
              <button onClick={()=>setToRender(false)} className="btn text-dark">חזור</button>

              <button style={{float:"left"}}  className="btn btn-secondary" onClick={()=>handleKilometers(formData.number)}>
                <Link to={"/pick/" + (role.includes("Administrative driver") ? "ConfirmationDetails" : "GeneralInstructions")} className="text-light">כן</Link>
              </button>
            </div>
          </>
        )}
        
      </div>
    );
  };



