import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import * as firebase from 'firebase'
// eslint-disable-next-line
import db from './config/firebase.js'
import Landing from './Landing.js'
import User from "./User.js";
import Graphic from './Graphic.js';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        HELLOOOOO
        <Landing />
        <Graphic />

        {/* USER COMPONENT RENDERING */}
        <User />
      </div>

      )
    }
  }

//    constructor() {
//      super();
//      this.state = {
//        user: "Nicholas"
//      };
//    }
//    componentDidMount() {
//      db.collection("users").add({
//        first: "Ada",
//        email: "ada@mail.com"
//      })
//      .then(function(docRef) {
//          console.log("Document written with ID: ", docRef.id);
//      })
//      .catch(function(error) {
//          console.error("Error adding document: ", error);
//      });
//      let usersRef = db.collection("users")

//      usersRef.get().then(function(results) {
//        if(results.empty) {
//          console.log("No documents found!");
//        } else {
//          results.forEach(function (doc) {
//            console.log("Document data:", doc.data().first);
//          });
//          console.log("Document data:", results.docs[0].data());
//        }
//      }).catch(function(error) {
//          console.log("Error getting documents:", error);
//      });
//   }

export default App;
