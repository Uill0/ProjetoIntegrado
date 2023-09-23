// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase } from "firebase/database";

export const environment = {
  firebase: {
    projectId: 'projeto-integrado-cb4bc',
    appId: '1:713145876692:web:f16b29d707a4968d253b41',
    storageBucket: 'projeto-integrado-cb4bc.appspot.com',
    apiKey: 'AIzaSyDFAk9QDV_ECYocu9hv4c6jxUI2xXXjGmc',
    authDomain: 'projeto-integrado-cb4bc.firebaseapp.com',
    messagingSenderId: '713145876692',
    measurementId: 'G-VLH93BTG0S',
  },}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFAk9QDV_ECYocu9hv4c6jxUI2xXXjGmc",
  authDomain: "projeto-integrado-cb4bc.firebaseapp.com",
  projectId: "projeto-integrado-cb4bc",
  storageBucket: "projeto-integrado-cb4bc.appspot.com",
  messagingSenderId: "713145876692",
  appId: "1:713145876692:web:f16b29d707a4968d253b41",
  measurementId: "G-VLH93BTG0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // O usuário está autenticado, 'user' contém informações sobre o usuário
    console.log('Usuário autenticado:', user);
  } else {
    // O usuário não está autenticado, 'user' é nulo
    console.log('Usuário não autenticado');
  }
});