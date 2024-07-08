import { Outlet } from "react-router-dom";
import { useFireabse } from "../context/Firebase";

export const Home = () => {

    const { signOutUser } = useFireabse()
    
    return (
        <>
            <div>
                Home
                <Outlet />
                <button className="block p-2 bg-gray-700 text-white" onClick={signOutUser}>Sign Out</button  >
            </div>
        </>
    )
};
