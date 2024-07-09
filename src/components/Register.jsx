/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useFireabse } from "../context/Firebase";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth'


const Register = () => {

    const { createUser, setIsLoggedIn, FirebaseAuth, authProvider, setShowModel } = useFireabse()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submit Form");
        createUser(email, pass).then((userCredential) => {
            console.log("Account Created");
            console.log(userCredential.user.email);
            setShowModel(true)

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            if (errorCode === 'auth/email-already-in-use') {
                var msg = errorCode.replace("auth/", "")
                console.log(msg);
                alert("This User Email ALready Exists \nTry to Login")
                setPass('')
                setEmail('')
                setIsLoggedIn(true)
            }
        })
    }

    const handleGoogleSign = async () => {
        try {
            const value = await signInWithPopup(FirebaseAuth, authProvider);
            if (value.user) {
                console.log(value.user.displayName);
                console.log(value.user.email);
                setShowModel(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container mx-auto bg-gray-100 w-3/4 md:w-1/4 md:p-8 p-5 opacity-85 rounded-3xl">
                <div className="md:mb-5 mb-2">
                    <p className="md:text-lg text-xl lg:text-3xl text-center m-3 drop-shadow-lg font-thin">
                        Create Your Account
                    </p>
                </div>
                <form className="max-w-sm mx-auto flex flex-col justify-center items-center md:mb-5 mb-2" onSubmit={handleSubmit}>
                    <div className="mb-5 w-full">
                        <label htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Your email
                        </label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 " placeholder="name@flowbite.com" required autoComplete="email" />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Your password
                        </label>
                        <input
                            type="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                            placeholder="••••••••" required autoComplete="new-password" />
                    </div>
                    <div className="">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onSubmit={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
                <div className="md:mb-5 mb-2">
                    <p className="text-center">
                        Already Have a account? <span className="text-blue-600 font-semibold cursor-pointer hover:underline"
                            onClick={() => setIsLoggedIn(false)}>
                            Login
                        </span>
                    </p>
                </div>
                <div className="mx-auto w-fit">
                    <button onClick={handleGoogleSign} className="w-full flex items-center mx-1 p-2 bg-gray-200 font-medium">
                        Sign Up with Google
                        <span className="mx-1 text-2xl">
                            <FcGoogle />
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
};

export default Register;
