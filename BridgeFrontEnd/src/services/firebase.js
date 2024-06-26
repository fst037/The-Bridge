import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKHDDtlMJlg0DCXzWPZ7GP5HxioCDBn08",
  authDomain: "bridge-file-storage.firebaseapp.com",
  projectId: "bridge-file-storage",
  storageBucket: "bridge-file-storage.appspot.com",
  messagingSenderId: "456051670382",
  appId: "1:456051670382:web:7be84c3851a63d1a48957f",
  measurementId: "G-9MH892W55G",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
