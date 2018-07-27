import React, { Component } from 'react';
import db from './config/firebase.js'

class Graphic extends Component {
  constructor() {
    super()
    db.collection('Business').doc('DxbucRUhcSzfvgSDML6J').get().then(function(doc) {
      console.log(doc.data())
    })
  }
  render () {
    return (
      <div>GRAPHICS HERE

      </div>
      )
  }
}

export default Graphic;