/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Abdomen, Body, LowerBody, UpperBody } from '../data'
import { firestore, useFireabse } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

const ShowExercise = () => {
    const [goal, setGoal] = useState("");
    const [category, setCategory] = useState("");
    const [bodyPart, setBodyPart] = useState("Upper Body");
    // 
    const [showCate, setShowCate] = useState(false);
    const [body, setBody] = useState(false);
    const [exercise, setExercise] = useState(false);
    // 
    const options = ["Gain Muscle & Strenght", "Lose Weight & Body Fat"];
    const bodypart = ["Upper Body", "Abdomin", "Lower Body"];
    const [selectedBody, setSelectedBody] = useState(bodypart[0]);
    const [exercises, setExercises] = useState([]);

    const { user } = useFireabse();
    const { email } = user;


    const handleEx = select => {
        const newArray = [...exercises, select];
        setExercises(exercises.filter(exer => exer !== select));
    }


    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(firestore, "users", email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const muscle = docSnap.data().gainMuscle;
                    const goal = muscle ? "Gain Muscle & Strenght" : "Lose Weight & Body Fat";
                    setGoal(goal);
                    setCategory(goal);
                }
                else {
                    console.log("Goal is Not Fetched Properly");
                }
            } catch (error) {
                console.log("Error Occured While Fetching Goal\n" + error);
            }
        })()
    }, [])

    return (
        <>
            <div className="flex justify-center">
                <div className="w-1/2">
                    {goal}
                    <div className="p-2">
                        <p className="text-xl font-medium">
                            Choose Exercises
                        </p>
                        <div className="p-2">

                            <div className="my-2 w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setShowCate(prev => !prev)}>
                                <p className="text-gray-500">
                                    {category}
                                </p>
                                {
                                    showCate
                                        ? <FaChevronUp /> : <FaChevronDown />
                                }
                            </div>

                            {showCate && (
                                <div className="w-2/3 border-2" >
                                    {options.map((option, _) => (
                                        <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                            key={_}
                                            onClick={() => {
                                                setCategory(option);
                                                setShowCate(false);
                                            }}>
                                            {option}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <div className="my-2 md:mt-10 w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setBody(prev => !prev)}>
                                <p className="text-gray-500">
                                    {selectedBody}
                                </p>
                                {
                                    body
                                        ? <FaChevronUp /> : <FaChevronDown />
                                }
                            </div>
                            {body && (
                                <div className="w-2/3 border-2" >
                                    {bodypart.map((option, _) => (
                                        <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                            key={_}
                                            onClick={() => {
                                                setSelectedBody(option);
                                                setBody(false);
                                            }}>
                                            {option}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <div className="my-2 md:mt-10 w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setExercise(prev => !prev)}>
                                <p className="text-gray-500">
                                    Choose Exercise
                                </p>
                                {
                                    exercise
                                        ? <FaChevronUp /> : <FaChevronDown />
                                }
                            </div>
                            {exercise && (
                                <div className="w-2/3 border-2" >
                                    {selectedBody === "Upper Body" ? (
                                        <>
                                            {UpperBody.map((exer, _) => (
                                                <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                    onClick={() => handleEx(exer)}
                                                    key={_}
                                                >
                                                    {exer}
                                                </p>
                                            ))}
                                        </>
                                    ) : selectedBody === "Abdomin" ? <>
                                        {Abdomen.map((exer, _) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={_}
                                            >
                                                {exer}
                                            </p>
                                        ))}
                                    </> : selectedBody === "Lower Body" ?
                                        <>
                                            {LowerBody.map((exer, _) => (
                                                <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                    onClick={() => handleEx(exer)}
                                                    key={_}
                                                >
                                                    {exer}
                                                </p>
                                            ))}
                                        </> : null}
                                </div>
                            )}


                        </div>
                    </div>
                </div>
                <div className="w-1/2 border-2 border-s-2">
                    {setExercises.length > 0 ? exercises.map((exer, _) => (
                        <p className="text-xl" key={_}>
                            {exer}
                        </p>
                    )) : "No Exercise is yet"}
                </div>
            </div>
        </>
    )
};

export default ShowExercise;
