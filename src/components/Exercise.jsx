import { Circle } from 'rc-progress'
import { useEffect, useState } from 'react';
import ShowExercise from './ShowExercise';
import { firestore, useFireabse } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GiCheckMark } from 'react-icons/gi';

const Exercise = () => {
    const [show, setShow] = useState(false);
    const [percent, setPercent] = useState(0);
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
                <div className="flex justify-between items-center p-3 cursor-pointer"
                    onClick={() => setShow(prev => !prev)}>
                    <div className="mb-2 mx-3">
                        <p className="text-2xl text-white font-medium drop-shadow-xl my-5">
                            Exercises
                        </p>
                    </div>
                    <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 drop-shadow-lg">
                        <Circle
                            percent={percent}
                            strokeColor="#ef4648"
                            strokeWidth={5}
                            strokeLinecap="round"
                            trailWidth={3}
                            trailColor="white"
                            className="absolute"
                        />
                        <span className="absolute flex items-center justify-center text-white text-md md:text-2xl font-medium">
                            {total === 0 ? (
                                <p className='text-xs md:text-base'>Add Exercise</p>
                            ) : count === total ? (
                                <GiCheckMark className="text-2xl md:text-3xl" />
                            ) : (
                                `${count}/${total}`
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Exercise;
