/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Abdomen, Body, LowerBody, UpperBody } from '../data'
import { firestore, useFireabse } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { ImCross } from "react-icons/im";
import { GiCheckMark } from 'react-icons/gi';

const ShowExercise = ({ setShow, setTotal, exercises, setExercises }) => {
    const [goal, setGoal] = useState("");
    const [category, setCategory] = useState("");
    // 
    const [showCate, setShowCate] = useState(false);
    const [body, setBody] = useState(false);
    const [exercise, setExercise] = useState(false);
    // 
    const options = ["Gain Muscle & Strenght", "Lose Weight & Body Fat"];
    const [selectedBody, setSelectedBody] = useState(Body[0]);

    const { user, uploadExercise } = useFireabse();
    const { email } = user;

    const handleEx = select => {
        const exerciseExists = exercises.some(exer => exer.ex === select);
        if (!exerciseExists) {
            const newExercise = { ex: select, check: false };
            const updateExercise = [...exercises, newExercise];
            setExercises(updateExercise);
            uploadExercise(email, updateExercise);
            setTotal(updateExercise.length);
        }
    }

    const handleCheck = exercise => {
        const updateExecrise = exercises.map((exer => {
            if (exer.ex === exercise) {
                return { ...exer, check: !exer.check };
            }
            return exer;
        }));
        setExercises(updateExecrise);
        uploadExercise(email, updateExecrise);
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
                    console.log("Goal Exercise is Not Fetched Properly");
                }
            } catch (error) {
                console.log("Error Occured While Fetching Goal Exercise\n" + error);
            }
        })()
    }, [email])

    return (
        <>
            <div className="flex justify-between py-2">
                {goal}
                <div className='cursor-pointer' onClick={() => setShow(false)}>
                    <ImCross />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-1/2">
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
                                    {Body.map((option, _) => (
                                        <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                            key={_}
                                            onClick={() => {
                                                setSelectedBody(option);
                                                setBody(false);
                                                setExercise(false);
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
                                    {selectedBody === "UpperBody" ? (
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
                                    ) : selectedBody === "Abdomen" ? <>
                                        {Abdomen.map((exer, _) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={_}
                                            >
                                                {exer}
                                            </p>
                                        ))}
                                    </> : selectedBody === "LowerBody" ?
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
                <div className="w-1/2 border-s-2">
                    {exercises.length > 0 ? (
                        <div className="p-3">
                            {exercises?.map((exer, _) => {
                                return (
                                    <div className="my-1 flex justify-between p-2 items-start cursor-pointer"
                                        key={_} onClick={() => handleCheck(exer.ex)}>
                                        <p className={`font-medium ${exer.check && "line-through"}`}>
                                            {exer.ex}
                                        </p>
                                        {exer.check ? <GiCheckMark /> : <span className="text-md font-light">To-Do</span>}
                                    </div>
                                )
                            })}
                        </div>
                    ) : <p className="text-2xl text-center font-semibold">No Exercise is Selected</p>}
                </div>
            </div>
        </>
    )
};

export default ShowExercise;
