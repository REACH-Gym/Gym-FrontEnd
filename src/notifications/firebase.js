// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMozdyLMddsMitMMN8WhSxVA54VZAtJ8E",
  authDomain: "fireb-bf593.firebaseapp.com",
  projectId: "fireb-bf593",
  storageBucket: "fireb-bf593.appspot.com",
  messagingSenderId: "138413332269",
  appId: "1:138413332269:web:391a8678006d486f4565a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BNQvuI7_uigPluXCa5XoAj4h6Q-Ozv3k-XxZZtA9fPd90G15svBk_MD7r1Ef7IGqeT3lFMUIWPOgb6h1PzWcXdE",
    });
    console.log(token);
  }
};
