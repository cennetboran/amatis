import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyDsx12NWv4QLMose8Qxb-WQ6RJyAGWBVpk",
    authDomain: "company-5c9e1.firebaseapp.com",
    databaseURL: "https://company-5c9e1.firebaseio.com",
    projectId: "company-5c9e1",
    storageBucket: "company-5c9e1.appspot.com",
    messagingSenderId: "455832724823",
    appId: "1:455832724823:web:0706555c9d2239bab2ca12",
    measurementId: "G-Y897SP1B4W"
  };


  
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();