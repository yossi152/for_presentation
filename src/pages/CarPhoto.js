import { Link } from "react-router-dom";
import { ProgressBar } from "../generalComponents/ProgressBar";
import { AddPicture } from "../generalComponents/AddPicture";
import React, { useState, useEffect } from "react";

export function CarPhoto({ pageNum , role}) {
  const [uploadImages, setUploadImages] = useState({front: false, back: false, left: false, right: false});
  const [letContinue, setLetContinue] = useState(role.includes("Administrative driver"))

  useEffect (()=>{
    if (role.includes("Administrative driver"))
      setLetContinue(true)
    if (uploadImages.front && uploadImages.back && uploadImages.right && uploadImages.left)
      setLetContinue(true)
  }, [uploadImages.front, uploadImages.back, uploadImages.right, uploadImages.left, role])

  const IsUpload = (side) => {
    setUploadImages((prev) => ({...prev, [side]: true})

    )
  }
  
    return (
      <div >

      <ProgressBar pageNum={pageNum} />
      
        <h1 className="mb-5"> צילום הרכב </h1>

        <form>
        <div className="border-top border-3 border-primary rounded p-2">
            <span>צילום קדמי</span>
            <AddPicture label={"הוסף תמונה"} side="front" IsUpload={IsUpload}/>
          </div>

          <div className="border-top border-3 border-primary rounded p-2">
            <span>צילום ימין</span>
            <AddPicture label={"הוסף תמונה"} side="right" IsUpload={IsUpload}/>
          </div>

          <div className="border-top border-3 border-primary rounded p-2">
            <span>צילום אחורה</span>
            <AddPicture label={"הוסף תמונה"} side="back" IsUpload={IsUpload}/>
          </div>

          <div className="border-top border-3 border-primary rounded p-2">
            <span>צילום שמאל</span>
            <AddPicture label={"הוסף תמונה"} side="left" IsUpload={IsUpload}/>
          </div>


          <div className="d-flex justify-content-between">
            <button className="btn"><Link to={"/pick/" + (role.includes("Administrative driver") ? "PersonalInformation" : "CarPicking")} className="text-dark">חזור</Link></button>
            <button 
              type="submit" 
              className={"btn btn-" + (letContinue ? "success" : "secondary")} 
              disabled={!letContinue}>
                <Link to="/pick/CarDamage" className="text-light">
                  המשך
                </Link>
            </button>
          </div>
          
        </form>
      </div>
      
    );
  }
  