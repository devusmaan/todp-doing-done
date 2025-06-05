import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { getDatabase, off, onValue, ref, set } from 'firebase/database';



// type userSaveType = {
//     email: string | null;
//     uid: string;
//   };
  

// export const db = getFirestore(app);


// export async function saveUser(user : userSaveType) {
//   try {
//     const docRef = doc(db, "users", user.uid);
//     await setDoc(docRef, user);
//   } catch (e) {
//     console.log(e);
//   }
// }

// const database = getDatabase(app);

// // // firebasefirestore.tsx

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


// import { ref, set, onValue, getDatabase, off } from "firebase/database"
// import { doc, getFirestore, setDoc } from "firebase/firestore"
// import { app } from "./firebaseconfig"

type userSaveType = {
  email: string | null
  uid: string
}

export const db = getFirestore(app)

export async function saveUser(user: userSaveType) {
  try {
    const docRef = doc(db, "users", user.uid)
    await setDoc(docRef, user)
  } catch (e) {
    console.log(e)
  }
}

const database = getDatabase(app)

export const saveUserData = (userUid: string, cards: any[], tasks: Record<number, string[]>) => {
  const userRef = ref(database, `users/${userUid}`)
  set(userRef, {
    cards,
    tasks,
    lastUpdated: Date.now(),
  })
}

export const subscribeToUserData = (
  userUid: string,
  callback: (data: { cards: any[]; tasks: Record<number, string[]> }) => void,
) => {
  const userRef = ref(database, `users/${userUid}`)
  const unsubscribe = onValue(userRef, (snapshot) => {
    
    const data = snapshot.val()

    // console.log(data.cards);
    if (data)  {
    // if (data && data.cards && data.tasks) {
      callback({
        cards: data.cards,
        tasks: data.tasks,
      })
      }
    // }
  })

  return () => off(userRef, "value", unsubscribe)
}

export const saveCard = (userUid: string, cards: any[]) => {
  const cardsRef = ref(database, `users/${userUid}/cards`)
  set(cardsRef, cards)
}

export const saveTasks = (userUid: string, tasks: Record<number, string[]>) => {
  const tasksRef = ref(database, `users/${userUid}/tasks`)
  set(tasksRef, tasks)
}
