/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";

import { createContext, useContext } from 'react'


const firebaseConfig = {
    apiKey: "AIzaSyASiuW4wI7mODSmrjjjYxdBGDWtrfQ9GVM",
    authDomain: "fitness-app-7a366.firebaseapp.com",
    projectId: "fitness-app-7a366",
    storageBucket: "fitness-app-7a366.appspot.com",
    messagingSenderId: "938889381145",
    appId: "1:938889381145:web:69727df74193d30c7c3188",
    measurementId: "G-5PMD7HEZ34"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);

const FirebaseContext = createContext(null)
export const useFireabse = () => useContext(FirebaseContext)

export const ContextProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ name: "Rohit Khatri" }}>
            {children}
        </FirebaseContext.Provider>
    )
}