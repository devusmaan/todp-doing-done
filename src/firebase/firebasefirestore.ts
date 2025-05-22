import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseconfig";



type userSaveType = {
    email: string | null;
    uid: string;
  };
  

export const db = getFirestore(app);


export async function saveUser(user : userSaveType) {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (e) {
    console.log(e);
  }
}



