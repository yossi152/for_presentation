import React from 'react'
import {useState} from "react";
import axios from "axios";

export function ComponentImg() {
  const [file, setFile] = useState([]);  // מגדיר מערך ריק

  const handleSubmit = async(e) => { // async = פונקציה שלא מחזירה מיד ערך 
    e.preventDefault(); // preventDefault = E מאפס את 

    const formData = new FormData();  //FormData יוצר משתנה מסוג 
    formData.append("myFile", file); // מייסם את הנתונים 

    await axios.post("/upload", formData).then((res)=>{// השרות קוד הבאה שןךח נתונים לשרת 
        alert(res.data) // alert = פונקציה של חלונית קופצת
    }).catch((err)=>{
       console.log(err)
    })
  };

  const handleChange = (e) => {// הפונקציה הבאה דואגת לשמור את הקובץ הראשון בהערך 
     setFile(e.target.files[0])
  }

  const handleClick = () => {
    const img = document.createElement('img');
    img.src = file.url;
    document.getElementById('image').appendChild(img);
  };
  return (
    <div className="App">
       <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}> {/* .מייצר טופס להאזנת נתונים  */} 
        <label htmlFor='file'> בחר קובץ להעלאה </label> <br />
        <br />
        <input type="file" name="file" onChange={handleChange} multiple={false}/> {/*זה מציין שניתן לבחור רק קובץ אחד בכל פעם. = multiple*/}
        <button type="submit">Upload</button>
        <button type="button" onClick={handleClick}>הצג תמונה</button>

      </form>
      <div id="image"></div>
    </div>
  );
}