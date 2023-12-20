import React, { useState } from 'react';
import {Link } from "react-router-dom";


export function AdministrativeLicenseNumber() {
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleInputChange = e => {
    if (e.target.value.length <= 99999999) {
      setLicenseNumber(e.target.value);
    }
  };

  return (
    <div className="form-group" style={{ marginTop: '20px' }}>
      <label htmlFor="licenseNumberInput">הקלד מספר רישוי</label>
      <input
        type="number"
        className="form-control"
        id="licenseNumberInput"
        value={licenseNumber}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          const allowedKeys = ["-", ".", "+"];

          if (allowedKeys.includes(event.key)) {
            event.preventDefault();
          }
        }}
      />
       <button className='btn'>
          <Link to="/HomePage" className="btn text-dark">
            חזור
          </Link>
        </button>

      <button 
        style={{float:"left"}}
        className={"btn btn-" + (licenseNumber>999999 ? "success" : "secondary")} 
        disabled={licenseNumber<999999}>
          <Link to="/pick/PersonalInformation" className="text-light" >
            המשך
          </Link>
      </button>
    </div>
  );
}
