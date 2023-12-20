import { useEffect, useRef } from "react";
import { MdAddAPhoto } from "react-icons/md";



export function AddOnePicture ({pictureUrl, label, side, index, handleUploadImage}) {
    const inputRef = useRef();
  
    useEffect (() => {
      if (index !== 0  && !pictureUrl)
        inputRef.current.click();

    return () => {
        if (pictureUrl) {
            URL.revokeObjectURL(pictureUrl);
        }
    }
    },[pictureUrl, index])
    
    return (
      <>
        
      <form encType="multipart/form-data" style={{display: 'inline-block'}} className="mt-4 mb-2">
        <label>
          <span> {label} <MdAddAPhoto className="camera-icon"/> </span>
          <input
            ref={inputRef}
            className="pick-file" 
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleUploadImage(index, e)}/>
        </label>
        {pictureUrl &&
          <>
            <img src={pictureUrl} alt={side} height={100}/>
  
          </>
          }
      </form>
      
      </>
    )}
    