import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyC8i5bb1QC7aHSVSXmbDeRcuUeXM_UypN0",
  authDomain: "blue-eagle-8b0b9.firebaseapp.com",
  databaseURL: "https://blue-eagle-8b0b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blue-eagle-8b0b9",
  storageBucket: "blue-eagle-8b0b9.appspot.com",
  messagingSenderId: "1032580801290",
  appId: "1:1032580801290:web:4bc08d5ebf4172b49c10f3",
  measurementId: "G-7FL6EWSTVG"
};

firebase.initializeApp(config);

export default firebase.database();
