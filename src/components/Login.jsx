import { useFireabse } from "../context/Firebase";
import { useForm } from "react-hook-form";

const Login = () => {
    const { loginUser, setIsLoggedIn } = useFireabse();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm();

    const userLogin = async (data) => {
        const { email, password } = data
        await loginUser(email, password).then((userCredentials) => {
            if (userCredentials.user) {
                reset();
                setIsLoggedIn(true);
            }
        }).catch((error) => {
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
            <form className="max-w-sm mx-auto flex flex-col justify-center items-center mb-2" onSubmit={handleSubmit(userLogin)}>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 " placeholder="name@flowbite.com"
                    />
                    {errors.email &&
                        (<p className="text-red-500">{`${errors.email?.message}`}</p>)}
                </div>
                <div className="mb-5 w-full">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Your password
                        </label>
                    </div>
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
                        placeholder="••••••••"
                    />
                    {errors.password &&
                        (<p className="text-red-500">{`${errors.password?.message}`}</p>)}
                </div>
                <div className="">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onSubmit={handleSubmit(userLogin)}>
                        Login
                    </button>
                </div>

            </form>

        </div>
    )
};

export default Login;
