/* eslint-disable no-unused-vars */
import '../styles/stepper.css'
import { useEffect, useState } from "react";
import { useFireabse } from "../context/Firebase";
import { TiTick } from 'react-icons/ti'
import '../styles/Popup.css'
import Gender from './User details/Gender';
import Name from './User details/Name';
import Goals from './User details/Goals';
import BodyType from './User details/BodyType';
import Details from './User details/Details';


const Model = () => {
    const { setShowModel, newUser, setData } = useFireabse()

    const [userData, setUserData] = useState({
        male: false,
        female: false,
        nonBinary: false,
        notToSay: false,
        name: '',
        gainMuscle: false,
        loseFat: false,
        bodyType: '',
        age: '',
        height: '',
        weight: '',
    })
    console.log(userData);

    const handelSubmit = (e) => {
        e.preventDefault()
        console.log(newUser);
        setData(newUser, userData)
        setShowModel(false)
    }

    const prograssBar = [
        {
            id: 1,
            name: "Gender",
            completed: false,
        },
        {
            id: 2,
            name: "Name",
            completed: false,
        },
        {
            id: 3,
            name: "Goal",
            completed: false,
        },
        {
            id: 4,
            name: "Body Type",
            completed: false,
        },
        {
            id: 5,
            name: "Age/Height/Weight",
            completed: false,
        },
    ]

    const [currentStep, setCurrentStep] = useState(1)

    const display = (
        currentStep === 1
            ? <Gender userData={userData}
                setUserData={setUserData} />
            : currentStep === 2 ?
                <Name userData={userData}
                    setUserData={setUserData} />
                : currentStep === 3 ?
                    <Goals userData={userData}
                        setUserData={setUserData} />
                    : currentStep == 4 ?
                        <BodyType userData={userData}
                            setUserData={setUserData} />
                        : currentStep == 5 ?
                            <Details userData={userData}
                                setUserData={setUserData} />
                            : <Details userData={userData}
                                setUserData={setUserData} />
    )

    return (
        <>
            <div className="container absolute top-5 left-[25%] z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit md:w-1/2 md:p-8 p-5 rounded-3xl">
                <div className="flex flex-col w-full">
                    {/* Stepper */}
                    <div className="my-2 flex justify-center">
                        {prograssBar.map((step, i) => (
                            <div className={`step-item ${currentStep === i + 1 && 'active'} ${i + 1 < currentStep && 'complete'} `} key={i}>
                                <div className="step">
                                    {step.id < currentStep ? <TiTick size={24} /> : step.id}
                                </div>
                                <p className="text-gray-700">
                                    {step.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="p-2 my-2">
                        {display}
                    </div>
                    <div className="flex">
                        {currentStep > 1 && (<button className='px-3 py-2 bg-gray-400 w-fit uppercase mx-auto my-2 text-white' onClick={() => setCurrentStep(prev => prev - 1)}>
                            back
                        </button>)}
                        <button className='px-3 py-2 bg-green-400 w-fit uppercase mx-auto my-2 text-white'
                            onClick={
                                currentStep !== 5 ? setCurrentStep(prev => prev + 1) : handelSubmit
                            }>
                            Next
                        </button>
                    </div>
                </div>
            </div>


            {/* <div className="overlay-container container absolute inset-0 z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit w-3/4 md:w-1/4 md:p-8 p-5 rounded-3xl">
                <div className="md:mb-5 mb-2">
                    <p className="md:text-lg text-xl lg:text-3xl text-center m-3 drop-shadow-lg font-thin">
                        About You
                    </p>
                </div>
                <form className="popup-box max-w-sm mx-auto flex flex-col justify-center items-center md:mb-5 mb-2" onSubmit={handelSubmit}>
                    <div className="mb-5 w-full">
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Name
                        </label>
                        <input
                            value={userData.name}
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500" />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="age"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Age
                        </label>
                        <input
                            type="number"
                            value={userData.age}
                            onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                            name="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                            required placeholder="0" />
                    </div>
                    <div className="mb-5 w-full flex">
                        <div className="w-fit mx-1">
                            <label htmlFor="height"
                                className="block mb-2 text-sm font-medium text-gray-900 ">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                value={userData.height}
                                onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))}
                                name="height" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                                required placeholder="0" />
                        </div>
                        <div className="w-fit mx-1">
                            <label htmlFor="weight"
                                className="block mb-2 text-sm font-medium text-gray-900 ">
                                Weight
                            </label>
                            <input
                                type="number"
                                value={userData.weight}
                                onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))}
                                name="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                                required placeholder="0" />
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onSubmit={handelSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
                {/* <div className="md:mb-5 mb-2">
                    <p className="text-center">
                        Already Have a account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline"
                            onClick={() => setIsLoggedIn(false)}>
                            Login
                        </span>
                    </p>
                </div> */}
            {/* <div className="mx-auto w-fit">
                    <button onClick={() => setShowModel(false)} className="w-full flex items-center mx-1 p-2 bg-gray-200 font-medium">
                        Sign Up with Google
                        <span className="mx-1 text-2xl">
                            <FcGoogle />
                        </span>
                    </button>
                </div> */}

            {/* </div>  */}
        </>
    )
};

export default Model;
