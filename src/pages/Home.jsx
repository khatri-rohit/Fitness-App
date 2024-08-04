import { Outlet } from "react-router-dom";
import { useFireabse } from "../context/Firebase";
import Model from "../components/Model";
import '../styles/Popup.css'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const Home = () => {

    const { showModel, isLoggedIn } = useFireabse()

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
