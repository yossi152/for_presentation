import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";


export function HomePage() {
  const [allData, setAllData] = useState()

  
  useEffect(() => {
    fetch(window.baseSever + '/api/homePage')
      .then(response => response.json())
      .then(data => {
        setAllData(data)
      });
  
    }, []);
    if (!allData) {
      return <div>Loading...</div>;
      }
  

  const phoneNumber = '025807685';
  const emailAddress = 'meir@gmail.com';

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className='d-flex flex-column justify-content-center'>
      <h1 className='my-4'>דף הבית</h1>

      <button className=' my-4 btn btn-success'><Link to="/loginHome/UpdatePersonalDetails" className="text-light">עריכת פרטים אישיים</Link></button>
      
      {(allData.role.includes("Customer") || allData.role.includes("Administrative driver")) &&
        <>
          <button className='mb-3 btn btn-success'>
            <Link to={allData.is_rental ? "/ret/CarDetails" : "/pick/OrderDetails"} className="text-light">
              {allData.is_rental && !allData.role.includes("Administrative driver") ? "החלפת" : "איסוף"} הרכב
            </Link>
          </button>
          
          <button className='mb-3 btn btn-success'>
            <Link to="/ret/CarDetails" className="text-light">
              החזרת הרכב
            </Link>
          </button>
        </>
      }
      
      {allData.role.includes("Manager") && <button>ממשק ניהול</button>}
      <p className='mt-5 d-flex justify-content-around'>
        <span onClick={handlePhoneClick} role="img" aria-label="phone" className='h1'>📞</span>
        <span onClick={handleEmailClick} role="img" aria-label="email" className='h1'>📧</span>
      </p>
    </div>
  );
}
