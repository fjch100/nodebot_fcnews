// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq3iPo1JMfgqwvJpwK-5qDI6sK16-c-Dk",
  authDomain: "fcnews-33a3b.firebaseapp.com",
  projectId: "fcnews-33a3b",
  storageBucket: "fcnews-33a3b.appspot.com",
  messagingSenderId: "1039974117962",
  appId: "1:1039974117962:web:c1cc72c85bbd7e214f6cb3",
  measurementId: "G-4YX1ERJ3NE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, "fjch100@yahoo.com", "123456");
    // console.log("current user:", auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};

const signoutHandler = () => {
  signOut(auth)
    .then()
    .catch((err) => console.log(err));
};

const updateDataDb = async (Colection, elementId, data) => {
  try {
    await setDoc(doc(db, Colection, elementId), data);
    logtofile(`Updated Category: ${Colection} ... OK`, false);
  } catch (err) {
    console.log(err);
  }
};
