// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr1FTNonP8bh0kyUPzi07vKX-pKl0hjTs",
  authDomain: "paginaweb-22007.firebaseapp.com>",
  projectId: "paginaweb-22007",
  storageBucket: "paginaweb-22007.firebasestorage.app",
  messagingSenderId: "501925480113",
  appId: "1:501925480113:web:f1fbedac5e6e93c30a8490",
  measurementId: "G-6G3DRPMZH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics NO funciona si estás en modo localhost sin HTTPS
let analytics: any = null;
if (typeof window !== "undefined" && location.protocol === "https:") {
  analytics = getAnalytics(app);
}

export { app, analytics };
