import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function VehiclePickupInspection() {
  const [customerOrder, setCustomerOrder] = useState('Order not found')//uyui/poio/pojoi
  const [inputValue, setInputValue] = useState(''); // מציין את הערך שהמשתמש מזין
  const [lastFourDigits, setLastFourDigits] = useState(''); // משתנה לשמירת 4 הספרות האחרונות של הכרטיס

  const navigate = useNavigate()
  const orderNum = 12234
  const numId = 4568
  const phoneNumber = '025807685';

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const routeHomePage = () => {
    navigate('/HomePage')
  }


  const checkOrderNum = () => {
    if (orderNum == inputValue) {
      navigate('/pick/OrderDetails')
    }
    else {
      setCustomerOrder("Incorrect order number")
    }
  }
  
  const checkIDverification = () =>{
    if(lastFourDigits == numId){
      navigate('/pick/OrderDetails')
    }
    else{
      setCustomerOrder("Id not found")
    } 

  } 


  return (
<div>
<span onClick={routeHomePage} role="img" aria-label="Derelict House" className='h1' style={{float: 'left', marginTop: '20px' }}>🏚️</span>
  <h1>איסוף רכב</h1>
  {customerOrder === 'Order not found' && (
    <>
    <div>הזמנתך לא נמצאה, נא הכנס מספר הזמנה</div>
    <input
      type="text"
      placeholder="מספר הזמנה"
      maxLength={10} // מוגבל ל-4 ספרות
      value={inputValue} // משתמשים בערך המצוי בשדה הקלט
      onChange={(e) => setInputValue(e.target.value)} // מעדכנים את ערך השדה הקלט בהתאם לשינוייו
      />
    <span onClick={handlePhoneClick} role="img" aria-label="phone" className='h1'>📞</span>

    <button onClick={checkOrderNum}style={{ float: 'left' }}>המשך</button>

      
      
    </>
  )}

    {customerOrder === 'Incorrect order number' && (
      <>

        <div>מורה דרך יקר, מספר ההזמנה שכתבת אינו משוייך אליך, האם אתה בטוח? </div>
        <button onClick={()=>setCustomerOrder("Order not found")}>לא</button>
        <button onClick={()=>setCustomerOrder("ID verification")}style={{ float: 'left' }}>כן</button>
        
      </>
    )}

    {customerOrder === 'ID verification' && (
      <>

          <div> אנא הקלד את 4 ספרות האחרונות של התעודת זהות</div>
          <input
            type="text"
            placeholder="4 ספרות אחרונות"
            maxLength={4} // מוגבל ל-4 ספרות
            onChange={(e) => setLastFourDigits(e.target.value)} // שומר את הערך שהמשתמש מזין במשתנה
          />
          <button onClick={checkIDverification}style={{ float: 'left' }}>המשך</button>
          <button onClick={()=>setCustomerOrder("Incorrect order number")}>חזור</button>

        </>    
      )}
        
        {customerOrder === 'Id not found' && (
          <>

          <div>לצערנו לא נמצאה ההזמנה. לבירור יש לחייג למספר {phoneNumber}</div>
          <button onClick={()=>setCustomerOrder("ID verification")}>חזור</button>
          </>
        )}

    </div>
  )//HomePage
}
