/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useFireabse } from "../context/Firebase";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useForm } from 'react-hook-form';

const Register = () => {

    const {
        createUser,
        setIsLoggedIn,
        FirebaseAuth,
        authProvider,
        setShowModel,
        createUserDatabase,
    } = useFireabse();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
        getValues
    } = useForm();

    const [exists, setExists] = useState(false);
    const [valid, setValid] = useState(false);

    const onSubmit = async (data) => {
        const regEx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const { email, password, confirmPassword } = data;
        setValid(false);
        if (regEx.test(email)) {
            if (password === confirmPassword) {
                await createUser(email, password).then((userCredential) => {
                    const { email, uid } = userCredential.user;
                    createUserDatabase({ email, uid });
                    setShowModel(true);
                }).catch((error) => {
                    const errorCode = error.code;
                    if (password !== confirmPassword) {
                        setExists(false);
                    }

                    if (errorCode === "auth/email-already-in-use") {
                        setIsLoggedIn(true);
                        setExists(true);
                    }
                })
            }
            reset();
        } else {
            setValid(true);
        }
    }

    const handleGoogleSign = async () => {
        try {
            const value = await signInWithPopup(FirebaseAuth, authProvider);
            if (value.user) {
                setShowModel(true);
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
                <form className="max-w-sm mx-auto flex flex-col justify-center items-center md:mb-5 mb-2"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5 w-full">
                        <label htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Your email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                            })}
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 " placeholder="name@gmail.com"
                        />
                        {errors.email &&
                            (<p className="text-red-500">{`${errors.email?.message}`}</p>)}
                        {valid &&
                            (<p className="text-red-500">
                                Enter valid gmail
                            </p>)}
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is requried",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                            })}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                            placeholder="password"
                            autoComplete="new-password" />
                        {errors.password &&
                            (<p className="text-red-500">{`${errors.password?.message}`}</p>)}
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Confirm Password
                        </label>

                        <input
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === getValues("password") || "Password Must Match"

                            })}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                            placeholder="••••••••"
                            autoComplete="new-password" />
                        {errors.consfirmPassword &&
                            (<p className="text-red-500">{`${errors.consfirmPassword?.message}`}</p>)}
                    </div>
                    <div className="flex flex-col items-center">
                        {
                            exists &&
                            (<p className="text-red-500 text-center my-1">
                                Account already Exists Try to Login
                            </p>)
                        }
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onSubmit={handleSubmit(onSubmit)}>
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
