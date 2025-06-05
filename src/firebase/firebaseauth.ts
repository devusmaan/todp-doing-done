import { Auth, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { saveUser } from "./firebasefirestore";
import { app } from '@/firebase/firebaseconfig';
import toast from "react-hot-toast";




export const auth = getAuth(app);

export function SignupForm(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            // const user = userCredential.user;
            const { uid, email } = userCredential.user;
            
            sendEmailVerification(auth.currentUser as User);
            // console.log(user, 'user created successfully.');
            toast.dismiss()
            toast.success("Sign up successfully", {
                duration: 600
            })

            saveUser({ email: email as string, uid });

            // setError("");


        })
        .catch((error) => {
          

            if (error instanceof FirebaseError) {
                if (error.code === "auth/email-already-in-use") {
                    toast.dismiss()
                    toast.error("Email already in use.", {
                        duration: 1000
                    })

                    // setError("Email already in use.");
                } else if (error.code === "auth/missing-password") {
                    toast.dismiss()
                    toast.error("Please fill in password!", {
                        duration: 1000
                    })

                    // setError("Please fill in password!");
                } else if (error.code === "auth/invalid-email") {
                    toast.dismiss()
                    toast.error("Invalid Email, please correct.", {
                        duration: 1000
                    })

                    // setError("Invalid Email, please correct.");
                } else {
                    toast.dismiss()
                    toast.error(error.message, {
                        duration: 1000
                    })

                    // setError(error.message);
                };
            }

            // setTimeout(() => {
            //     setError("");
            // }, 3000);
        });
}



export function loginForm(email: string, password: string) {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
           
            const user = userCredential.user;
            toast.dismiss()
            toast.success("login successfully", {
                duration: 600
            })
            // sendEmailVerification(auth.currentUser as User);
            // console.log(user);
          if (user.emailVerified) {
                // router.push("/")
                // console.log('Email is verified. User can log in.')
             } else {
                // router.push("/emailverification")
                // setError("Email is not verified. Please check your email.")
             }

        })
        .catch(() => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // console.error(errorMessage, 'already login your account.');
            // setError("Incorrect Email or Password")
            toast.dismiss()
            toast.error("Invalid Email, or Password.", {
                duration: 1000
            })
        });
}


export function emailVerification() {

    const auth = getAuth(app);
    sendEmailVerification(auth.currentUser as User)
        .then(() => {
            
            toast.dismiss()
            toast.success("Email verifcation send successfully", {
                duration: 1000
            })


            // console.log(success, "Email verifcation send successfully")

        });
}




export function signOutUser(auth: Auth) {
    signOut(auth).then(() => {
        toast.dismiss()
        toast.success("Logout successfully", {
            duration: 600
        })


        // console.log("Logout successfully");
    }).catch(() => {
        console.log("An error happened");

    });
}

