import React, { Component } from 'react';
import db from './config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';

class Graphic extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     speed: 10
  //   }
  //   this.renderGraphs = this.renderGraphs.bind(this)
  // }

  // componentDidMount() {
  // }

  // renderGraphs() {
  //   const businessRef = db.collection("Business").doc("DxbucRUhcSzfvgSDML6J")

  //   businessRef.get().then(function(doc) {
  //     if (doc.exists) {
  //       this.setState({
  //         name: doc.data().Name
  //       })
  //     } else {
  //       console.log("No such document!");
  //     }
  //   }).catch(function(error) {
  //     console.log('error', error)
  //   });
  // }


  render () {
    return (
      <div>GRAPHICS HERE

      </div>
      )
  }
}

export default Graphic
