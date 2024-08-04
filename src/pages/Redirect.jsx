/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";


const Redirect = () => {
    const navigate = useNavigate();
    const redirect = () => {
        navigate("/")
    }

    return (
        <>
            <div className="h-screen p-3">
                <div className="p-3 flex flex-col items-center">
                    <p className="text-3xl font-light text-center my-7">
                        Page Doesn't Exists
                    </p>
                    <button className="px-2 py-2 bg-blue-400 rounded-md text-white text-xl" onClick={redirect}>
                        Go Back
                    </button>
                </div>

            </div>;
        </>
    )
};

export default Redirect;
