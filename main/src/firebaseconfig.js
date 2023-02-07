import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDKZ9SfS-b7J2UsZGmDnrtGCUkfSQCP020",
  authDomain: "mission-a-f722e.firebaseapp.com",
  projectId: "mission-a-f722e",
  storageBucket: "mission-a-f722e.appspot.com",
  messagingSenderId: "690956525652",
  appId: "1:690956525652:web:b995fdd6020ed59d0ecdc1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)


