import { useContext } from "react"
import FirebaseContext from "../Context/FirebaseContext"

export const useFirebase = function() {
    return useContext(FirebaseContext);
}