import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6DBUGfDlHyzQY7_f5sgZqxkEhOgSp6IM",
  authDomain: "poster-90252.firebaseapp.com",
  projectId: "poster-90252",
  storageBucket: "poster-90252.appspot.com",
  messagingSenderId: "1012468324012",
  appId: "1:1012468324012:web:2bc33fa376edef493d7109"
};


export const app = initializeApp(firebaseConfig)

export const storage = getStorage();
export const storageRef = ref(storage)