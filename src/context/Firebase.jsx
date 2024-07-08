/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'

import { createContext, useContext, useEffect, useState } from 'react'


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

// Instance of Auth
const FirebaseAuth = getAuth(FirebaseApp)
// Instance of Google Auth Provider
const authProvider = new GoogleAuthProvider()

const FirebaseContext = createContext(null)
export const useFireabse = () => useContext(FirebaseContext)

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (user !== null) {
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
                setUser(user)
                console.log(displayName);
                console.log(email);
                console.log(photoURL);
                console.log(emailVerified);
                console.log("OAuthStateChanged");
                isLoggedIn(true)
            }
            else {
                setUser(null)
            }
        })
    }, [user])

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(FirebaseAuth, email, pass)
    }

    const signOutUser = () => {
        signOut(FirebaseAuth)
        setUser(null)
    }

    const loginUser = (email, pass) => {
        return signInWithEmailAndPassword(FirebaseAuth, email, pass)
    }

    return (
        <FirebaseContext.Provider value={{ user, createUser, signOutUser, isLoggedIn, setIsLoggedIn, loginUser, FirebaseAuth, authProvider }}>
            {children}
        </FirebaseContext.Provider>
    )
}