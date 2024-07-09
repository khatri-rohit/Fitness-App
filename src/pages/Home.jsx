import { Outlet } from "react-router-dom";
import { useFireabse } from "../context/Firebase";
import Model from "../components/Model";
import '../styles/Popup.css'

export const Home = () => {

    const { signOutUser, showModel } = useFireabse()

    return (
        <>
            <div className="relative overflow-x-hidden">
                {showModel && <Model />}
                <div className={`bg-gray-50 -z-10 w-screen h-screen ${showModel ? `model` : ``} `}>
                    <p className="text-3xl">Rohit Khatri</p>
                    <Outlet />
                    <button className="block p-2 bg-gray-700 text-white" onClick={signOutUser}>Sign Out</button  >
                </div>
            </div>
        </>
    )
};
