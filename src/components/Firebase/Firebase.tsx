import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5d6QQ6nsYErasmbhGKuXt1_Ci59EAADk",
    authDomain: "fullstack-reactform.firebaseapp.com",
    databaseURL: "https://fullstack-reactform-default-rtdb.firebaseio.com",
    projectId: "fullstack-reactform",
    storageBucket: "fullstack-reactform.appspot.com",
    messagingSenderId: "684232908144",
    appId: "1:684232908144:web:d2307114363b23ddff03b5"
};

export const app = initializeApp(firebaseConfig);           //initilizing the storage
export const db  = getFirestore(app);                       //for data to be stored in firestore
