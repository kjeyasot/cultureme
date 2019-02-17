// src/firebase.js
import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyB7eKAbwSPuPB6tkuwlunu-K-1fVpggQrc",
  authDomain: "cultureme-867cc.firebaseapp.com",
  databaseURL: "https://cultureme-867cc.firebaseio.com",
  projectId: "cultureme-867cc",
  storageBucket: "cultureme-867cc.appspot.com",
  messagingSenderId: "475369293927"
};
firebase.initializeApp(config);
export default firebase;