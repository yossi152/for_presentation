import { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";

export function UpdatePersonalDetails() {
  // const [allData, setAllData] = useState();

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/pickAllData')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       setAllData(data)
  //     });
  
  //   }, []);

    

  // הגדרת סטייט לשמירת הפרטים האישיים
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    mobile: '',
    licenseExpiration: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  // פונקציה לטיפול בשינוי בטופס
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }


  // פונקציה לשמירת הפרטים בלחיצה על הכפתור
  const handleSaveClick = () => {
    // כאן תוכל להוסיף לוגיקה נוספת לשמירת הפרטים
    // כמו שליחת הנתונים לשרת או אחסון במקומי
    console.log('פרטים שנשמרו:', formData);
  };

  return (
    <div >
      <h1>עדכון פרטים אישיים</h1>
      <form>
        <div>
          <label>שם פרטי:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>שם משפחה:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>מספר ת"ז:</label>
          <span
            type="text"
            name="idNumber"
            min = "0"
            onKeyDown={handleKeyPress}
            value={formData.idNumber}
          />
        </div>
        <div>
          <label>נייד:</label>
          <input
            type="number"
            name="mobile"
            min = "0"
            onKeyDown={handleKeyPress}
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>תוקף רישיון:</label>
          <input
            type="text"
            name="licenseExpiration"
            value={formData.licenseExpiration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>כתובת מייל:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>כתובת מגורים:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>יישוב:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>מיקוד:</label>
          <input
            type="number"
            name="zipCode"
            min = "0"
            onKeyDown={handleKeyPress}
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className='mt-3 d-flex justify-content-between'>
      <button ><Link to="/HomePage" className="text-dark">חזור</Link></button>
      <button onClick={handleSaveClick} className="text-dark">שמור</button>
     </div>
    </div>
  );
}
