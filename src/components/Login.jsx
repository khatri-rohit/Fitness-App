import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { useFireabse } from "../context/Firebase";

const Login = () => {

    const { loginUser, setIsLoggedIn } = useFireabse()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const userLogin = (e) => {
        e.preventDefault()
        loginUser(email, pass).then((userCredentials) => {
            if (userCredentials.user) {
                alert("Login Successfully")
                console.log(userCredentials.user.email);
                setIsLoggedIn(true)
            }
        }).catch((error) => {
            console.log(error);
            console.error(error);
        })
    }

    return (
        <div className="container mx-auto bg-gray-100 w-3/4 md:w-1/4 md:p-8 p-5 opacity-85 rounded-3xl">
            <div className="mb-5">
                <p className="md:text-3xl text-lg text-center drop-shadow-lg font-thin">
                    Login your Account
                </p>
            </div>
            <form className="max-w-sm mx-auto flex flex-col justify-center items-center md:mb-5 mb-2" onSubmit={userLogin}>
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
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Your password
                        </label>
                        {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                    </div>
                    <input
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-5  00 dark:text-black dark:focus:ring-blue-500 "
                        placeholder="••••••••" required autoComplete="new-password" />
                </div>
                <div className="">
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800" onSubmit={userLogin}>
                        Login
                    </button>
                </div>
                {/* <div className="md:mt-5 mt-2 w-full flex items-center">
                    <p className="border-b-2 border-gray-500 w-1/3"></p>
                    <p className="text-nowrap mx-1">Or Continue With</p>
                    <p className="border-b-2 border-gray-500 w-1/3"></p>
                </div> */}
            </form>
            {/* <div className="mx-auto w-fit">
                <button onClick={() => { }} className="w-full flex items-center mx-1 p-2 bg-gray-200 md:text-lg text-sm">
                    Google
                    <span className="mx-1">
                        <FcGoogle />
                    </span>
                </button>
            </div> */}
        </div>
    )
};
{/* <div className="flex items-center justify-between">
    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
    {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div> */}
export default Login;
