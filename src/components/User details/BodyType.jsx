/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useState } from "react";

const BodyType = ({ userData, setUserData }) => {
    const [body, setBody] = useState({
        skinny: false,
        ideal: false,
        flabby: false,
        heavier: false,
    })

    return (
        <div className="">
            <p className="text-2xl">What's your Current Body Type?</p>
            <div className="">
                <div className={`skinny flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${body.skinny && `border-blue-500 border-2`}`}
                    onClick={() => {
                        setUserData((prev) => ({
                            ...prev, bodyType: "Skinny"
                        }))
                        setBody({
                            skinny: true,
                            ideal: false,
                            heavier: false,
                            flabby: false,
                        })
                    }}>
                    <p className="text-xl">Skinny</p>
                    <div className="flex w-54">
                        <img src="/img/skinny.png" alt="" className="p-2 max-h-[170px]" />
                        <input type="checkbox"
                            name="gainMuscle"
                            className="text-blue-500 outline-none border-0"
                            value={userData.bodyType = "Skinny"}
                            checked={body.skinny}
                        />
                    </div>
                </div>

                <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${body.ideal && `border-blue-500 border-2`}`}
                    onClick={() => {
                        setUserData((prev) => ({
                            ...prev, bodyType: "Ideal"
                        }))
                        setBody({
                            skinny: false,
                            ideal: true,
                            heavier: false,
                            flabby: false,
                        })
                    }}>
                    <p className="text-xl">Ideal</p>
                    <div className="flex w-54">
                        <img src="/img/ideal.png" alt="" className="p-2 max-h-[150px]" />
                        <input type="checkbox"
                            name="gainMuscle"
                            className="text-blue-500 outline-none border-0"
                            value={userData.bodyType = "Ideal"}
                            checked={body.ideal}
                        />
                    </div>
                </div>

                <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${body.flabby && `border-blue-500 border-2`}`}
                    onClick={() => {
                        setUserData((prev) => ({
                            ...prev, bodyType: "Flabby"
                        }))
                        setBody({
                            skinny: false,
                            ideal: false,
                            flabby: true,
                            heavier: false,
                        })
                    }}>
                    <p className="text-xl">Flabby</p>
                    <div className="flex w-54">
                        <img src="/img/fallby.png" alt="" className="p-2 max-h-[170px]" />
                        <input type="checkbox"
                            name="gainMuscle"
                            className="text-blue-500 outline-none border-0"
                            value={userData.bodyType = "Flabby"}
                            checked={body.flabby}
                        />
                    </div>
                </div>

                <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${body.heavier && `border-blue-500 border-2`}`}
                    onClick={() => {
                        setUserData((prev) => ({
                            ...prev, bodyType: "Heavier"
                        }))
                        setBody({
                            skinny: false,
                            ideal: false,
                            flabby: false,
                            heavier: true,
                        })
                    }}>
                    <p className="text-xl">Heavier</p>
                    <div className="flex w-54">
                        <img src="/img/heaveir.png" alt="" className="p-2 max-h-[150px]" />
                        <input type="checkbox"
                            name="gainMuscle"
                            className="text-blue-500 outline-none border-0"
                            value={userData.bodyType = "Heavier"}
                            checked={body.heavier}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BodyType;
