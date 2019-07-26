import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyD9DjHrHjD2EDkJa19CxoKV6s72PGWmk2w",
    authDomain: "lnf-learning.firebaseapp.com",
    databaseURL: "https://lnf-learning.firebaseio.com",
    projectId: "lnf-learning",
    storageBucket: "lnf-learning.appspot.com",
    messagingSenderId: "488419640521",
    appId: "1:488419640521:web:595b95bcb6a3a2e0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}