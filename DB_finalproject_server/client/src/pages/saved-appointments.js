import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedAppointments = () => {
  const [yourAppointments, setYourAppointments] = useState([]); 
  const [MyStore, setMyStore] = useState([]); 
  const userID = useGetUserID();

  useEffect(() => {
    const fetchYourAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/appointments/client_appointments");


        const response_store_id = await axios.get("http://localhost:3001/appointments/");
        console.log(response.data);
        // console.log(response_store_id.data[0].userOwner);
        // console.log(response_store_id.data[0]._id);

        const filteredStores = response_store_id.data.filter(store =>
          store.userOwner === userID);
        setMyStore(filteredStores);
        console.log(filteredStores);
        // console.log(filteredStores[0]._id);


        const filteredAppointments = response.data.filter(appointment => 
          filteredStores.some(store => store._id === appointment.appointmentInputs.selectedID));
        setYourAppointments(filteredAppointments);
        
        


      } catch (err) {
        console.log(err);
      }
    };
    
    fetchYourAppointments();
  }, [userID]);

  // 使用另一个 useEffect 来观察 yourAppointments 状态的变化
  useEffect(() => {
    // console.log(yourAppointments);
  }, [yourAppointments]);
    




    return (
      <div>
        <h1>Clients' Appointments</h1>
        <ul>
          {yourAppointments.map((appointment) => (
            <li key={appointment._id}>
              <div>
                <h2>{appointment._id}</h2>
                <table>
                  <tbody>
                    {Object.entries(appointment.appointmentInputs).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
    
};
