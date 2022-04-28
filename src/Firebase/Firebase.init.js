import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWy8kw-jtdteh0UUPvuurXofzk1G94XqQ",
  authDomain: "gizmo-freak.firebaseapp.com",
  projectId: "gizmo-freak",
  storageBucket: "gizmo-freak.appspot.com",
  messagingSenderId: "996895541495",
  appId: "1:996895541495:web:2d1527b858ed829653abf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;