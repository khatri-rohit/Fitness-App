/* eslint-disable no-unused-vars */
import '../styles/Popup.css'
import Todo from "../components/todo";
import Weather from "../components/Weather";
import Goal from '../components/Goal';
import { useEffect, useState } from 'react';
import { firestore, useFireabse } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Exercise from '../components/Exercise';

const DashBoard = () => {

  const [days, setDays] = useState(1);
  const { user } = useFireabse();
  const { email } = user;

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(firestore, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const created = docSnap.data().date
          const accountCreationDateInSeconds = created.seconds;
          // Convert account creation date to milliseconds
          const accountCreationDate = new Date(accountCreationDateInSeconds * 1000);
          // Calculate the difference in milliseconds
          const differenceInMilliseconds = (new Date()) - accountCreationDate;
          // Convert milliseconds to days
          const millisecondsPerDay = 1000 * 60 * 60 * 24;
          const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);
          setDays(differenceInDays + 1)
        } else {
          console.log("No DashBoard Data Exists");
        }
      } catch (error) {
        console.log("UnExpected Error Accurs in Dashboard\n" + error);
      }
    })()
  }, [])

  return (
    <>
      <div className="md:container mx-auto md:p-2 p-5 h-[110vh] md:h-[90vh]">
        <div className="flex justify-between">
          <div className="">
            <span className="text-lg text-gray-400">Primary</span>
            <p className="text-2xl mx-4 font-medium">Dashboard</p>
          </div>
          <p className="md:text-2xl text-xl mx-4 font-medium">
            Day {days}
          </p>
        </div>
        <div className="res-grid items-start">

          <div className="todo my-3 mx-3">
            <Goal />
          </div>

          <div className="my-3">
            <Weather />
          </div>

          <div className="todo my-3 mx-3">
            <Exercise />
          </div>

          <div className="todo my-3 mx-3">
            <Todo />
          </div>

        </div>
      </div>
    </>
  )
};

export default DashBoard;
