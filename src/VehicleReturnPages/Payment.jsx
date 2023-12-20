import React, {useState} from 'react'
import {Link, useNavigate } from "react-router-dom";
import { ReturnProgressBar } from "./ReturnProgessCar";
import { AddPicture } from "../generalComponents/AddPicture";
import isValidID from '../generalComponents/checkID';


export function Payment({pageNum, personalDetails, paymentSubmit}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customer, setCustomer] = useState({"name": `${personalDetails.FirstName} ${personalDetails.LastName}`, "ID": personalDetails.ID});
  const [tourist, setTourist] = useState({fullName: '', address: '', pasportCountry: '', pasportNumber: '', passportPhoto: '', visaPhoto: ''});
  const [isNotFull, setIsNotFull] = useState(false);
  const [ViewComment, seViewComment] = useState(true)

  const navigate = useNavigate()

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    seViewComment(false)
    setIsNotFull(false)

  };
  const HandlTouristInvoice = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    seViewComment(true)
  };


  const IsUpload = () => {
    //...
  }

  const handleKeyPress = (event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }


  const handleSubmit = () => {
    if (selectedOption === 'withTax') {
      paymentSubmit({"customer": customer});
      navigate("/ret/ReturnConfirmationDetails")
    }
    else if (tourist.fullName !== '' && tourist.address !== '' && tourist.pasportCountry !== '' && tourist.pasportNumber !== '' && tourist.passportPhoto !== '' && tourist.visaPhoto !== '') {
      paymentSubmit({"tourist": tourist});
      navigate("/ret/ReturnConfirmationDetails")
    }
    else
    setIsNotFull(true)
  }

  const SendEmail = () => {
    //...
  }

  return (
    <>
      <ReturnProgressBar pageNum={pageNum} />
      

      <h1 className='mb-3'>תשלום</h1>

      <div className='mb-2'>
      <label>
        <input 
          type="radio"
          value="withTax"
          checked={selectedOption === 'withTax'}
          onChange={handleOptionChange}
        />
        חשבונית עם מע"מ
      </label>
    </div>
    <div>
      {selectedOption === 'withTax' && (<>
      <p>
        לפקודת 
        <input
          className='form-control' 
          type='text' 
          value={customer.name} 
          onChange={(e) => {
            setCustomer((prevCustomer)=>({
              ...prevCustomer, name: e.target.value
            }));
          }}
        />
        מספר ת"ז 
        <input 
          className='form-control'
          type="number"
          min = "0" 
          onKeyDown={handleKeyPress}
          value={customer.ID} 
          onChange={(e) => {
            if (e.target.value.length <= 9) {
            setCustomer((prevCustomer)=>({
            ...prevCustomer, ID: e.target.value
      }));
    }
  }}
/>

      </p>
    </>)}
    </div>
    <div>
      <label>
        <input
          type="radio"
          value="NoTax"
          checked={selectedOption === 'NoTax'}
          onChange={HandlTouristInvoice}
        />
        חשבונית לפקודת התייר (ללא מע"מ)
      </label>
    </div>
    <div>
      {selectedOption === 'NoTax' && (
        <>
          <div className='mb-2'>
    <strong>שם מלא של התייר:</strong>
    <div>
        <input className="form-control"
            type='text'
            name='fullName'
            value={tourist.fullName}
            onChange={(e) => {
                setTourist((prevTourist) => ({
                    ...prevTourist,
                    [e.target.name]: e.target.value,
                }));
            }}
        />
    </div>
    </div>
    <div className='mb-2'>
        <strong>כתובת בחו"ל:</strong>
        <div>
            <input className="form-control"
                type='text'
                name='address'
                value={tourist.address}
                onChange={(e) => {
                    setTourist((prevTourist) => ({
                        ...prevTourist,
                        [e.target.name]: e.target.value,
                    }));
                }}
            />
        </div>
    </div>
    <div className='mb-2'>
        <strong>ארץ הנפקת הדרכון:</strong>
        <div>
            <input className="form-control"
                type='text'
                name='pasportCountry'
                value={tourist.pasportCountry}
                onChange={(e) => {
                    setTourist((prevTourist) => ({
                        ...prevTourist,
                        [e.target.name]: e.target.value,
                    }));
                }}
            />
        </div>
    </div>
    <div className='mb-2'>
        <strong>מספר דרכון:</strong>
        <div>
            <input className="form-control"
                type='text'
                name='pasportNumber'
                value={tourist.pasportNumber}
                onChange={(e) => {
                    setTourist((prevTourist) => ({
                        ...prevTourist,
                        [e.target.name]: e.target.value,
                    }));
                }}
            />
        </div>
    </div>
    {tourist.fullName !== '' && tourist.address !== '' && tourist.pasportCountry !== '' && tourist.pasportNumber !== '' &&
      <>
        <div className='mb-2'>
            <strong>צילום דרכון: </strong>
            <div><AddPicture label={'העלה תמונה'} side='passport_photo' IsUpload={IsUpload} postData={{pasportNumber: tourist.pasportNumber, pasportCountry: tourist.pasportCountry, fullName: tourist.fullName, address: tourist.address}}/></div>
        </div>
        <div className='mb-2'>
            <strong>צילום ויזה: </strong>
            <div><AddPicture label={'העלה תמונה'} side='visa_photo' IsUpload={IsUpload} postData={{pasportNumber: tourist.pasportNumber, pasportCountry: tourist.pasportCountry, fullName: tourist.fullName, address: tourist.address}}/></div>
        </div>
      </>
    }

        </>
      )}
    </div>



      {!isNotFull && 
      <div className='mt-3 d-flex justify-content-between'>
        <button className="btn"><Link to="/ret/AccidentDamageReports"  className="text-dark">חזור</Link></button>
        
        <button
          onClick={handleSubmit} 
          className={"btn btn-" + (!selectedOption || !isValidID(customer.ID) ? "secondary" : "success")} 
          disabled={!selectedOption || !isValidID(customer.ID)}>המשך</button>
      </div>}
      {isNotFull &&  ViewComment &&
          <div>
          <p className='mt-2'>נראה ששכחת למלא חלק מהשדות. האם תרצה שנשלח לך תזכורת באימייל?</p>
          <div className="d-flex justify-content-between">
            <button className="btn" onClick={()=> paymentSubmit({"tourist": tourist})}><Link to="/ret/ReturnConfirmationDetails" className="text-dark">לא</Link></button>
            <button onClick={()=> paymentSubmit({"tourist": tourist, "sendEmail": true})} className="btn btn-success"><Link to="/ret/ReturnConfirmationDetails" className="text-light">כן</Link></button>
          </div>
    
          <button onClick={()=>setIsNotFull(false)} className="mt-5 btn btn-secondary">חזור</button>
    
        </div>
      }
    </>   
  )
}


