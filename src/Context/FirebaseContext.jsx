/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext,  useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const FirebaseContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const FirebaseContextProvider = function({children}) {

    const [user, setUser] = useState(null);

      useEffect(() => {
         onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
            } else {
                setUser(null)
            }
         })
      }, []);

      const isLoggedIn = user ? true : false;

    const signUp = async function({name, lastName, email, password}) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            console.log('user =>', user);

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                lastName: lastName,
                email: email
            });

            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    };

    const signIn = async ({ email, password }) => {
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          const user = response.user;
          return user;
        } catch (error) {
          if (error.code === "auth/wrong-password") {
            throw new Error("The password is incorrect. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            throw new Error("No account found with this email.");
          } else {
            throw new Error("Failed to sign in. Please try again later.");
          }
        }
      };
      

    const signinWithGoogle = async function() {
        try {
           const response = await signInWithPopup(auth, googleProvider);
           const credential = GoogleAuthProvider.credentialFromResult(response);
           const token = credential.accessToken;
           const user = response.user;
           console.log("user =>", user);
           return user;
        } catch (error) {
           console.log('Error in signIn with Google',error.message)
        }
     };

     const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
        } catch (error) {
          console.error("Error logging out:", error);
          throw error;
        }
      };

     const getCurrentUser = async function() {
        const userRef = doc(db, "users", user?.uid);
        const response = await getDoc(userRef);
        console.log("current User =>",response.data())
        return response.data();
     };

    return (
        <FirebaseContext.Provider value={{signUp, signIn, signinWithGoogle, isLoggedIn, user, logout, getCurrentUser }}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseContext;