/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

const Goals = ({ userData, setUserData }) => {
    return (
        <div className="p-4">
            <p className="text-2xl md:text-3xl lg:text-4xl">What's your Goal?</p>
            <div className="mt-4">
                <div
                    className={`flex cursor-pointer justify-between items-center p-2 h-40 rounded-lg my-5 ${userData.gainMuscle ? 'border-blue-500 border-2' : 'border-gray-300'}`}
                    onClick={() => setUserData((prev) => ({
                        ...prev, gainMuscle: !userData.gainMuscle, loseFat: false
                    }))}
                >
                    <p className="text-xl sm:text-2xl md:text-3xl">Gain Muscle</p>
                    <div className="flex w-54">
                        <img src="/img/gainMuscle.png" alt="Gain Muscle" className="p-2 max-h-[150px] md:max-h-[200px]" />
                        <input
                            type="checkbox"
                            name="gainMuscle"
                            className="text-blue-500 outline-none border-0 ml-2"
                            checked={userData.gainMuscle}
                            readOnly
                            aria-label="Gain Muscle"
                        />
                    </div>
                </div>

                <div
                    className={`flex cursor-pointer justify-between items-center p-2 h-40 rounded-lg my-5 ${userData.loseFat ? 'border-blue-500 border-2' : 'border-gray-300'}`}
                    onClick={() => setUserData((prev) => ({
                        ...prev, loseFat: !userData.loseFat, gainMuscle: false
                    }))}
                >
                    <p className="text-xl sm:text-2xl md:text-3xl">Lose Fat</p>
                    <div className="flex w-54">
                        <img src="/img/loseFat.png" alt="Lose Fat" className="p-2 max-h-[150px] md:max-h-[200px]" />
                        <input
                            type="checkbox"
                            name="loseFat"
                            className="text-blue-500 outline-none border-0 ml-2"
                            checked={userData.loseFat}
                            readOnly
                            aria-label="Lose Fat"
                        />
                    </div>
                </div>
            </div>
        </div>
        // <div className="">
        //     <p className="text-2xl">What's your Goal?</p>
        //     <div className="">
        //         <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${userData.gainMuscle && `border-blue-500 border-2`}`}
        //             onClick={() => setUserData((prev) => ({
        //                 ...prev, gainMuscle: !userData.gainMuscle, loseFat:false
        //             }))}>
        //             <p className="text-xl">Gain Muscle</p>
        //             <div className="flex w-54">
        //                 <img src="/img/gainMuscle.png" alt="" className="p-2 max-h-[150px]" />
        //                 <input type="checkbox"
        //                     name="gainMuscle"
        //                     className="text-blue-500 outline-none border-0"
        //                     checked={userData.gainMuscle}
        //                 />
        //             </div>
        //         </div>

        //         <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${userData.loseFat && `border-blue-500 border-2`}`}
        // onClick={() => setUserData((prev) => ({
        //     ...prev, loseFat: !userData.loseFat, gainMuscle: false
        // }))}>
        //             <p className="text-xl">Lose Fat</p>
        //             <div className="flex w-54">
        //                 <img src="/img/loseFat.png" alt="" className="p-2 max-h-[150px]" />
        //                 <input type="checkbox"
        //                     name="loseFat"
        //                     className="text-blue-500 outline-none border-0"
        //                     checked={userData.loseFat}
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
};

export default Goals;
