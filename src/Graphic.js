import React, { Component } from 'react';
import db from './config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import {Line} from 'react-chartjs-2';

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

  getName = () => {
    db.collection('Users').doc('zLOG0J18c6VvlVlnLKLxD8Qphp93').get().then(doc => {
      let name = doc.data().fullName;
      this.setState({
       name
     });
    });
  }

  getEmail = () => {
    db.collection("Users").doc("zLOG0J18c6VvlVlnLKLxD8Qphp93").get().then(doc => {
      let email = doc.data().email;
      this.setState({
       email
     });
    });
  }


  // getHours = () => {
  //   db.collection('Users').onSnapshot(collection => {
  //     const hours = collection.docs.map(doc => doc.data().hours)
  //     console.log(hours)
  //     this.setState({
  //       hours
  //     })
  //   })
  // }


  getOpeningHours = () => {
    db.collection("business").doc("WICq27Zd4kT0GkiHu2rUkmHdUzu2").get().then(doc => {
      let openingHours = doc.data().openingHours;
      this.setState({
       openingHours
     });
    });
  }

  getClosingHours = () => {
    db.collection("business").doc("WICq27Zd4kT0GkiHu2rUkmHdUzu2").get().then(doc => {
      let getClosingHours = doc.data().getClosingHours;
      this.setState({
       getClosingHours
     });
    });
  }



  componentDidMount = () => {
    this.getName();
    this.getEmail();
    this.getOpeningHours();
    this.getClosingHours();
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