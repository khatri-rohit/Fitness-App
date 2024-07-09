import { useState } from "react";
import { useFireabse } from "../context/Firebase";
import '../styles/Popup.css'

const Model = () => {

    const { setShowModel } = useFireabse()

    // Set Data to form variables
    const [userData, setUserData] = useState({
        name: '',
        age: 0,
        height: 0,
        weight: 0
    })


    const handelSubmit = (e) => {
        e.preventDefault()
        console.log(userData);

        // setShowModel(false)
    }

    return (
        <>
            <div className="container absolute inset-0 z-10 drop-shadow-2xl mx-auto bg-gray-100 h-fit my-10 w-3/4 md:w-1/4 md:p-8 p-5 rounded-3xl">
                <div className="md:mb-5 mb-2">
                    <p className="md:text-lg text-xl lg:text-3xl text-center m-3 drop-shadow-lg font-thin">
                        About You
                    </p>
                </div>
                <form className="max-w-sm mx-auto flex flex-col justify-center items-center md:mb-5 mb-2" onSubmit={handelSubmit}>
                    <div className="mb-5 w-full">
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Name
                        </label>
                        <input
                            value={userData.name}
                            onChange={e => setUserData(...userData, { name: e.target.value })}
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
                            onChange={e => setUserData(...userData, { age: e.target.value })}
                            name="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                            required />
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
            </div>
        </>
    )
};

export default Model;
