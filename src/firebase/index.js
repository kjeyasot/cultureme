import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyB7eKAbwSPuPB6tkuwlunu-K-1fVpggQrc",
  authDomain: "cultureme-867cc.firebaseapp.com",
  databaseURL: "https://cultureme-867cc.firebaseio.com",
  projectId: "cultureme-867cc",
  storageBucket: "cultureme-867cc.appspot.com",
  messagingSenderId: "475369293927"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
