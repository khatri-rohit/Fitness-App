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
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'

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
export const firestore = getFirestore(FirebaseApp)

const FirebaseContext = createContext(null)


export const useFireabse = () => useContext(FirebaseContext)

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null) // On Auth State Changed
    const [isLoggedIn, setIsLoggedIn] = useState(true) // Login Page
    const [showModel, setShowModel] = useState(false) // Data Model Popup
    const [newUser, setNewUser] = useState(null)
    const [Event, setEvent] = useState([])


    // Add Doc To Users Collection Firestore
    const createUserDatabase = async ({ email, uid }) => {
        try {
            const docRef = doc(firestore, "users", email);
            await setDoc(docRef, {
                email, uid, metadata: { Created_At: Date.now() }
            });
            console.log("Account Created");
            console.log("Document written with ID: ", docRef.id);
            setShowModel(true)
        } catch (error) {
            setNewUser(null)
            console.log(error);
        }
    }

    // Update Specific Data 
    const updateEvent = async (email, Events) => {
        const docRef = doc(firestore, "users", email);
        await updateDoc(docRef, {
            Event: Events
        })
        console.log(Events);
    }

    // Set Notes
    const uploadNotes = async (email, notes) => {
        const docRef = doc(firestore, "users", email);
        await updateDoc(docRef, {
            notes
        })
        console.log(notes + "Notes Updated in Database");
    }

    // Get Data
    const setData = async ({ email, uid },
        { male,
            female,
            nonBinary,
            notToSay,
            name,
            gainMuscle,
            loseFat,
            bodyType,
            age,
            height,
            weight }) => {
        try {
            const docRef = doc(firestore, "users", email);
            await setDoc(docRef, {
                email, uid,
                male,
                female,
                nonBinary,
                notToSay,
                name,
                gainMuscle,
                loseFat,
                bodyType,
                age,
                height,
                weight
            });
            console.log("Document written with ID: ", docRef.id);
            setShowModel(false)
        } catch (error) {
            setNewUser(null)
            console.log(error);
        }
    }

    // Check user Exists or Not
    const checkExistingUser = async (email) => {
        const docRef = doc(firestore, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Such Document Exists");
            await docSnap.data().name ? setShowModel(false) : setShowModel(true);
            const AllNotes = await docSnap.data().notes;
            setNewUser({ ...newUser, AllNotes });
        } else {
            console.log("No Such Document Exists");
            setShowModel(true);
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
                const email = user.email;
                const uid = user.uid;
                setUser(user)
                console.log(user);
                setNewUser(user)
                checkExistingUser(email)
                console.log("OAuthStateChanged");
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
            setNewUser,
            setData,
            Event,
            setEvent,
            updateEvent,
            uploadNotes,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}