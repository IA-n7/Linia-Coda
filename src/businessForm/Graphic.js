import React, { Component } from 'react';
import db from '../config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import {Line} from 'react-chartjs-2';
import * as firebase from "firebase";
const auth = firebase.auth();

class Graphic extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: "Nicholas",
      name: "WOOO",
      email: "",
      openingHours: 0,
      closingHours: 0

    }
  }


  // getUser = () => {
  //   let loggedUser = this.state.loggedUser.uid
  //   console.log('USSER', loggedUser)
  // }


getUser = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Usserr', user)
    } else {
      console.log('No User')
    }
  });
}


  // getName = () => {
  //   db.collection('Users').doc('zLOG0J18c6VvlVlnLKLxD8Qphp93').get().then(doc => {
  //     let name = doc.data().fullName;
  //     this.setState({
  //      name
  //    });
  //   });
  // }

  // getEmail = () => {
  //   db.collection("Users").doc("zLOG0J18c6VvlVlnLKLxD8Qphp93").get().then(doc => {
  //     let email = doc.data().email;
  //     this.setState({
  //      email
  //    });
  //   });
  // }

  getOpeningHours = () => {
    db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
      let openingHours = doc.data().openingHours;
      this.setState({
       openingHours
     });
    });
    console.log('OOPPPEN', this.props.loggedUser.uid)
  }

  getClosingHours = () => {
    var user = firebase.auth();
    console.log(user)
    db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
      let closingHours = doc.data().closingHours;
      this.setState({
       closingHours
     });
    });
  }


  componentDidMount = () => {
    // this.getName();
    // this.getEmail();
    this.getOpeningHours();
    this.getClosingHours();
    // this.getUser();
  }

  render () {
    const data = {
      labels: this.state.hours,
      datasets: [
        {
          label: "Number of Guest Per Hour",
          fill: true,
          // lineTension: 0.1,
          // backgroundColor: 'rgba(75,192,192,0.4)',
          // borderColor: 'rgba(75,192,192,1)',
          // borderCapStyle: 'butt',
          // borderDash: [],
          // borderDashOffset: 0.0,
          // borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointRadius: 1,
          // pointHitRadius: 10,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9]

        }
      ]
    };
    return (
      <div>
     <Line
       data={data}

       options={{
        maintainAspectRatio: false
      }}
    />
    </div>
    )
  }
}

export default Graphic