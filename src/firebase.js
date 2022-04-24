import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB8uR9DgyZNhRWS0QtXW2UDMGDc6q3WD2g",
    authDomain: "demoweb1-17dd3.firebaseapp.com",
    projectId: "demoweb1-17dd3",
    storageBucket: "demoweb1-17dd3.appspot.com",
    messagingSenderId: "714087629679",
    appId: "1:714087629679:web:2976eb0653b96266229e9a",
    measurementId: "G-VFZV0G5S1D"
  };
  
  firebase.initializeApp(firebaseConfig)
  export {firebase}