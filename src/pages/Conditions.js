import { ProgressBar } from "../generalComponents/ProgressBar";
import { useState, useEffect} from "react";
import {Link } from "react-router-dom";

export function Conditions({ pageNum, handleCarNum, carNum, allCars, isOrder }) {
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [carNumInput, setCarNumInput] = useState(String(carNum) || '')

  useEffect(()=>{
    if (isOrder)
      setCarNumInput('')
  }, [isOrder])
  

  return (
    
    <div>
      <ProgressBar pageNum = {pageNum} />
      
      <div>
        <h1 className="mb-3">תנאי השימוש</h1>
      <h2>ברכב שמספרו 
      {!edit && !isOrder ? 
        <span className="h2"> {carNumInput} </span>
         : 
<input 
  className="form-control"
  autoFocus 
  type="number" 
  min="0"
  value={carNumInput} 
  onChange={(e)=>{
    if (e.target.value<=99999999)
      setCarNumInput(e.target.value)
  }}
  onKeyDown={(event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }}
/>
        }
      </h2>
        {!isOrder && <>
      ({!edit ?
        (<label className="mb-3" style={{fontSize: "0.5rem"}}>
          לעריכת מספר הרכב - לחץ כאן 
            <button style={{display: "none"}} onClick={()=>{setEdit(true)}}></button>
        </label>) :
        (<label className={"btn btn-" + (carNumInput>999999 ? "success" : "secondary")} style={{fontSize: "0.5rem"}}>
          שמור
          <button 
            style={{display: "none"}} 
            disabled={carNumInput<999999}
            onClick={()=>{
              setEdit(false); 
              if (carNum !== carNumInput)
                handleCarNum(carNumInput)
              }}>
          </button>
        </label>)
      })
        </>}
      
      
      
      <form>
      <p className="d-flex justify-content-center list-group">
      החתול טיפס על העץ והסתכל על הציפורים. הוא רצה לצוד ציפור, אבל הוא היה קצת מפחד. הוא ניסה להתקרב לציפור, אבל היא עפה משם. החתול היה מאוכזב, אבל הוא ידע שהוא ינסה שוב יום אחד.

החתול ירד מהעץ והלך לחפש משהו לאכול. הוא מצא צלחת אוכל על המרפסת, והוא אכל את כל האוכל. החתול היה שמח, והוא הלך לישון.

החתול התעורר בבוקר והלך לשחק בחצר. הוא רץ אחרי הכדור והיה מאוד שמח. הוא שיחק כל היום, והוא היה עייף מאוד בלילה.

החתול הלך לישון והחל לחלום. הוא חלם שהוא צוד ציפור, והוא היה מאוד מאושר. הוא ידע שהוא יהיה חתול מאושר כל חייו.
      </p>
 
        
        <div className="mt-3 mb-3">
          <label htmlFor="agree" className="mr-2">
          <input
            className="ml-5"
            type="checkbox"
            id="agree"
            name="agree"
            value="agree"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
            אני מאשר/ת את תנאי השימוש
          </label>
        </div>
        
        <div className="d-flex justify-content-between">
            <button className="btn">
              <Link to="/pick/OrderDetails" className="text-dark">חזור</Link>
            </button>
          
            <button 
              className={"btn btn-" + (checked && carNumInput>999999 && !edit ? "success" : "secondary")} 
              disabled={!checked || carNumInput<999999 || edit}>
                <Link to="/pick/IsHealth" className="text-light">המשך</Link>
            </button>

        </div>
      </form>
      </div>
    </div>
  );
}

