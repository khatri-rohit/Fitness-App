import { Outlet } from "react-router-dom";
import { useFireabse } from "../context/Firebase";
import Model from "../components/Model";
import '../styles/Popup.css'
import Navigation from "../components/Navigation";

export const Home = () => {

    const { signOutUser, showModel, isLoggedIn } = useFireabse()

    return (
        <>
            <div className="relative overflow-x-hidden">
                {/* {isLoggedIn ? showModel && <Model /> : null} */}
                {/*  */}
                {/* <div className={`bg-gray-50 -z-10 w-screen h-screen ${showModel ? `model` : ``} `}> */}
                <div className={`bg-gray-50 -z-10 w-screen h-screen `}>
                    <Navigation />
                    <Outlet />
                    {/* <button className="block p-2 bg-gray-700 text-white" onClick={signOutUser}>Sign Out</button  > */}
                </div>
            </div>
        </>
    )
};
