import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyA86-FUCLjejnJQ7_bYVbBxdCi1JFNJhfA",
  authDomain: "proyectoux-51880.firebaseapp.com",
  databaseURL: "https://proyectoux-51880.firebaseio.com",
  projectId: "proyectoux-51880",
  storageBucket: "proyectoux-51880.appspot.com",
  messagingSenderId: "700500026819",
  appId: "1:700500026819:web:9e076ce41867931d"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {
  firestore as firestore,
  firebase as firebase
}