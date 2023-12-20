import { useState } from "react";
import "./AddPicture.css";
import { Description } from "./Description";
import { FaTrash } from 'react-icons/fa';
import { AddOnePicture } from "./AddOnePicture";


export function  AddPicture({ label, side, IsUpload, postData}) {
  const [pictureData, setPictureData] = useState([{ pictureUrl: "", description: "", file: "" }]);
  // const [description, setDescription] = useState({});
  // const [plus, setPlus] = useState([1]);



  const handleUploadImage = (index, e) => {
    console.log(e.target.files)
    if (!e.target.files[0])
      return
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPictureData(prevData => {
      const newData = [...prevData];
      newData[index].pictureUrl = objectUrl;
      newData[index].file = file;
      return newData;
    });

    IsUpload && IsUpload(side)
  };

  const handleDescriptionChange = (index, e) => {
    e.preventDefault();

    setPictureData(prevData => {
      const newData = [...prevData];
      newData[index].description = e.target.value;
      return newData;
    });
  }

  const handlePlus = (e) => {
    e.preventDefault();
    setPictureData(prevData => [...prevData, { pictureUrl: "", description: "", file: "" }]);
  }

  const handleDeletePicture = (index, e) => {
    e.preventDefault();
    if (index === 0 && !pictureData[1])
      setPictureData([{ pictureUrl: "", description: "", file: "" }])
    else
      setPictureData(prevData => {
        const newData = [...prevData];
        newData.splice(index, 1);
        return newData;
      });

    // setPlus((prevPlus) => {
    //   const newPlus = [...prevPlus];
    //   newPlus.pop();
    //   return newPlus;
    // });    
  };
  
    const postPicture = async (index) => {
      const formData = new FormData();
      formData.append('image', pictureData[index].file);
      
      formData.append('photo_type', side);
      formData.append('description', pictureData[index].description);

      if (postData)
        if (postData.pasportNumber) {
          formData.append('pasportNumber', postData.pasportNumber)
          formData.append('pasportCountry', postData.pasportCountry)
          formData.append('fullName', postData.fullName)
          formData.append('address', postData.address)
          
        }
  
      console.log(formData)
    
      try {
        const response = await fetch(window.baseSever + '/api/postPhoto', {
          method: 'POST',
          body: formData,
          headers: {
             
            },
        });
  
        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    
  
  
  return (
    <>
      <div className="col-sm border border-primary rounded p-2 mb-4">
        <AddOnePicture 
          pictureUrl={pictureData[0].pictureUrl}
          label={label}
          side={side}
          index={0} 
          handleUploadImage={handleUploadImage} 
        />
        {pictureData[0].pictureUrl && 
          <Description
            description={pictureData[0].description}
            side={side} 
            index={0} 
            handleDescriptionChange={handleDescriptionChange} 
            postPicture={postPicture}
          />
        }
        {pictureData[0].pictureUrl && (
          <button className="btn btn-outline-danger mb-1" onClick={(e) => handleDeletePicture(0, e)}> מחק תמונה <FaTrash className="trash-icon"/> </button>
        )}
        {pictureData[0].pictureUrl && pictureData.length === 1 && (
          <>
          <button className="btn btn-primary mt-2" onClick={handlePlus}> תמונה נוספת +</button>
          </>
        )}
      </div>
      {pictureData.map((data, index) => (
        index > 0 ? (
          <div className="col-sm border border-primary rounded p-2 mb-4" key={index}>
            <AddOnePicture
              pictureUrl={data.pictureUrl}
              label={label}
              side={side}
              index={index}
              handleUploadImage={handleUploadImage}
            />
            {data.pictureUrl && (
              <Description
                description={data.description}
                side={side}
                index={index}
                handleDescriptionChange={handleDescriptionChange}
                postPicture={postPicture}
                placeholder="תאר את הנראה בתמונה"
              />
            )}
            {data.pictureUrl && (
              <button
                className="btn btn-outline-danger mb-1"
                onClick={(e) => handleDeletePicture(index, e)}
              >
                מחק תמונה 
                <FaTrash className="trash-icon" />
              </button>
            )}
            {index === pictureData.length-1 && (
              <>
          <button className="btn btn-primary mt-2" onClick={handlePlus}> תמונה נוספת +</button>
              </>
            )}
          </div>
        ) : null
        ))}


    </>
  );
}
  



