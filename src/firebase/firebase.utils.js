import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDQAQmqIePcpquH-ZY2Saee7NrRxRdgZyI",
  authDomain: "camcover-8f344.firebaseapp.com",
  projectId: "camcover-8f344",
  storageBucket: "camcover-8f344.appspot.com",
  messagingSenderId: "426448216056",
  appId: "1:426448216056:web:d6e5c46c67aa5db351400d",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
