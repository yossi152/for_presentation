import { ProgressBar } from "../generalComponents/ProgressBar";
import { useState } from "react";
import {Link } from "react-router-dom";

export function GeneralInstructions ({ pageNum, guidelines }) {
    const [checked, setChecked] = useState(false);
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    return (
        <>
      <ProgressBar pageNum = {pageNum} />
      <form >

        <h1>הנחיות כלליות</h1>
          <p>{guidelines}</p>
        <br></br>  

        <label htmlFor="agree">
        <input
          type="checkbox"
          id="agree"
          name="agree"
          value="agree"
          checked={checked}  

          onChange={handleChange}
        />
          הבנתי. ואני מסכים/ה</label>
        
        <div className="mt-3">

          <button className="btn">
            <Link to="/pick/Kilometers" className="text-dark">חזור</Link>
          </button>
          
          <button 
            type="submit" 
            style={{float:"left"}} 
            className={"btn btn-" + (checked ? "success" : "secondary")} 
            disabled={!checked}>
              <Link to="/pick/ConfirmationDetails" className="text-light">המשך</Link>
          </button>

        </div>

      </form>
        </>
    )
}
