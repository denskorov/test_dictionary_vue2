import firebase from 'firebase/compat'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjBwfhZ2IXRS-OJIwkSMtFAUkaeNvsSbo",
    authDomain: "dictionary-6b5ac.firebaseapp.com",
    projectId: "dictionary-6b5ac",
    storageBucket: "dictionary-6b5ac.appspot.com",
    messagingSenderId: "171498808726",
    appId: "1:171498808726:web:2618f92285f3e1897429b7"
};
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()
