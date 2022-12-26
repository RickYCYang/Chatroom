var firebase = require('firebase');
var firebaseConfig = {
  apiKey: 'AIzaSyCyEjSsrINoVAlYUKiV7IS_-dcfJ7_PqvE',
  authDomain: 'project-a8988.firebaseapp.com',
  databaseURL: 'https://project-a8988.firebaseio.com',
  projectId: 'project-a8988',
  storageBucket: 'project-a8988.appspot.com',
  messagingSenderId: '429885676455',
  appId: '1:429885676455:web:254853b2791ed5a6e27482',
  measurementId: 'G-E9Z8VY9BC7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
