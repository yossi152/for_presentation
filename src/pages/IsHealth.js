import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { ProgressBar } from "../generalComponents/ProgressBar";

export function HealthDeclaration({ pageNum, healthDeclarationStatus , personalDetails, handleHealthDeclaration, role }) {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (healthDeclarationStatus)  {
      navigate("/pick/" + (role.includes("Administrative driver") ? "AdministrativeLicenseNumber" : "CheckCard"));
      //
    }
    
  }, [healthDeclarationStatus, navigate, role]);

  return (
    <div >
      <ProgressBar pageNum={pageNum} />
      <div>
      <h1 className="mb-3 mt-2">הצהרת בריאות</h1>

      <div>
        <span>
          אני החתום מטה <strong> {personalDetails.first_name + " " + personalDetails.last_name}</strong> מס' ת"ז <strong> {personalDetails.id} </strong>
        </span>
        מצהיר בזה כי לא נתגלו אצלי, לפי מיטב ידיעתי מגבלות במערכת העצבים, העצמות, הראיה או השמיעה...
      </div>

      <form>

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
          אני מצהיר כי הצהרתי הנ"ל אמת:
        </label>
      </div>
        
          <div className="d-flex justify-content-between">
            <button className="btn">
              <Link to={(role.includes("Administrative driver") ? "/" : "/pick/Conditions")} className="text-dark">
                חזור
              </Link>
            </button>

            <button onClick={(e)=>{e.preventDefault(); handleHealthDeclaration()}} className={"btn btn-" + (checked ? "success" : "secondary")} disabled={!checked}>
              {/* {isOrder ? "/ret/CarDetails" : "/pick/OrderDetails"} */}
              <Link to={"/pick/" + (role.includes("Administrative driver") ? "AdministrativeLicenseNumber" : "CheckCard")} className="text-light"> 
                המשך
              </Link>
            </button>
          </div>
      </form>
      </div>
    </div>
  );
}

export default HealthDeclaration;
