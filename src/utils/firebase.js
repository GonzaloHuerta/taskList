import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq8LEsFOb527qyG7KGOZJiVMS9zcbLveQ",
    authDomain: "tasklist-react.firebaseapp.com",
    databaseURL: "https://tasklist-react.firebaseio.com",
    projectId: "tasklist-react",
    storageBucket: "tasklist-react.appspot.com",
    messagingSenderId: "1022012532208",
    appId: "1:1022012532208:web:e77bafdfc0170c125f6935"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase};
