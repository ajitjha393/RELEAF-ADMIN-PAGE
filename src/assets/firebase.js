import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1vgE0ghH_eNTO25M9C_pS_vFtPoK3eqw",
  authDomain: "help-releaf.firebaseapp.com",
  databaseURL: "https://help-releaf.firebaseio.com",
  projectId: "help-releaf",
  storageBucket: "help-releaf.appspot.com",
  messagingSenderId: "975133254945",
  appId: "1:975133254945:web:885baba3d608c3cdf14a60",
  measurementId: "G-3C1RTRD9F3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
