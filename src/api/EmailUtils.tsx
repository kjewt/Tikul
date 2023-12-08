import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export const IsEmailDuplicate = (email: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, "password")
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            console.log(error.code, error.message)
        })

}