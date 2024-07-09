/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { createContext, useContext, useEffect, useId, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider
} from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'

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

// Instance of Auth
const FirebaseAuth = getAuth(FirebaseApp)
// Instance of Google Auth Provider
const authProvider = new GoogleAuthProvider()
// Firestore
const firestore = getFirestore(FirebaseApp)

const FirebaseContext = createContext(null)


export const useFireabse = () => useContext(FirebaseContext)

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null) // On Auth State Changed
    const [isLoggedIn, setIsLoggedIn] = useState(true) // Login Page
    const [showModel, setShowModel] = useState(false) // Data Model Popup
    const [newUser, setNewUser] = useState(null)

    // Add Doc To Users Collection Firestore
    const createUserDatabase = async ({ email, uid, accessToken }, { name, age, weight, height }) => {
        try {
            const docRef = doc(firestore, "users", email);
            await setDoc(docRef, {
                email,
                name,
                accessToken,
                age,
                height,
                weight,
                uid
            });

            // console.log("Document written with ID: ", docRef.id);

            const querySnapshot = await getDocs(collection(firestore, "users"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id)
                console.log(doc.data().Name);

            });
            setNewUser(null)

        } catch (error) {
            setNewUser({})
            console.log(error + "\nError Acuured While create Data");
        }
    }

    // create user
    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(FirebaseAuth, email, pass)
    }

    // Sign Out
    const signOutUser = () => {
        signOut(FirebaseAuth)
        setUser(null)
    }

    // login User
    const loginUser = (email, pass) => {
        return signInWithEmailAndPassword(FirebaseAuth, email, pass)
    }

    // Auth State Change
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (user !== null) {
                // const displayName = user.displayName;
                const email = user.email;
                // const photoURL = user.photoURL;
                // const emailVerified = user.emailVerified;
                // console.log(displayName);
                console.log(email);
                // console.log(photoURL);
                // console.log(emailVerified);
                console.log("OAuthStateChanged");
                setUser(user)
            }
            else {
                setUser(null)
            }
        })
    }, [user])

    return (
        <FirebaseContext.Provider value={{
            user,
            createUser,
            signOutUser,
            isLoggedIn,
            setIsLoggedIn,
            loginUser,
            FirebaseAuth,
            authProvider,
            showModel,
            setShowModel,
            createUserDatabase,
            newUser,
            setNewUser
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}