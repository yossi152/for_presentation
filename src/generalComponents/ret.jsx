import { Routes, Route} from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import convertDateFormat from '../generalComponents/ConvertDate';

import { CarDetails } from "../VehicleReturnPages/CarDetails";
import { KilometersReturn } from "../VehicleReturnPages/KilometersReturn";
import { TollRoads } from "../VehicleReturnPages/TollRoads";
import { Expenses } from "../VehicleReturnPages/Expenses";
import { AccidentDamageReports } from "../VehicleReturnPages/AccidentDamageReports";
import { Payment } from "../VehicleReturnPages/Payment";
import { ReturnConfirmationDetails } from "../VehicleReturnPages/ReturnConfirmationDetails";
import { Thanks } from "../VehicleReturnPages/Thanks";


export function Ret () {
    const [allData, setAllData] = useState();
    const dataChanges = useRef({rentals: {actual_return_time: '', return_kilometers: ''}, orders: {} });
    // https://11cc3d91-9a67-481c-af6b-c497bb810174.mock.pstmn.io/
    // 
    useEffect(() => {
    fetch(window.baseSever + '/api/retAllData')
        .then(response => response.json())
        .then(data => {
        setAllData(data)
        });


    }, []);

    if (!(allData && allData.messages)) {
    return <div>Loading...</div>;
    }

    function getDatesInRange(startDate, endDate) {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    while (start <= end) {
        const formattedDate = `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear()}`;
        dates.push(formattedDate);
        start.setDate(start.getDate() + 1);
    }
    
    return dates;
    }

    const handleDateTimeRet = (dateTime) => {
        dataChanges.current.rentals.actual_return_time = dateTime.time;
        dataChanges.current.orders.end_date = dateTime.date;

        setAllData((prevAllData)=>{
          let newAllData = {...prevAllData};
          newAllData = {
            ...newAllData,
            actual_return_time: dateTime.time,
            end_date: dateTime.date
          };
          return newAllData;
        })
        console.log(dataChanges.current)
    }

    const handleKilometersReturn = (kilometers) => {
        dataChanges.current.rentals.return_kilometers = kilometers;
        
        setAllData((prevAllData)=>{
          let newAllData = {...prevAllData};
          newAllData = {
            ...newAllData,
            return_kilometers: kilometers
          };
          return newAllData;
        })
        console.log(dataChanges.current)
    };

    const handleTollRoads = (tollRoads) => {
        let tollRoadsUse = [{}];
        for (let road in tollRoads) {
            road = tollRoads[road];
            let road_id = Object.keys(road)[0]
                if (road_id !== "3") {
                    if (Object.keys(road[road_id]["journeyCounts"]).length !== 0)
                        for (let date_use in road[road_id].journeyCounts) {
                            let road_use = {
                                road_id: road_id,
                                use_date: convertDateFormat(date_use),
                                numbers_of_uses: road[road_id].journeyCounts[date_use]
                            }
                            tollRoadsUse.push(road_use);
                        }
                }
                if (road_id === "3") {
                    if (Object.keys(road[road_id]["journeyCounts"]).length !== 0)
                        for (let date_use in road[road_id].journeyCounts) {
                            let road_use = {
                                road_id: road_id,
                                use_date: convertDateFormat(date_use),
                                numbers_of_uses: road[road_id].journeyCounts[date_use],
                                price: road[road_id].fastLanePrices[date_use]
                            }
                            tollRoadsUse.push(road_use);
                        }
                }
            
        }
        
        dataChanges.current.toll_roads = tollRoadsUse;
        
        setAllData((prevAllData)=>{
          let newAllData = {...prevAllData};
          newAllData = {
            ...newAllData,
            tollRoads: tollRoadsUse
          };
          return newAllData;
        })

        console.log(dataChanges.current)
    }

    const handleExpenses = (expenses) => {
        console.log(expenses)
    
        setAllData((prevAllData)=>{
            let newAllData = {...prevAllData};
            newAllData = {
              ...newAllData,
              expenses: expenses
            };
            return newAllData;
          })
    }

    const submitProblems = (problems) => {
        dataChanges.current = {
            ...dataChanges.current, 
            faults: problems.problems,
            fines: problems.reports,
            accident: problems.accident 
        }
        console.log(dataChanges.current)

        setAllData((prevAllData)=>{
            let newAllData = {...prevAllData};
            newAllData = {
              ...newAllData,
              faults: problems.problems,
              fines: problems.reports,
              accident: problems.accident 
            };
            return newAllData;
          })
    }

    const paymentSubmit = (payment) => {
        dataChanges.current.invoice_recipient = payment
        console.log(dataChanges.current)
    }

    const handleConfirmation = () => {
      return new Promise((resolve, reject) => {
    
        console.log(dataChanges.current);
        console.log(allData);
    
        fetch(window.baseSever + '/api/retAllData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataChanges.current),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.update) {
              console.log('update successfully!!');
              resolve(true);
            } else {
              reject(new Error('Update failed'));
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            reject(error);
          });
      });
    };
    
    
    return(
        <>
        
            <Routes>
                <Route path="CarDetails" element={<CarDetails pageNum={1} role = {allData.permissions} carType={allData.car_type_description} carNum={allData.car_license_number} startDate={allData.start_date} pickUpTime={allData.pickup_time} phone={allData.Travel_Phone} currentDate={allData.current_date} currentTime={allData.current_time} handleDateTimeRet={handleDateTimeRet}/>}></Route>
                <Route path="KilometersReturn" element={<KilometersReturn pageNum={2} lastKilometers={allData.pickup_kilometers} messages={allData.messages} onKilometersReturnSubmit={handleKilometersReturn} role={allData.permissions}/>} ></Route>
                <Route path="TollRoads" element={<TollRoads pageNum={4} role = {allData.permissions} categories={allData.toll_roads_types} rentalDates={getDatesInRange(allData.start_date, allData.end_date)} handleSubmitData={handleTollRoads} />}></Route>
                <Route path="Expenses" element={<Expenses pageNum={5} expenseOptions={allData.expense_types} handleExpenses={handleExpenses} />}></Route>
                <Route path="AccidentDamageReports" element={<AccidentDamageReports pageNum={6} role = {allData.permissions} currentDate={allData.current_date} submitProblems={submitProblems} />}></Route>
                <Route path="Payment" element={<Payment pageNum={7} personalDetails={{"FirstName": allData.first_name, "LastName": allData.last_name, "ID":allData.id}} paymentSubmit={paymentSubmit} />}></Route>
                <Route path="ReturnConfirmationDetails" element={<ReturnConfirmationDetails pageNum={8} allData={allData} handleConfirmation={handleConfirmation} isOrder={allData.is_rental} role={allData.permissions}/>}></Route>
                <Route path="Thanks" element={<Thanks pageNum={9} />}></Route>
            </Routes>

            <div className="mt-5 text-center">קוד נהג אישי: {allData.peronal_driver_code}</div>

        </>
    )
}