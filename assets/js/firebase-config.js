
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import{getAuth} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js"
  import {getFirestore} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js"
  
  const firebaseConfig = {
    apiKey: "AIzaSyCWbl957yuC8rHDyRTtB8nDuobRKI-S4ic",
    authDomain: "smart-city-11582.firebaseapp.com",
    projectId: "smart-city-11582",
    storageBucket: "smart-city-11582.firebasestorage.app",
    messagingSenderId: "562174426011",
    appId: "1:562174426011:web:03463604f3b147f90fff3e"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  export {app, auth, db}