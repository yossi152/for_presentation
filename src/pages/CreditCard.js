import {Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { ProgressBar } from "../generalComponents/ProgressBar";

export function ExistCard ({ pageNum, notVerifiedCardMessage, handleCardChanges, healthDeclarationStatus }) {
  const [formData, setFormData] = useState({ numbers: '', experience: '' });
  const [ToRender, setToRender] = useState("check"); //"check || notVerified || error"
  const navigate = useNavigate();

const handleChange = (e) => {
  let { name, value } = e.target;
  // validity 4 digits
  if (name === "numbers" && value <= 9999)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // validity and view experience
  if (name === "experience") {
    value = value.replace(/\D/g, '');
    if (value.length < 3 && value <= 12)
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (value.length === 3 && value.slice(2) > 1)
      setFormData((prevFormData) => ({ ...prevFormData, experience: `${value.slice(0, 2)}/${value.slice(2)}` }))
    if (value.length === 4) {
      const currentYear = new Date().getFullYear();
      const enteredYear = Number(value.slice(2)) + 2000;
      if (enteredYear >= currentYear && enteredYear <= currentYear + 10) {
        setFormData((prevFormData) => ({ ...prevFormData, experience: `${value.slice(0, 2)}/${value.slice(2)}` }))
      } 
    }
  }
};

const handleKeyPress = (event) => {
  const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
}


  const handleSubmit = (e) => {
    let postData = {numbers: Number(formData.numbers), experience:formData.experience}
    e.preventDefault();

    fetch(window.baseSever + '/api/CheckCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valid) navigate("/pick/PersonalInformation")
        else setToRender("notVerified")
      })
      .catch((error) => {
        console.error('Error:', error);
        setToRender('error');
      });
  };
  
  return (
    <div>
          <ProgressBar pageNum={pageNum} />
      {ToRender === "check" &&
        <>
        <h1 className="mb-5">כרטיס אשראי לביטחון</h1>

        <form onSubmit={handleSubmit}>
        <label>
          מסתיים בספרות:
          <input 
            className="form-control"
            type="number"  
            name="numbers" 
            min = "0"
            placeholder="4 ספרות אחרונות" 
            value={formData.numbers} 
            onKeyDown={handleKeyPress}
            onChange={handleChange}
          />
        </label>

        <label>
          תוקף הכרטיס:
          <input 
            className="form-control"
            inputMode="numeric" 
            type="text" 
            maxLength={5} 
            name="experience" 
            placeholder="MM/YY" 
            value={formData.experience} 
            onChange={handleChange}
          />
        </label>
{/* <Link to={"/pick/" + (role.includes("Administrative driver") ? "PersonalInformation" : "CarPicking")} className="text-dark">חזור</Link> */}
        <div className="mt-3 d-flex justify-content-between">
          <button className="btn">
            <Link to={(healthDeclarationStatus === true) ? "/pick/Conditions" : "/pick/IsHealth"}className="text-dark">חזור</Link>
          </button>
          <button type="submit" className="btn btn-success text-light">המשך</button>
        </div>
        </form>
        </>
      }
      {ToRender === "notVerified" &&
        <>
        <h3>{notVerifiedCardMessage}</h3>
        
        <div className="mt-3 d-flex justify-content-between">
          <button onClick={() => setToRender("check")} className="btn text-dark">חזור</button>
    
          <button className="btn btn-secondary" onClick={(e)=>{handleCardChanges(formData)}}>
            <Link to="/pick/PersonalInformation" className="text-light" style={{fontSize: "0.8rem"}}><small>המשך בכל זאת</small></Link>
          </button>
        </div>
        </>      
      }
      {ToRender === "error" &&
        <>
          <h3>An error occurred while sending the data.</h3>

          <div className="mt-3 d-flex justify-content-between">
            <button onClick={() => setToRender("check")} className="btn text-dark">חזור</button>
      
            <button className="btn btn-secondary" >
              <Link to="/pick/PersonalInformation" className="text-light" style={{fontSize: "0.8rem"}}><small>המשך בכל זאת</small></Link>
            </button>
          </div>
        </>
      }
      
    </div>
  );
};


export default ExistCard;




  