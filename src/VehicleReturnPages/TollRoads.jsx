import React, { useState, useEffect } from 'react';
import { ReturnProgressBar } from "./ReturnProgessCar";
import { Link, useNavigate } from "react-router-dom";

export function TollRoads({ pageNum, categories, rentalDates, handleSubmitData, role}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const initialCategoriesData = categories.map(() => ({
      fastLanePrices: {},
      journeyCounts: {}
    }));
    setCategoriesData(initialCategoriesData);
  }, [categories]);

  const IsFastLinePricesCorrect = (date) => {
    const numberOfJourneyCounts = categoriesData[3]?.journeyCounts[date] || 0;
    const fastLanePricesForDate = categoriesData[3]?.fastLanePrices[date] || '';
    if (numberOfJourneyCounts === 0) return true;
    else if (numberOfJourneyCounts === 1 && fastLanePricesForDate === '') return false
    else {
      const numberOfCommas = fastLanePricesForDate.split(',').length - 1;
      return numberOfCommas === numberOfJourneyCounts - 1;
    }
  };
  

  const handleFastLanePriceChange = (categoryIndex, date, price) => {
    setCategoriesData((prevData) => {
      const newData = [...prevData];
      const categoryData = newData[categoryIndex] || {
        fastLanePrices: {},
        journeyCounts: {}
      };
      categoryData.fastLanePrices[date] = price;
      newData[categoryIndex] = categoryData;
      return newData;
    });
  };
  

  const handleJourneyCountChange = (e, categoryIndex, date, countChange) => {
    e.preventDefault();
    setCategoriesData((prevData) => {
      const newData = [...prevData];
      const categoryData = newData[categoryIndex] || {
        journeyCounts: {}
      };
      const currentCount = categoryData.journeyCounts[date] || 0;
      const newCount = Math.max(currentCount + countChange, 0);
  
      const updatedCategoryData = {
        ...categoryData,
        journeyCounts: {
          ...categoryData.journeyCounts,
          [date]: newCount
        }
      };
  
      newData[categoryIndex] = updatedCategoryData;
      return newData;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    for (let date of rentalDates) {
      if (!IsFastLinePricesCorrect(date))
        {alert("מספר המחירים שהוכנס אינו תואם למספר הנסיעות")
        return}
    }

    handleSubmitData(selectedCategories.map(categoryIndex => ({
      [categoryIndex]: categoriesData[categoryIndex]
    })))
    navigate("/ret/" + (role.includes("Administrative driver") ? "AccidentDamageReports" : 'Expenses'));
    }
  

  return (
    <div>
      <ReturnProgressBar pageNum={pageNum} />

      <h1 className='mb-3'>כבישי אגרה</h1>

      <form onSubmit={(e)=>handleSubmit(e)}>
      {categories.map((category, index) => (
        <div key={index}>
          <div>
            <label>
              <input
                type="checkbox"
                name="category"
                value={category.name}
                checked={selectedCategories.includes(index)}
                onChange={() => {
                  if (selectedCategories.includes(index)) {
                    setSelectedCategories((prevSelected) =>
                      prevSelected.filter((selected) => selected !== index)
                    );
                  } else {
                    setSelectedCategories((prevSelected) => [...prevSelected, index]);
                  }
                }}
              />
              <p style={{ display: 'inline-block', fontWeight: 'bold' }} > {category.name} - {category.price && `$${category.price}`} </p>
            </label>
          </div>
          {selectedCategories.includes(index) && (
            <div>
              {rentalDates.map((date, dateIndex) => (
                <div className='border border-primary rounded p-2 mb-1' key={dateIndex}>
                  <span><small>תאריך: </small> {date}</span>
                  <br />
                  <span><small>מספר נסיעות: </small></span>
                  <br />
                  <div className='d-flex flex-nowrap'>
                    <button className="btn btn-primary mx-3" onClick={(e) => handleJourneyCountChange(e, index, date, -1)}>-</button>
                    <span>{categoriesData[index]?.journeyCounts[date] || 0}</span>
                    <button className="btn btn-primary mx-3" onClick={(e) => handleJourneyCountChange(e, index, date, 1)}>+</button>
                  </div>

                  {category.name === 'הנתיב המהיר' && (
                    <div>
                      <label>
                        <input
                          className='form-control mb-0 mt-1'
                          type="text"
                          placeholder='מחיר הנסיעות'
                          value={categoriesData[index]?.fastLanePrices[date] || ''}
                          onChange={(e) => handleFastLanePriceChange(index, date, e.target.value)}
                        />
                      </label>
                        {!IsFastLinePricesCorrect(date) && <span style={{fontSize: "small", color: "red", position: "relative", top: "-15px"}}>
                          מספר המחירים שהוכנס אינו תואם למספר הנסיעות
                        </span> }
                        <br />
                        <span style={{fontSize: "large"}}>מספר נסיעות - יופרדו בפסיק</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className='mt-3'>
        <button className="btn"><Link to="/ret/KilometersReturn" className="text-dark">חזור</Link></button>
        <button type='submit' style={{ float: "left" }} className="btn btn-success text-light">המשך</button>
      </div>
      </form>
    </div>
  );
}
