
const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

var config = {
  apiKey: "AIzaSyB1AFhgecwBScfqIoSG_7JAm6cLPM3KQd4",
  authDomain: "linia-coda.firebaseapp.com",
  databaseURL: "https://linia-coda.firebaseio.com",
  projectId: "linia-coda",
  storageBucket: "linia-coda.appspot.com",
  messagingSenderId: "571405232080"
};
firebase.initializeApp(config);

const settings = {
  timestampsInSnapshots: true
};

let db = firebase.firestore();
db.settings(settings);

export default db