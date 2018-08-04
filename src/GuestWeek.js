import React, { Component } from 'react';
import db from './config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import {Line} from 'react-chartjs-2';

class GuestWeek extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: "Nicholas",
      name: "WOOO",
      email: "",
      hours: "",
      days: ""
    }
  }

  // getName = () => {
  //   db.collection('Business').doc('DxbucRUhcSzfvgSDML6J').get().then(doc => {
  //     let name = doc.data().name;
  //     this.setState({
  //      name
  //    });
  //   });
  // }

  // getEmail = () => {
  //   db.collection("Users").doc("wpOGjvDtwpsE6C9DQblG").get().then(doc => {
  //     let email = doc.data().email;
  //     this.setState({
  //      email
  //    });
  //   });
  // }


  // getHours = () => {
  //   db.collection('Users').onSnapshot(collection => {
  //     const hours = collection.docs.map(doc => doc.data().hours)
  //     console.log(hours)
  //     this.setState({
  //       hours
  //     })
  //   })
  // }


  getDays = () => {
    db.collection("Business").doc("UyeqsdZi2hX0bU4gJw7V").get().then(doc => {
      let days = doc.data().days;
     //  this.setState({
     //   days
     // });
    });
  }



  componentDidMount = () => {
    // this.getName();
    // this.getEmail();
    this.getDays();
  }

  render () {
    const data = {
      labels: this.state.days,
      datasets: [
        {
          label: "Number of Guest Per Day",
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
          data: [4, 10, 18, 6, 5]

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

export default GuestWeek