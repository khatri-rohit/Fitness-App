/* eslint-disable no-unused-vars */
import { useState } from "react";

const Workout = () => {

    const [selected, getSelected] = useState([
        {
            title: "All Plans",
            selected: true,
        },
        {
            title: "Muscle Building",
            selected: false,
        },
        {
            title: "Weight Loss",
            selected: false,
        },
        {
            title: "Gain Strenght",
            selected: false,
        },
    ])

    return (
        <>
            <div className="md:container mx-auto h-screen md:p-2 p-5">
                <div className="my-3">
                    <p className="text-2xl mx-4 font-medium">Workout</p>
                </div>
                <div className="">
                    <div className="flex justify-around items-center">
                        {selected.map((select, _) => (
                            <p key={_} className={selected ? `text-2xl border-blue-500 border-b-4` : `text-2xl`}>
                                {select.title}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Workout;
