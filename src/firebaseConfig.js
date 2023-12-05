import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from
"firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
"firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUUWM374baWJkCweOoArZ2nFbAfT-OvrQ",
    authDomain: "templatecrudmui.firebaseapp.com",
    projectId: "templatecrudmui",
    storageBucket: "templatecrudmui.appspot.com",
    messagingSenderId: "736622738787",
    appId: "1:736622738787:web:e2b7dde1d5c81f1633a756"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;
const GithubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, GithubProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
        });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);  
};
export {
    auth,
    db,
    signInWithGoogle,
    logout,
};
