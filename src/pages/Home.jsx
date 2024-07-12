/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import { useFireabse } from "../context/Firebase";
import Model from "../components/Model";
import '../styles/Popup.css'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect } from "react";

export const Home = () => {

    const { signOutUser, showModel, isLoggedIn } = useFireabse()
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/dashboard")
    }, [])

    return (
        <>
            <div className="relative overflow-x-hidden">
                {/* {isLoggedIn ? showModel && <Model /> : null} */}
                {/*  */}
                {/* <div className={`bg-gray-50 -z-10 w-screen h-screen ${showModel ? `model` : ``} `}> */}
                <div className={`bg-gray-50 -z-10 w-screen h-screen `}>
                    <Navigation />
                    <Outlet />
                    <Footer />
                    {/* <button className="block p-2 bg-gray-700 text-white" onClick={signOutUser}>Sign Out</button  > */}
                </div>
            </div>
        </>
    )
};
