import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_590sSOAWfMT-BrZTxNcF2Ka8Fr-d37g",
    authDomain: "musical-entanglement.firebaseapp.com",
    databaseURL: "https://musical-entanglement-default-rtdb.firebaseio.com",
    projectId: "musical-entanglement",
    storageBucket: "musical-entanglement.appspot.com",
    messagingSenderId: "625311038701",
    appId: "1:625311038701:web:2d61a3844d4160817f60e4",
    measurementId: "G-KW264J59LZ"
  };

  // init fb
  firebase.initializeApp(firebaseConfig);

  // init services
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const ts = firebase.firestore.Timestamp;
  const stor = firebase.storage();

  export {fs, auth, ts, stor};