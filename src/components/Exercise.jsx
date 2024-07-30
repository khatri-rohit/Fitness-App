import { Circle } from 'rc-progress'
import { useEffect, useState } from 'react';
import ShowExercise from './ShowExercise';
import { firestore, useFireabse } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const Exercise = () => {
    const [show, setShow] = useState(false);
    const [precent, setPercent] = useState(0);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [exercises, setExercises] = useState([]);

    const { user } = useFireabse();
    const { email } = user;


    useEffect(() => {

        (async () => {
            try {
                const docRef = doc(firestore, "users", email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const exer = docSnap.data().exer;
                    if (exer !== undefined)
                        setExercises(exer);
                    console.log("Exericse Fetched");
                }
                else {
                    console.log("Goal Exercise is Not Fetched Properly");
                }
            } catch (error) {
                console.log("Error Occured While Fetching Goal Exercise\n" + error);
            }
        })()

        // Empty Exercise Every New Day
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight - now;

        const timeoutId = setTimeout(() => {
            setExercises([]);
            console.log("Exercises reset at midnight");
        }, timeUntilMidnight);

        return () => clearTimeout(timeoutId);

    }, [email])

    useEffect(() => {
        var value = 0;
        const checkExe = [...exercises];
        for (const item in checkExe) {
            if (checkExe[item].check)
                value++;
        }
        setTotal(checkExe.length)
        setCount(value);
        setPercent(Math.floor((count / total) * 100));
    }, [count, exercises, total])

    return (
        <>
            {show &&
                (<div className="container absolute top-5 left-[25%] z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit md:w-1/2 md:p-8 p-5 rounded-3xl">
                    <ShowExercise
                        setShow={setShow}
                        setTotal={setTotal}
                        setExercises={setExercises}
                        exercises={exercises}
                    />
                </div>)
            }
            <div className="mt-5 p-3 rounded-lg drop-shadow-xl bg-red-500">
                <p className="text-gray-100 font-normal">
                    Exercise
                </p>
                <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => setShow(prev => !prev)}>
                    <div className="mb-2">
                        <p className="text-2xl text-white font-medium drop-shadow-xl my-5">
                            Exercises
                        </p>
                    </div>
                    <div className="w-[30%] flex items-center relative">
                        <Circle
                            percent={precent}
                            strokeColor="blue"
                            strokeWidth={5}
                            strokeLinecap="round"
                            trailWidth={3}
                            trailColor="white"
                        />
                        <span className="text-white absolute md:inset-x-3 inset-x-7 lg:inset-x-16 md:text-3xl text-md">
                            {count}/
                            {total}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Exercise;
