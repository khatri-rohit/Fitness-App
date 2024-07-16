/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Name = ({ userData, setUserData }) => {
    return (
        <div className="">
            <div className="">
                <p className="text-2xl">What's your Name?</p>
            </div>
            <div className="flex justify-center h-20">
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="first name"
                    className="bg-transparent text-3xl w-44 outline-none indent-7"
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        name:e.target.value
                    }))}
                />
            </div>
        </div>
    )
};

export default Name;
