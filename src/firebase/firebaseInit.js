import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDpTrtwFe1jRb5ApmEsFv90KIzHoXlFxXY",
  authDomain: "invoice-app-testas.firebaseapp.com",
  projectId: "invoice-app-testas",
  storageBucket: "invoice-app-testas.appspot.com",
  messagingSenderId: "463459284829",
  appId: "1:463459284829:web:f63f431428f11875ba9ab4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
