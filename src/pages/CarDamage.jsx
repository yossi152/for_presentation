import React, { useState } from "react";
import { AddPicture } from "../generalComponents/AddPicture";
import { Link } from "react-router-dom";
import { ProgressBar } from "../generalComponents/ProgressBar";

export function CarDamage({ pageNum }) {
  const [hasAccident, setHasAccident] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);

  const handleChange = () => {
    setHasAccident(true);
    setChecked(false);
  };

  const handleApproval = () => {
    setHasAccident(false);
    setChecked(true);
  };
  

  return (
    <>
      <ProgressBar pageNum={pageNum} />
      <h1 className="mb-3">פגיעות ברכב</h1>
      <p>האם ישנם ברכב נזקים נראים לעין?</p>
      <div>
        <label htmlFor="yes">
          <input
            type="radio"
            id="yes"
            name="accident"
            value="true"
            onChange={handleChange}
          />
          כן
        </label>
      </div>
      <div>
        <label htmlFor="no">
          <input
            type="radio"
            id="no"
            name="accident"
            value="false"
            onChange={handleApproval}
          />
          לא
        </label>
      </div>
      {hasAccident && (
        <div>
          <AddPicture 
            label={isPictureTaken ? "" : "צלם את הנזק"}
            side="damage" 
            IsUpload={() => {
              setChecked(true);
              setIsPictureTaken(true);
            }} 
          />
        </div>
      )}
      <div className='mt-3 d-flex justify-content-between'>
        <button className="btn">
          <Link to="/pick/CarPhoto" className="text-dark">חזור</Link>
        </button>
        <button 
          type="submit" 
          className={"btn btn-" + (checked ? "success" : "secondary")} 
          disabled={!checked}
        >
          <Link to="/pick/Kilometers" className="text-light">המשך</Link>
        </button>
      </div>
    </>
  );
}
