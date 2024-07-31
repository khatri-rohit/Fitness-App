/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import { useFireabse } from "../context/Firebase";
import Model from "../components/Model";
import '../styles/Popup.css'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect } from "react";

export const Home = () => {

    const { showModel, isLoggedIn } = useFireabse()
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/dashboard")
    }, [])

    return (
        <>
            <div className="w-screen">
                {isLoggedIn && showModel && <Model />}
                <div className={`bg-gray-50 mx-auto w-screen ${showModel ? `model` : ``} `}>
                    <Navigation />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
};
