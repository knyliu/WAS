import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [yourStores, setYourStores] = useState([]); 
  const userID = useGetUserID();

  console.log("yourStores:");
  console.log(yourStores);


  useEffect(() => {
    


    const fetchYourStores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/appointments");

          const filteredStores = response.data.filter(appointment => userID === appointment.userOwner);
          setYourStores(filteredStores);
      } catch (err) {
        console.log(err);
      }
    };

    fetchYourStores();
  }, [userID]); 


  console.log("your new Stores:");
  console.log(yourStores);


  return (
    <div>
      <h1>Your Stores</h1>
      <ul>
        {yourStores.map((appointment) => ( 
          <li key={appointment._id}>
            <div>
              <h2>{appointment.name}</h2>
            </div>
            <p>{appointment.description}</p>
            <img src={appointment.imageUrl} alt={appointment.name} />
            <p>Appointment Time: {appointment.appointmentTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
