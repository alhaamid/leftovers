import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}
