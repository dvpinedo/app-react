import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAjUQ-M37XYDWLGW4HvtcphOKKXs8-lKgE",
  authDomain: "app-react-51fe1.firebaseapp.com",
  projectId: "app-react-51fe1",
  storageBucket: "app-react-51fe1.appspot.com",
  messagingSenderId: "1012876227072",
  appId: "1:1012876227072:web:ae1f3845203a82c3341ee5",
  measurementId: "G-6CQ75CPKH7"
  };
  
  firebase.initializeApp(firebaseConfig)
  export {firebase}