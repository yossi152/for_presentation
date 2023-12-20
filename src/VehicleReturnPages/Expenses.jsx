import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReturnProgressBar } from './ReturnProgessCar';
import { MdAddAPhoto } from "react-icons/md";

export function Expenses({ pageNum, expenseOptions, handleExpenses }) {
  const [expensesList, setExpensesList] = useState([]);
  const [expenseType, setExpenseType] = useState('דלק');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [invoicing, setInvoicing] = useState('');
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);



  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUploadImage = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setInvoicing(objectUrl);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpensesList = expensesList.filter((_, i) => i !== index);
    setExpensesList(updatedExpensesList);
  };

  const handleKeyPress = (event) => {
    const allowedKeys = ["-", ".", "+"];

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = {
      expenseType,
      note,
      quantity,
      amount
    };
    setExpensesList([...expensesList, newExpense]);
    setExpenseAdded(true);
    setNote('');
    setQuantity('');
    setAmount('');
    setInvoicing('');
  };

  return (
    <div>
      <ReturnProgressBar pageNum={pageNum} />
      <h1 className='mb-3'>הוצאות</h1>

      {expensesList.length > 0 && (
        <div>
          <h2>הוצאות קודמות:</h2>
          {expensesList.map((expense, index) => (
            <div key={index} className='border border-primary rounded p-2 mb-1'>
              <p>הוצאה מספר {index + 1}:</p>
              <p>סוג ההוצאה: {expense.expenseType}</p>
              <p>כמות: {expense.quantity}</p>
              <p>סכום: {expense.amount}</p>
              <p>הערה: {expense.note}</p>
              <button
                style={{ marginRight: "15%", marginLeft: "15%" }}
                className='btn btn-outline-secondary'
                onClick={() => handleDeleteExpense(index)}>
                מחק הוצאה
              </button>
            </div>
          ))}
        </div>
      )}
        <div>
          <label><span style={{ fontSize: "0.8rem", color: "red" }}>*</span> סוג ההוצאה:</label>
          <select className='custom-select' name="expenseType" id="expenseType" onChange={handleExpenseTypeChange}>
            {expenseOptions.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      <form className='mt-2 border border-primary rounded p-2 mb-1' onSubmit={handleSubmit}>
        <label><span style={{ fontSize: "0.8rem", color: "red" }}>*</span> הערה:</label>
        <input className="form-control" type="text" value={note} onChange={handleNoteChange} />

        <label> כמות:</label>
        <input className="form-control" type="number" min="0" value={quantity} onChange={handleQuantityChange} onKeyDown={handleKeyPress} />

        <label><span style={{ fontSize: "0.8rem", color: "red" }}>*</span> סכום:</label>
        <input className="form-control" type="number" min="0" value={amount} onChange={handleAmountChange} onKeyDown={handleKeyPress} />


        <div>
        <div style={{ display: 'inline-block' }} className="mt-4 mb-2">
  <label>
    <span> 
      {!hasClicked && <><span style={{ fontSize: "0.8rem", color: "red" }}>*</span> צלם חשבונית</>}
      <MdAddAPhoto className="camera-icon" />
    </span>
    <input
      className="pick-file"
      type="file"
      name="invoice"
      accept="image/*"
      onClick={() => setHasClicked(true)}
      onChange={(e) => handleUploadImage(e)} />
  </label>
  {invoicing && (
    <div className="mt-2">
      <img src={invoicing} alt="חשבונית" height={100} />
      <button
        className="btn btn-outline-danger"
        onClick={() => setInvoicing('')}
      >
        מחק חשבונית
      </button>
    </div>
  )}
</div>
          <button
            className={"btn btn-" + (amount && note && invoicing ? "primary" : "secondary")}
            disabled={!(amount && note && invoicing)}> הוסף הוצאה +
          </button>
        </div>
      </form>

      <div className="mt-3 d-flex justify-content-between">
        <button className="btn">
          <Link to="/ret/TollRoads" className="text-dark">
            חזור
          </Link>
        </button>
        <button
          disabled={!(!amount && !note && !invoicing)}
          onClick={() => { handleExpenses(expensesList) }}
          className={"btn btn-" + ((!amount && !note && !invoicing) ? "success" : "secondary")}
        >
          <Link className='text-light'
            to='/ret/AccidentDamageReports'
          >
            המשך
          </Link>
        </button>
      </div>
    </div>
  );
}
