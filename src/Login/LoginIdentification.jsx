import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Identification() {
  const [statusChoice, setStatusChoice] = useState(''); //"email" | "sms" | ''
  const [isSending, setIsSending] = useState(false);
  const [notTrueCode, setNotTrueCode] = useState(false); // true | false

  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [additionalInput, setAdditionalInput] = useState('');

  const [canResend, setCanResend] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    if (remainingTime > 0 && !canResend) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!canResend) {
      setCanResend(true);
      setRemainingTime(60);
    }
  }, [remainingTime, canResend]);

  const idNumbersArray = [
    { id: '5', email: 'meird1995@gmail.com', phone: '0534567890' },
    { id: '9', email: 'me@gmail.com', phone: '057654321' },
    // ...
  ];

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const checkCode = (code) => {
    //post
    if (true) {
      setNotTrueCode(true);
      setAdditionalInput('');

    }
      
    else
      navigate("/HomePage")
  }

  const handlePhoneNumberChange = (e) => {
    const inputNumber = e.target.value;
    setPhoneNumber(inputNumber);

    if (inputNumber.length === 8) {     
      sendMessage();

      setIsSending(true)
      setCanResend(false);
    }
  };

  const handleEmailLogin = () => {
      sendMessage();

      setIsSending(true);
      setCanResend(false);
  };

  const sendMessage = () => {
    if (canResend) {
      
      setIsSending(true);
      setCanResend(false);

      return new Promise((resolve, reject) => {
        fetch(window.baseSever + '/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            choice: statusChoice,
            value: (statusChoice === "sms" ? phoneNumber : emailInput)
          }),
        })
          .catch((error) => {
            console.error('Error:', error);
            reject(error);
          });
      })
    }
  };

  const handleAdditionalInputChange = (event) => {
    setAdditionalInput(event.target.value);
    if (notTrueCode)
      setNotTrueCode(false);
    if (event.target.value.length === 6)
      checkCode(additionalInput);
  };

  return (
    <div>
      <h1 className='my-4'>כניסה</h1>

      {!isSending && (
        <div>
          <div>
            <button
              className={"mb-3 btn btn-" + (!(statusChoice === "email") ? "success" : "secondary")}
              onClick={() => setStatusChoice("sms")}
              disabled={statusChoice === "sms"}
            >
              כניסה באמצעות SMS
            </button>

            <button
              className={"mb-3 btn btn-" + (!(statusChoice === "sms") ? "success" : "secondary")}
              onClick={() => setStatusChoice("email")}
              disabled={statusChoice === "email"}
            >
              כניסה באמצעות מייל
            </button>
          </div>

          {statusChoice === "sms" && (
            <div>
              <label htmlFor="phoneNumber">מספר טלפון נייד:</label>
              <div>
              <input
                style={{display: "inline", width: "80%"}}
                className='form-control'
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e)}
                maxLength={8}
              />
              <span>05</span>
              </div>
              <p className='mt-3'><small>במידה ומספרך מזוהה במערכת - תישלח אליך הודעת SMS עם קוד חד פעמי</small></p>
            </div>
          )}

          {statusChoice === "email" && (
            <div>
              <label htmlFor="email">כתובת מייל:</label>
              <input
                className='form-control'
                type="email"
                id="email"
                value={emailInput}
                onChange={(e)=> setEmailInput(e.target.value)}
              />
              <button
                onClick={handleEmailLogin}
                className={'mx-5 btn btn-outline-' + (isValidEmail(emailInput) ? 'success' : 'secondary')}
                disabled={!isValidEmail(emailInput)}
              >
                המשך
              </button>
              <p className='mt-3'><small>במידה וכתובת האימייל מזוהה במערכת - תישלח אליך הודעה עם קישור חד פעמי</small></p>
            </div>
          )}
        </div>
      )}

      {isSending && (
        <p>
          במידה ו
          {statusChoice === "sms" ? "מספרך " : "כתובת האימייל "}
          מזוהה במערכת - 
          יישלח אליך ברגעים אלו 
          {statusChoice === "sms" && " קוד אימות לנייד, אנא הזן אותו כאן "}
          {statusChoice === "email" && " קישור חד פעמי לאימייל, אנא בדוק אותו"}
        </p>
      )}

      {isSending && statusChoice === "sms" && (
        <div>
          <input
            className='form-control'
            type="numbers"
            value={additionalInput}
            onChange={handleAdditionalInputChange}
            maxLength={6}
          />
          {notTrueCode && (
            <p style={{color: "red"}}><small>הקוד שהזנת שגוי. אנא נסה שנית או נסה הזדהות באמצעות אימייל</small></p>
          )}
        </div>
      )}

      {isSending && (
        <div>
          <button style={{fontSize: "0.6rem"}} onClick={sendMessage} disabled={!canResend} className='btn'>
            <small>אם לא קיבלת - לחץ כאן לשליחה חוזרת או נסה הזדהות באמצעי אחר{remainingTime === 0 || remainingTime === 60 ? '' : remainingTime}</small>
          </button>

          <button className='d-block mt-4 btn btn-secondary' onClick={()=>{setIsSending(false); setStatusChoice(''); setEmailInput(''); setPhoneNumber(''); setAdditionalInput(''); setNotTrueCode(false);}}>חזור</button>
        </div>
      )}
    </div>
  );
}
