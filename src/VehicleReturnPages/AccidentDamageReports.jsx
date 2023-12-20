import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReturnProgressBar } from './ReturnProgessCar';
import { Description } from '../generalComponents/Description';
import { FaTrash } from 'react-icons/fa';

export function AccidentDamageReports({ pageNum, currentDate, submitProblems, role }) {
  const [problems, setProblems] = useState('');
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState('');
  const [reportData, setReportData] = useState([{ type: 'משטרה', date: currentDate, amount: '', description: '' }]);
  const [accident, setAccident] = useState('');
  const [accidentDescription, setAccidentDescription] = useState('');
  const [accidentDate, setAccidentDate] = useState(currentDate);
  const [casualties, setCasualties] = useState('');
  const [casualtiesDescription, setCasualtiesDescription] = useState('');
  
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);

    const isProblems = problems === 'no' || description !== '';
    const isReports = reports === 'no' || (reportData.length > 0 && reportData.every(report => report.type !== '' && report.date !== '' && report.amount !== ''));
    const isAccidents =
      accident === 'no' || (accidentDate !== '' && accidentDescription !== '' && (casualties === 'no' || casualtiesDescription !== ''));
    if (isAccidents && isProblems && isReports) {
      setChecked(true);
    }
  }, [accident, accidentDate, accidentDescription, casualties, casualtiesDescription, description, problems, reportData, reports]);

  const handleDeleteReport = (index, e) => {
    e.preventDefault();
    if (reportData.length ===1)
      setReportData([{ type: 'משטרה', date: currentDate, amount: '', description: '' }])
    else
      setReportData(prevData => {
        const newData = [...prevData];
        newData.splice(index, 1);
        return newData;
      });
  };  

  const handleKeyPress = (event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }


  const handleSubmit = () => {
    let submitData = {};
    if (problems === "yes")
      submitData.problems = description;
    if (reports === "yes")
      submitData.reports = reportData;
    if (accident === "yes")
      submitData.accident = {"accidentDescription": accidentDescription, "accidentDate": accidentDate}
    if (casualties === "yes")
      submitData.accident = {...submitData.accident, "injuries": casualtiesDescription}
    
    submitProblems(submitData);
  }

  return (

    <div>
      <ReturnProgressBar pageNum={pageNum} />
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div>
          <div>האם היו תקלות/בעיות?</div>
          <label><input type="radio" name="problems" value="yes" checked={problems === 'yes'} onChange={(e) => setProblems(e.target.value)} /> כן</label><br />
          <label><input type="radio" name="problems" value="no" checked={problems === 'no'} onChange={(e) => setProblems(e.target.value)} /> לא</label>
        </div>
      
      {problems === 'yes' && (
        <div>
          <Description
              description={description}
              side="problems"
              index="0"
              handleDescriptionChange={(index, e) => setDescription(e.target.value)}
              postPicture={()=>{}}
              placeholder={"תאר את התקלה / הבעיה"}
            />
        </div>
      )}
      <div className='mt-2'>
        <div>האם היו דו"חות?</div>
        <label><input type="radio" name="reports" value="yes" checked={reports === 'yes'} onChange={(e) => setReports(e.target.value)} /> כן </label><br />
        <label><input type="radio" name="reports" value="no" checked={reports === 'no'} onChange={(e) => setReports(e.target.value)} /> לא</label>
      </div>

      {reports === 'yes' && (
          <>
            {reportData.map((report, index) => (
              <div className="border border-primary rounded p-2 mb-2" key={index}>
                <label>סוג הדו"ח:</label>
                <select
                  className="mb-2"
                  value={report.type}
                  onChange={e => {
                    const newReportData = [...reportData];
                    newReportData[index].type = e.target.value;
                    setReportData(newReportData);
                  }}>
                  <option value="משטרה">משטרה</option>
                  <option value="חניה">חניה</option>
                </select>

                <label>תאריך הדו"ח:</label>
                <input
                  className="form-control"
                  type="date"
                  value={report.date}
                  max={currentDate}
                  onChange={e => {
                    const newReportData = [...reportData];
                    newReportData[index].date = e.target.value;
                    setReportData(newReportData);
                  }}
                />

                <label>סכום הדו"ח:</label>
                <input
                  className="form-control"
                  type="number"
                  min = "0"
                  onKeyDown={handleKeyPress}
                  value={report.amount}
                  onChange={e => {
                    const newReportData = [...reportData];
                    newReportData[index].amount = e.target.value;
                    setReportData(newReportData);
                  }}
                />

                <Description
                  description={report.description}
                  side="reports"
                  index={index}
                  handleDescriptionChange={(index, e) => {
                    const newReportData = [...reportData];
                    newReportData[index].description = e.target.value;
                    setReportData(newReportData);
                  }}
                  postPicture={() => {}}
                  placeholder={'תאר את הדו"ח'}
                />

                <button
                  className="btn btn-outline-danger mb-1"
                  onClick={e => handleDeleteReport(index, e)}>
                  מחק דו"ח
                  <FaTrash className="trash-icon" />
                </button>
              </div>
            ))}
          <button 
            className={"btn btn-" + ((reportData[reportData.length-1].date && reportData[reportData.length-1].amount) ? "success" : "secondary")} 
            disabled={!(reportData[reportData.length-1].date && reportData[reportData.length-1].amount)} 
            onClick={(e)=> {
                e.preventDefault();
                setReportData((prev)=>([...prev, { type: 'משטרה', date: currentDate, amount: '', description: '' }]))
              }}>
              הוסף דו"ח +
          </button>
        </>
      
      )}

      <div className='mt-2'>
        <div>האם נגרם נזק/הייתה תאונה?</div>
        <label><input type="radio" name="accident" value="yes" checked={accident === 'yes'} onChange={(e) => setAccident(e.target.value)} /> כן</label><br />
        <label><input type="radio" name="accident" value="no" checked={accident === 'no'} onChange={(e) => setAccident(e.target.value)} /> לא</label>
      </div>

      {accident === 'yes' && (
        <div className="border border-primary rounded p-2 mb-2">
          <label>תאריך התאונה:</label>
            <input className='form-control' max={currentDate} type="date" value={accidentDate} onChange={(e) => setAccidentDate(e.target.value)} />
            <Description
              description={accidentDescription}
              side="accidents"
              index="0"
              handleDescriptionChange={(index, e) => setAccidentDescription(e.target.value)}
              postPicture={() => {}}
              placeholder={'תיאור התאונה'}
            />

            <div> האם היו נפגעים בגוף?</div>
        <label><input type="radio" name="casualties" value="yes" onChange={(e) => setCasualties(e.target.value)}/> כן</label><br />
        <label><input type="radio" name="casualties" value="no" onChange={(e) => setCasualties(e.target.value)}/> לא</label>
        {casualties === 'yes' && (
          <div>
            <Description
              description={casualtiesDescription}
              side="casualties"
              index="0"
              handleDescriptionChange={(index, e) => setCasualtiesDescription(e.target.value)}
              postPicture={() => {}}
              placeholder={'תיאור הנפגעים'}
            />
          </div>
        )}        
        </div>
      )}

      
      
    
    <div className="d-flex justify-content-between">

    <button className="btn">
      <Link to={"/ret/" + (role.includes("Administrative driver") ? "TollRoads" : "Expenses")} className="text-dark">חזור</Link>
    </button>
    
    <button 
      onClick={handleSubmit}
      className={"btn btn-" + (checked ? "success" : "secondary")} 
      disabled={!checked}>
    <Link to={"/ret/" + (role.includes("Administrative driver") ? "ReturnConfirmationDetails" : "Payment")}className="text-light">המשך</Link>
    </button>
    </div>
    </form>

      </div>
    )
  }

