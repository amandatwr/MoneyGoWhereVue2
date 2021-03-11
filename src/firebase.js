import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCma1wGsNxYcdIrFizxXglzz6CehXFI9gE",
  authDomain: "moneygowhere-ea1df.firebaseapp.com",
  projectId: "moneygowhere-ea1df",
  storageBucket: "moneygowhere-ea1df.appspot.com",
  messagingSenderId: "32380834517",
  appId: "1:32380834517:web:104292b5c17c2acb85085c",
  measurementId: "G-TXL39TZVKY",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
