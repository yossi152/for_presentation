import { useEffect, useRef } from 'react';


export function Description ({ description, side, index, handleDescriptionChange, postPicture, placeholder }) {

  const textareaRef = useRef();

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });

  return (
      <div key={index}>
        <label>
          תיאור: 
          <textarea
            ref={textareaRef}
            style={{width: "65vw"}}
            className="mx-2 border rounded p-2" 
            type="text" 
            id={"decription" + side + index} 
            name={"decription" + side + index}
            value={description || ''}
            onChange={(e) => handleDescriptionChange(index, e)}
            onBlur={(e)=> {postPicture(index)}}
            autoFocus
            placeholder={placeholder}/>
                
          </label>
      </div>
    )
  }