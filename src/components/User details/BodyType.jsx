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

    const handleBodyTypeSelection = (type) => {
        setUserData((prev) => ({
            ...prev,
            bodyType: type
        }));
        setBody({
            skinny: type === 'Skinny',
            ideal: type === 'Ideal',
            flabby: type === 'Flabby',
            heavier: type === 'Heavier',
        });
    };

    const bodyTypes = [
        { type: 'Skinny', imgSrc: '/img/skinny.png', maxHeight: '170px' },
        { type: 'Ideal', imgSrc: '/img/ideal.png', maxHeight: '150px' },
        { type: 'Flabby', imgSrc: '/img/fallby.png', maxHeight: '170px' },
        { type: 'Heavier', imgSrc: '/img/heaveir.png', maxHeight: '150px' }
    ];

    return (
        <div className="p-4">
            <p className="text-lg font-medium md:text-3xl">What's your Current Body Type?</p>
            <div className="mt-4">
                {bodyTypes.map((bodyType) => (
                    <div
                        key={bodyType.type}
                        className={`flex cursor-pointer justify-between items-center p-2 h-40 rounded-lg my-5 ${body[bodyType.type.toLowerCase()] ? 'border-blue-500 border-2' : 'border-gray-300'}`}
                        onClick={() => handleBodyTypeSelection(bodyType.type)}
                    >
                        <p className="text-xl sm:text-2xl md:text-3xl">{bodyType.type}</p>
                        <div className="flex justify-between w-full md:w-54">
                            <img src={bodyType.imgSrc} alt={bodyType.type} className={`p-2 max-h-[${bodyType.maxHeight}]`} />
                            <input
                                type="checkbox"
                                name={bodyType.type}
                                className="text-blue-500 outline-none border-0 ml-2"
                                value={userData.bodyType === bodyType.type}
                                checked={body[bodyType.type.toLowerCase()]}
                                readOnly
                                aria-label={bodyType.type}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default BodyType;
