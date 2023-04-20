import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDEW9LcUbSNEfNPYx9elRumM60gv4A5sMw",
  authDomain: "mix-it-377021.firebaseapp.com",
  projectId: "mix-it-377021",
  storageBucket: "mix-it-377021.appspot.com",
  messagingSenderId: "826317232630",
  appId: "1:826317232630:web:863265467da0a6950c4fd7",
  measurementId: "G-PCQP1SH50G"
};

const app = initializeApp(firebaseConfig);

export { app };
