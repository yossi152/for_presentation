import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReturnProgressBar } from './ReturnProgessCar';
import convertDateFormat from '../generalComponents/ConvertDate';
import { useNavigate } from 'react-router-dom';

export function CarDetails({ pageNum, carType, carNum, startDate, pickUpTime, phone, currentDate, currentTime, handleDateTimeRet, role }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (role.includes('Administrative driver')) navigate('/ret/KilometersReturn');
  }, []);

  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleTime(e) {
    setTime(e.target.value);
  }

  return (
    <div>
      <ReturnProgressBar pageNum={pageNum} />

      <h1 className="mb-3">פרטי הרכב</h1>

      <div>
        <div className="mb-2">
          <strong>סוג הרכב:</strong>
          <div>{carType}</div>
        </div>
        <div className="mb-2">
          <strong>מספר הרכב:</strong>
          <div>{carNum}</div>
        </div>
        <div className="mb-2">
          <strong>תאריך קבלת הרכב:</strong>
          <div>{convertDateFormat(startDate)}</div>
        </div>
        <div className="mb-2">
          <strong>שעת איסוף:</strong>
          <div>{pickUpTime}</div>
        </div>

        <label htmlFor="ret">
          <strong>הוחזר בתאריך :</strong>
          <input className="form-control" id="ret" type="date" onChange={handleDate} value={date} />
        </label>

        <label htmlFor="time">
          <strong>בשעה :</strong>
          <input className="form-control" id="time" type="time" onChange={handleTime} value={time || ''} />
        </label>
      </div>

      <p>
        <strong>טלפון לבירורים:</strong>{' '}
        <a href={'tel:' + phone}>{phone}</a>{' '}
      </p>

      <div className="mt-4">
        <button
          onClick={() => handleDateTimeRet({ date: date, time: time })}
          className="btn btn-success"
          disabled={!date || !time}
        >
          <Link to="/ret/KilometersReturn" className="text-light">
            המשך
          </Link>
        </button>
      </div>
    </div>
  );
}
