import { Circle } from 'rc-progress'
import { useState } from 'react';
import ShowExercise from './ShowExercise';

const Exercise = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            {show &&
                (<div className="container absolute top-5 left-[25%] z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit md:w-1/2 md:p-8 p-5 rounded-3xl">
                    <ShowExercise />
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
                            percent={40}
                            strokeColor="blue"
                            strokeWidth={5}
                            strokeLinecap="round"
                            trailWidth={3}
                            trailColor="white"
                        />
                        <span className="text-white absolute md:inset-x-3 inset-x-7 lg:inset-x-12 md:text-xl text-md">5/6</span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Exercise;
