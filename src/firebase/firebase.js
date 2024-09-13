// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl8VGRDeOLIJljFK7cAl3rfArLBMDPXqA",
  authDomain: "personal-blog-app-dcaeb.firebaseapp.com",
  projectId: "personal-blog-app-dcaeb",
  storageBucket: "personal-blog-app-dcaeb.appspot.com",
  messagingSenderId: "186540777582",
  appId: "1:186540777582:web:501794bd9dbef56163467f",
  measurementId: "G-JRV147QYK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {app, auth, analytics}