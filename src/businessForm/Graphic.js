import React, { Component } from 'react';
import db from '../config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import {Bar} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
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
      closingHours: 0,
      labelArray: [],
      queueArr: 0,
    }
    this.hoursArray = this.hoursArray.bind(this);
    this.daysArray = this.daysArray.bind(this);
  }


  getOpeningHours(){
    let openingHours;
    db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
      openingHours = doc.data().openingHours;
      this.setState({
       openingHours: openingHours
     });
    });
  }

  getClosingHours(){
    let closingHours;
    db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
      closingHours = doc.data().closingHours;
      this.setState({
       closingHours: closingHours
     });
    });
  }

  queueLength(){
    let queueLength;
    let queueArr = [];
    db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
      queueLength = doc.data().QueueBoiArray.length;
      for (let i = 0; i < queueLength; i++) {
        queueArr.push(i);
      }
      this.setState({
       queueArr: queueArr
     });
    });
  }

  hoursArray(){
    let openingHoursNum = Number(this.state.openingHours);
    let closingHoursNum = Number(this.state.closingHours);
    let hoursArray = [];
    for(let i = openingHoursNum; i <= closingHoursNum; i++){
      hoursArray.push(i)
      this.setState({
        labelArray: hoursArray
      })
    }
  }

  daysArray(){
      let daysArray = []
      for(let i = 0; i <= 7; i++){
        daysArray.push(i)
        this.setState({
          labelArray: ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']
        })
      }
    }

  componentDidMount(){
    this.getOpeningHours();
    this.getClosingHours();
  }

  render () {
    const data = {
      labels: this.state.labelArray,
      datasets: [
        {
          label: "Number of Guest Per Hour",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'primary',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [1, 3, 2, 6, 3, 7]

        }
      ]
    };
    return (
      <div>
     <Bar
       data={data}

       options={{
        maintainAspectRatio: false
      }}
    />
    <Button onClick={this.hoursArray}> Show Guests Per Hour </Button>
    <Button onClick={this.daysArray}> Show Guests Per Day </Button>
    </div>
    )
  }
}

export default Graphic