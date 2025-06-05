// import { ref, set, onValue, getDatabase } from "firebase/database";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseconfig";
// import database from "./firebase"
// import database from '/f';



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

// const database = getDatabase(app);

// // firebasefirestore.tsx

// export const saveUserData = (userUid: string, cards: any[], tasks: Record<number, string[]>) => {
//   const userRef = ref(database, `users/${userUid}`);
//   set(userRef, {
//     cards,
//     tasks
//   });
// };

// export const subscribeToUserData = (
//   userUid: string,
//   callback: (data: { cards: any[]; tasks: Record<number, string[]> }) => void
// ) => {
//   const userRef = ref(database, `users/${userUid}`);
//   onValue(userRef, (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       callback(data);
//     }
//   });
// };



