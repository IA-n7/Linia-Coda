const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

var config = {
  apiKey: "AIzaSyB1AFhgecwBScfqIoSG_7JAm6cLPM3KQd4",
  authDomain: "linia-coda.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "linia-coda",
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const settings = {
  timestampsInSnapshots: true
};
let db = firebase.firestore();
db.settings(settings);

export default db


