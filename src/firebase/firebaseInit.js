import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB724p0mtZrKe4PSJ8rKY3kAQ8KtEdfhSM",
  authDomain: "invoice-app-finalas.firebaseapp.com",
  projectId: "invoice-app-finalas",
  storageBucket: "invoice-app-finalas.appspot.com",
  messagingSenderId: "570004278133",
  appId: "1:570004278133:web:598b39bcffcfcedf06e13c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
