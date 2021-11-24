import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREEBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREEBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREEBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREEBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREEBASE_MESSAGING_SENER_ID,
    appId: process.env.REACT_APP_FIREEBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);