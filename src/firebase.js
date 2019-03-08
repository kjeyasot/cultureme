// src/firebase.js
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyB7eKAbwSPuPB6tkuwlunu-K-1fVpggQrc",
  authDomain: "cultureme-867cc.firebaseapp.com",
  databaseURL: "https://cultureme-867cc.firebaseio.com",
  projectId: "cultureme-867cc",
  storageBucket: "cultureme-867cc.appspot.com",
  messagingSenderId: "475369293927"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
//export default firebase;

const storage = firebase.storage();
const database = firebase.database()
export {
  storage, database, firebase as default
};