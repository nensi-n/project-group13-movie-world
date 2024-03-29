import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  currentUser,
} from 'firebase/auth';
import { name, userPic, authPostRef, authGoogleRef, logOut } from '../refs';

let photoURL;

const firebaseConfig = {
  apiKey: 'AIzaSyCCCNNONwncDr6dmVOTbLQ5Hi0bbqdtgm0',
  authDomain: 'project-group13-movie-world.firebaseapp.com',
  projectId: 'project-group13-movie-world',
  storageBucket: 'project-group13-movie-world.appspot.com',
  messagingSenderId: '756688360466',
  appId: '1:756688360466:web:539ee931516a72350134cb',
};

// Initialize Firebase
initializeApp(firebaseConfig);

authGoogleRef.addEventListener('click', googleSignInPopup);
logOut.addEventListener('click', signingOut);

// Firing a classic google sign-in pop-up:
function googleSignInPopup() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.languageCode = 'it';
  signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      authCurrentUser();
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

  getUserProfile();
}

function signingOut() {
  const auth = getAuth();
  // [START auth_sign_out]
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error + 'An error occurred!');
    });
  authCurrentUser();
  name.textContent = '';
  userPic.style.backgroundImage = '';
  // [END auth_sign_out_modular]
}

// [START auth_current_user_modular] - выполняется после аутентификации пользователя
function authCurrentUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log('user is signed in!');
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    console.log('No user is signed in!');
    // No user is signed in.
  }
  // [END auth_current_user_modular]
}

function getUserProfile() {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      authGoogleRef.classList.add('visually-hidden');
      logOut.classList.remove('visually-hidden');
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      photoURL = user.photoURL;
      userPic.style.backgroundImage = `url("${photoURL}")`;

      showUsername(user);
    } else {
      authGoogleRef.classList.remove('visually-hidden');

      logOut.classList.add('visually-hidden');
      // User is signed out
    }
  });
  // [END auth_state_listener_modular]
}
getUserProfile();

function showUsername(user) {
  name.textContent = user.displayName;
}
