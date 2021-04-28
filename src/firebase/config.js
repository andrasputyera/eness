import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCIKOgLHyIhjdhav4HLCsZvmGUMSNSFElY",
    authDomain: "vue-2-eness.firebaseapp.com",
    projectId: "vue-2-eness",
    storageBucket: "vue-2-eness.appspot.com",
    messagingSenderId: "77741885087",
    appId: "1:77741885087:web:87d69005efb6597996c4aa"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export default projectFirestore

