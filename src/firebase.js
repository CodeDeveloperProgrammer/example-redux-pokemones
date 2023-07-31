import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXgSs8MJpmVvu6BlkUvsbo_uBc7zJ1WOU",
  authDomain: "example-redux-pokemones.firebaseapp.com",
  projectId: "example-redux-pokemones",
  storageBucket: "example-redux-pokemones.appspot.com",
  messagingSenderId: "781191125437",
  appId: "1:781191125437:web:e72ceb6d67f940d413dad4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, firebase, db, storage };
