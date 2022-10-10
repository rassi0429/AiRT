import firebase from 'firebase/app'

import 'firebase/auth'

// ** 本番環境
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBfKk3_OlUkYPwnTRlq0OS5BDHRMynUpmw",
    authDomain: "airt-cc.firebaseapp.com",
    projectId: "airt-cc",
    storageBucket: "airt-cc.appspot.com",
    messagingSenderId: "798657714288",
    appId: "1:798657714288:web:343de6551beec834fb7cb5"
  })
}

export default firebase
