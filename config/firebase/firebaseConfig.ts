// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB54RM0UY-jFzSAU8C6ngHgyYYDKL5kL-U",
  authDomain: "expo-react-native-indrive.firebaseapp.com",
  databaseURL: "https://expo-react-native-indrive-default-rtdb.firebaseio.com",
  projectId: "expo-react-native-indrive",
  storageBucket: "expo-react-native-indrive.appspot.com",
  messagingSenderId: "748026576683",
  appId: "1:748026576683:web:fd9aaabe78ccb289798f6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
