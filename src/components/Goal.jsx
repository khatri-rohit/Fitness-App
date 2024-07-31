/* eslint-disable no-unused-vars */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore, useFireabse } from "../context/Firebase";

const Goal = () => {
    const [goal, setGoal] = useState("");
    
    const { user } = useFireabse();
    const { email } = user;

    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(firestore, "users", email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const muscle = docSnap.data().gainMuscle;
                    const goal = muscle ? "Gain Muscle & Strenght" : "Lose Weight & Body Fat";
                    setGoal(goal);
                }
                else {
                    console.log("Goal is Not Fetched Properly");
                }
            } catch (error) {
                console.log("Error Occured While Fetching Goal\n" + error);
            }
        })()
    });

    return (
        <>
            <div className="mt-5 p-3 rounded-xl drop-shadow-xl bg-slate-500">
                <div className="mb-2">
                    <p className="text-gray-200 font-normal">
                        Your Goal
                    </p>
                    <p className="text-xl md:text-2xl text-white font-medium drop-shadow-xl my-5">
                        {goal}
                    </p>
                </div>
            </div>
        </>
    )
};

export default Goal;
