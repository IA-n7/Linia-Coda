import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();