// @ts-check
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'  

const firebaseConfig = {

    apiKey: "AIzaSyBNOW6W1OyNmk_O7rd5W6C539hFABJgWu4",
    authDomain: "tech-list-96268.firebaseapp.com",
    projectId: "tech-list-96268",
    storageBucket: "tech-list-96268.appspot.com",
    messagingSenderId: "208424612906",
    appId: "1:208424612906:web:050e812247638d6dc93f53"
};
// Initialize Firebase
if (!firebase.apps.length) 
    firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

firebase.getCurrentUser = () =>{
    return new Promise((resolve, reject) =>{
        const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
            unsubscribe()
            resolve(user)
        }, reject)
    })
}

export {db, auth, firebase}
