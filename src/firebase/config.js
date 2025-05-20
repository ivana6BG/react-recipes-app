import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBF7dHVC0vT7N5YaIPzud05ATOtgmzGwJ8",
    authDomain: "recipes-f69de.firebaseapp.com",
    projectId: "recipes-f69de",
    storageBucket: "recipes-f69de.firebasestorage.app",
    messagingSenderId: "317426829969",
    appId: "1:317426829969:web:86c2d253dcdca15fb40d30",
    measurementId: "G-P9NX447YRB"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };