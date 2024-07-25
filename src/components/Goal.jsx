/* eslint-disable no-unused-vars */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore, useFireabse } from "../context/Firebase";

const Goal = () => {
    const { user } = useFireabse()
    const { email } = user

    const [goal, setGoal] = useState("");

    useEffect(() => {
        (async () => {
            const docRef = doc(firestore, "users", email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const muscle = docSnap.data().gainMuscle;
                const goal = muscle ? "Gain Muscle & Strenght" : "Lose Weight & Body Fat";
                setGoal(goal);
            }
            else {
                console.log("Data Don't Exist");
            }
        })()
    });

    return (
        <>
            <div className="mt-5 p-3 rounded-br-xl drop-shadow-xl bg-slate-500">
                <div className="flex items-center mb-2 ">
                    <p className="text-2xl text-white font-medium">
                        Your Goal
                    </p>
                    <p className="text-xl text-white font-medium">
                        {goal}
                    </p>

                </div>
            </div >
        </>
    )
};

export default Goal;
