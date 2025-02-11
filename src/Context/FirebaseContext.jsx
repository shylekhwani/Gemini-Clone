import { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const FirebaseContext = createContext();

export const FirebaseContextProvider = function({children}) {

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

  

    return (
        <FirebaseContext.Provider value={{signUp}}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseContext;