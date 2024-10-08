import '../styles/stepper.css'
import { useState } from "react";
import { useFireabse } from "../context/Firebase";
import { TiTick } from 'react-icons/ti'
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

    const handelSubmit = (e) => {
        e.preventDefault()
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
            name: "Age/Height",
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
            <div className="container absolute top-5 left-1/2 transform -translate-x-1/2 z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit w-full md:w-2/3 lg:w-1/2 p-5 md:p-8 rounded-3xl">
                <div className="flex flex-col w-full">
                    
                    {/* Stepper */}
                    <div className="my-2 md:flex grid grid-cols-3 justify-center">
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
                    {/* Stepper End */}

                    <div className="p-2 my-2">
                        {display}
                    </div>
                    <div className="flex justify-between">
                        {currentStep > 1 && (
                            <button className='px-3 py-2 bg-gray-400 w-fit uppercase my-2 text-white' onClick={() => setCurrentStep(prev => prev - 1)}>
                                Back
                            </button>
                        )}
                        <button className='px-3 py-2 bg-green-400 w-fit uppercase my-2 text-white'
                            onClick={
                                currentStep !== 5 ? () => setCurrentStep(prev => prev + 1) : handelSubmit
                            }>
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Model;
