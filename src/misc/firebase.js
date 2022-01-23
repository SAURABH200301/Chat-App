import firebase from "firebase/app";
import 'firebase/auth'
import  'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDdpw2J8woU5kQVieeIL3gilypU-t5hob0",
    authDomain: "chat-app-49705.firebaseapp.com",
    databaseURL: "https://chat-app-49705-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-app-49705",
    storageBucket: "chat-app-49705.appspot.com",
    messagingSenderId: "685040804044",
    appId: "1:685040804044:web:d35997704b7d265c6ae269"
  };

  const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();
  export const storage =app.storage();