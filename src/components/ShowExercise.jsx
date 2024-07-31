/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Abdomen, Body, LowerBodyGain, UpperBodyGain, LowerBodyLose, UpperBodyLose } from '../data'
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
    const options = ["Gain Muscle & Strength", "Lose Weight & Body Fat"];
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
                    const goal = muscle ? "Gain Muscle & Strength" : "Lose Weight & Body Fat";
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
                    <ImCross size={24} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="p-2">
                        <p className="text-xl font-medium mb-2">
                            Choose Exercises
                        </p>
                        <div className="p-2">
                            <div className="my-2 w-full md:w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setShowCate(prev => !prev)}>
                                <p className="text-gray-500">
                                    {category}
                                </p>
                                {
                                    showCate
                                        ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />
                                }
                            </div>

                            {showCate && (
                                <div className="w-full md:w-2/3 border-2 rounded-lg">
                                    {options.map((option, index) => (
                                        <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                            key={index}
                                            onClick={() => {
                                                setCategory(option);
                                                setShowCate(false);
                                            }}>
                                            {option}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <div className="my-2 md:mt-10 w-full md:w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setBody(prev => !prev)}>
                                <p className="text-gray-500">
                                    {selectedBody}
                                </p>
                                {
                                    body
                                        ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />
                                }
                            </div>
                            {body && (
                                <div className="w-full md:w-2/3 border-2 rounded-lg">
                                    {Body.map((option, index) => (
                                        <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                            key={index}
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

                            <div className="my-2 md:mt-10 w-full md:w-2/3 flex justify-between items-center drop-shadow-sm border-2 p-2 cursor-pointer"
                                onClick={() => setExercise(prev => !prev)}>
                                <p className="text-gray-500">
                                    Choose Exercise
                                </p>
                                {
                                    exercise
                                        ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />
                                }
                            </div>
                            {exercise && (category === "Gain Muscle & Strength" ? (
                                <div className="w-full md:w-2/3 border-2 rounded-lg">
                                    {selectedBody === "UpperBody" ? (
                                        UpperBodyGain.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : selectedBody === "Abdomen" ? (
                                        Abdomen.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : selectedBody === "LowerBody" ? (
                                        LowerBodyGain.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : null}
                                </div>
                            ) : category === "Lose Weight & Body Fat" ? (
                                <div className="w-full md:w-2/3 border-2 rounded-lg">
                                    {selectedBody === "UpperBody" ? (
                                        UpperBodyLose.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : selectedBody === "Abdomen" ? (
                                        Abdomen.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : selectedBody === "LowerBody" ? (
                                        LowerBodyLose.map((exer, index) => (
                                            <p className="p-2 hover:bg-slate-200 cursor-pointer"
                                                onClick={() => handleEx(exer)}
                                                key={index}>
                                                {exer}
                                            </p>
                                        ))
                                    ) : null}
                                </div>
                            ) : null)}
                        </div>
                    </div>
                </div>

                <div className="flex-1 border-l-2 border-gray-200 pl-4">
                    {exercises?.length > 0 ? (
                        <div className="p-3">
                            {exercises.map((exer, index) => (
                                <div className="my-1 flex justify-between p-2 items-center cursor-pointer"
                                    key={index} onClick={() => handleCheck(exer.ex)}>
                                    <p className={`font-medium ${exer.check ? "line-through" : ""}`}>
                                        {exer.ex}
                                    </p>
                                    {exer.check ? <GiCheckMark size={20} /> : <span className="text-md font-light">To-Do</span>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl text-center font-semibold">No Exercise is Selected</p>
                    )}
                </div>
            </div>

        </>
    )
};

export default ShowExercise;
