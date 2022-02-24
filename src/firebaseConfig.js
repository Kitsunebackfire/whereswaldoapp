// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlPZeU8qupaZAdFAhXdll64GiGi864w7g",
  authDomain: "whereswaldo-6f62a.firebaseapp.com",
  projectId: "whereswaldo-6f62a",
  storageBucket: "whereswaldo-6f62a.appspot.com",
  messagingSenderId: "75017885893",
  appId: "1:75017885893:web:6de56e64b7182da6c878ac",
  measurementId: "G-THQMQENCK8",
};

// step 1 Initialize Firebase
const app = initializeApp(firebaseConfig);

// step 2 init services
const db = getFirestore(app);

// collection ref
export const colRef = collection(db, "coords");

// get collection data // may have to use in main js file.
/*
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});
*/
