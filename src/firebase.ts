import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0EBukVZpaa_RFGTp04xiF1x3OtuF8Zns",
    authDomain: "holiday-app-66838.firebaseapp.com",
    projectId: "holiday-app-66838",
    storageBucket: "holiday-app-66838.appspot.com",
    messagingSenderId: "359794907329",
    appId: "1:359794907329:web:8e6c03b005328d7abb5c40"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

export {
    db,
    auth
}