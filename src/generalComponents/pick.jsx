import { Routes, Route} from "react-router-dom"
import { useState, useEffect, useRef } from "react";

import { OrderDetails } from "../pages/OrderDetails";
import {Conditions} from "../pages/Conditions"
import {CarPhoto} from "../pages/CarPhoto"
import {EndPage } from "../pages/EndPage"
import { HealthDeclaration } from "../pages/IsHealth"
import { CheckCard } from "../pages/CheckCard"
import ExistCard from "../pages/CreditCard"
import { PersonalInformation } from "../pages/PersonalInformation";
import { CarPicking } from "../pages/CarPicking";
import { CarDamage } from "../pages/CarDamage";
import { Kilometers } from "../pages/Kilometers";
import { GuidingVideo } from "../pages/GuidingVideo";
import { GeneralInstructions } from "../pages/GeneralInstructions";
import { ConfirmationDetails } from "../pages/ConfirmationDetails";
import { AdministrativeLicenseNumber } from "../pages/AdministrativeLicenseNumber";









export function Pick () {
    const [allData, setAllData] = useState();
    const dataChanges = useRef({users: {}, rentals: {}, orders: {} });
    
     
      useEffect(() => {
        console.log(window.baseSever)
        fetch(window.baseSever + '/api/pickAllData')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setAllData(data)
          });
      
        }, []);
      
        if (!(allData && allData.messages)) {
          return <div>Loading...</div>;
        }
    
      const handleCarNum = (value) => {
        if (value !== allData.car_license_number)
          dataChanges.current.rentals.car_license_number = value;
        
        setAllData((prevAllData)=>{
          let newAllData = {...prevAllData};
          newAllData = {
            ...newAllData,
            car_license_number: value
          };
          return newAllData;
        })
        console.log(dataChanges.current)
        console.log(allData)
      }
    
      const handleHealthDeclaration = () => {
        setAllData((prevAllData) => ({
          ...prevAllData,
          health_declaration_validity: allData.current_year
        }));

        dataChanges.current.users.health_declaration_validity = allData.current_year;
        console.log(dataChanges.current)
        console.log(allData)
      };

      const handleCardChanges = (formData) => {
        dataChanges.current.rentals.credit_card_change_num = formData.numbers;
        dataChanges.current.rentals.credit_card_change_validity = formData.experience;
        console.log(dataChanges.current)
        console.log(allData)
        
      }
    
      const handlePersonalInformation = (personalInformation) => {
        const personalInformationRecived = {
          first_name: allData.first_name, 
          last_name: allData.last_name, 
          id: allData.id, 
          phone: allData.phone, 
          drivers_license_validity: allData.drivers_license_validity, 
          email: allData.email, 
          address: allData.address, 
          city: allData.city, 
          zip: allData.zip
        }

        for (let key in personalInformation)
          if (personalInformation[key] !== personalInformationRecived[key]) {
            dataChanges.current.users[key] = personalInformation[key];

            setAllData((prevAllData) => ({
              ...prevAllData,
              [key]: personalInformation[key]
            }));
          }
        console.log(dataChanges.current)
        console.log(allData)
        };
    
      const handleCarPicking = (data) => {
        const orders = {
          start_date: data.start_date, 
          end_date: data.end_date
        };

        for (let key in orders) {
          if (allData[key] !== orders[key]) {
            dataChanges.current.orders[key] = data[key];

            setAllData((prevAllData) => ({
              ...prevAllData,
              [key]: data[key]
            }));
          }
        }

        if (data.pickup_time !== allData.pickup_time){
          dataChanges.current.rentals.pickup_time = data.pickup_time;

          setAllData((prevAllData) => ({
            ...prevAllData,
            pickup_time: data.pickup_time
          }))
        }

        dataChanges.current.rentals.estimated_return_time = data.estimated_return_time;
        setAllData((prevAllData) => ({
          ...prevAllData,
          estimated_return_time: data.estimated_return_time
        }));
        console.log(dataChanges.current)
        console.log(allData)
      };
    
      const handleKilometers = (kilometers) => {
        dataChanges.current.rentals.pickup_kilometers = kilometers;
        setAllData((prevAllData) => ({
          ...prevAllData,
          kilometers: kilometers
        }));
        console.log(dataChanges.current)
        console.log(allData)
      };

      const handleConfirmation = () => {
        return new Promise((resolve, reject) => {
        if (!dataChanges.current.rentals.car_license_number)
          dataChanges.current.rentals.car_license_number = allData.car_license_number;
        if (!dataChanges.current.rentals.driver_id)
          dataChanges.current.rentals.driver_id = allData.id;
        if (!dataChanges.current.rentals.order_id)
          dataChanges.current.rentals.order_id = allData.order_id;
        if (!dataChanges.current.rentals.pickup_time)
          dataChanges.current.rentals.pickup_time = allData.current_time;
    
        console.log(dataChanges.current);
        console.log(allData);
    
        fetch(window.baseSever + '/api/pickAllData', {
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
    
    return (
        <>
            <Routes>
                <Route path="OrderDetails" element={<OrderDetails pageNum={1} role={allData.permissions} details={{orderer_name: allData.orderer_name, start_date: allData.start_date, order_id: allData.order_id, end_date: allData.end_date, numbers_of_days: allData.numbers_of_days, price_per_day: allData.price_per_day}} phone={allData.travel_phone}/>}/>
                <Route path="Conditions" element={<Conditions pageNum={2} handleCarNum={handleCarNum} carNum={allData.car_license_number} allCars={["112123"]} isOrder={allData.is_rental}/>}></Route>
                <Route path="IsHealth" element={<HealthDeclaration pageNum={3} role={allData.permissions} healthDeclarationStatus={allData.health_declaration_validity=== Number(allData.current_year)} personalDetails={{first_name: allData.first_name, last_name: allData.last_name, id: allData.id}} handleHealthDeclaration={handleHealthDeclaration}/>}></Route>
                <Route path="CheckCard" element={<CheckCard  pageNum={4} healthDeclarationStatus={allData.health_declaration_validity=== Number(allData.current_year)} cardExist={allData.card_exist && allData.card_validity} creditCardMessage={allData.messages.CreditCardMessage} travelPhone={allData.travel_phone}/>}></Route>      
                <Route path="ExistCard" element={<ExistCard  pageNum={4} healthDeclarationStatus={allData.health_declaration_validity=== Number(allData.current_year)} notVerifiedCardMessage={allData.messages.NotVerifiedCardMessage} handleCardChanges={handleCardChanges}/>}></Route>      
                <Route path="PersonalInformation" element={<PersonalInformation pageNum={5} role={allData.permissions} personalInformationRecived={{first_name: allData.first_name, last_name: allData.last_name, id: allData.id, phone: allData.phone, drivers_license_validity: allData.drivers_license_validity, email: allData.email, address: allData.address, city: allData.city, zip: allData.zip}} handlePersonalInformation={handlePersonalInformation}/>}></Route>
                <Route path="CarPicking" element={<CarPicking pageNum={6} carPicking={{pickup_time: allData.current_time, start_date: allData.current_date, end_date: allData.end_date}} handleCarPicking={handleCarPicking}/>}></Route>
                <Route path="CarPhoto" element={<CarPhoto pageNum={7} role={allData.permissions} />}></Route>
                <Route path="CarDamage" element={<CarDamage pageNum={8}/>}></Route>
                <Route path="Kilometers" element={<Kilometers pageNum={9} role={allData.permissions}  lastKilometers={allData.return_kilometers} message={allData.messages.NotVerifiedKilometersMessage} handleKilometers={handleKilometers} />}></Route>
                <Route path="GuidingVideo" element={<GuidingVideo />}></Route>
                <Route path="GeneralInstructions" element={<GeneralInstructions pageNum={11} guidelines={allData.messages.Guidelines} />}></Route>
                <Route path="ConfirmationDetails" element={<ConfirmationDetails role={allData.permissions} pageNum={12} orderDetails={{first_name: allData.first_name, last_name: allData.last_name, car_license_number: allData.car_license_number}} carPicking={{ start_date: allData.start_date, end_date: allData.end_date, estimated_return_time: allData.estimated_return_time, pickup_time: allData.pickup_time}} handleConfirmation={handleConfirmation}/>}></Route>
                <Route path="EndPage" element={<EndPage pageNum={13} />}></Route>
                <Route path="AdministrativeLicenseNumber" element={<AdministrativeLicenseNumber handleCarNum={handleCarNum}/>}></Route>
            </Routes>       

            <div className="mt-5 text-center">קוד נהג אישי: {allData.peronal_driver_code}</div>
        </>

    )
}