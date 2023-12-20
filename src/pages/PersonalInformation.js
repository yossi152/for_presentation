import React, { useState, useEffect } from 'react';
import { ProgressBar } from "../generalComponents/ProgressBar";
import { Link } from "react-router-dom";
import "./PersonalInformation.css"

export function PersonalInformation({ pageNum, personalInformationRecived, handlePersonalInformation, role }) {
  const [dateErrorMessage, setDateErrorMessage] = useState('');
  const [personalInformation, setPersonalInformation] = useState({
    first_name: "",
    last_name: "",
    id: "",
    phone: "",
    drivers_license_validity: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });

  // הוספת משתנה בוליאני שיציין האם השדות ריקים או לא
  const [fieldsEmpty, setFieldsEmpty] = useState(true);

  useEffect(() => {
    setPersonalInformation(personalInformationRecived);
  }, [personalInformationRecived]);

  useEffect(() => {
    // בכל שינוי בפרטים האישיים, בדוק האם יש שדות ריקים
    const isEmpty = Object.values(personalInformation).some(value => value === "");
    setFieldsEmpty(isEmpty);
  }, [personalInformation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInformation((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === 'drivers_license_validity') {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        setDateErrorMessage('לפי המערכת הרישיון שלך לא בתוקף האם אתה בטוח? ');
      } else {
        setDateErrorMessage('');
      }
    }
  };

  const handleKeyPress = (event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  

  // בדיקת אורך מספר ת"ז
  function handleInput(e) {
    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9);
  }

  return (
    <div>
      <ProgressBar pageNum={pageNum} />
      <h1 className='mb-4'>פרטים אישיים</h1>
      <form>
        <div className='form-group'>
          <strong><label htmlFor="FirstName">שם פרטי:</label></strong>
          <input
            className="form-control"
            type="text"
            id="FirstName"
            name="first_name"
            value={personalInformation.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong><label htmlFor="LastName">שם משפחה:</label></strong>
          <input
            className="form-control"
            type="text"
            id="LastName"
            name="last_name"
            value={personalInformation.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong><label htmlFor="identityCardNumber">מספר ת"ז/ח"פ:</label></strong>
          <input
            className="form-control"
            type="number"
            id="identityCardNumber"
            name="id"
            min="0"
            value={personalInformation.id}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onInput={handleInput}
          />
        </div>
        <div>
          <strong><label htmlFor="Phone">נייד:</label></strong>
          <input
            className="form-control"
            type="tel"
            id="Phone"
            name="phone"
            min="0"
            value={personalInformation.phone}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div>
          <strong><label htmlFor="driverLicenseExpirationDate">תוקף רישיון נהיגה:</label></strong>
          <input
            className="form-control"
            type="date"
            id="driverLicenseExpirationDate"
            name="drivers_license_validity"
            value={personalInformation.drivers_license_validity}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
          />
        </div>
        <p style={{ color: 'red' }}>{dateErrorMessage}</p>
        <div>
          <strong><label htmlFor="email">כתובת מייל:</label></strong>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={personalInformation.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong><label htmlFor="address">כתובת מגורים:</label></strong>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={personalInformation.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong><label htmlFor="City">יישוב:</label></strong>
          <input
            className="form-control"
            type="text"
            id="City"
            name="city"
            value={personalInformation.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong><label htmlFor="PC">מיקוד:</label></strong>
          <input
            className="form-control"
            type="number"
            id="PC"
            name="zip"
            min="0"
            value={personalInformation.zip}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        <p className='mt-1 mb-3 '><strong><small>אם הפרטים אינם נכונים נא לתקן</small></strong></p>
        <button style={{ float: "left" }} disabled={fieldsEmpty} onClick={() => { handlePersonalInformation(personalInformation) }} className={`btn btn-success ${fieldsEmpty ? "disabled" : ""}`}>
          <Link to={role.includes("Administrative driver") ? "/pick/CarPhoto" : "/pick/CarPicking"} className="text-light">המשך</Link>
        </button>
      </form>
    </div>
  );
};
