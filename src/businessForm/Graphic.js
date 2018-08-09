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
      data: [1, 2, 3, 4, 5, 6, 7],
      label: "Analytics",
    }
    this.hoursArray = this.hoursArray.bind(this);
    this.daysArray = this.daysArray.bind(this);
  }


  getOpeningHours(){
    let openingHours;
    db.collection("Business").doc(this.props.loggedUser.uid).get().then(doc => {
      openingHours = doc.data().openingHours;
      this.setState({
       openingHours: openingHours
     });
    });
  }


  getOpeningHours = () => {
    db.collection("Business").doc(this.props.loggedUser.uid).get().then(doc => {
      let openingHours = doc.data().openingHours;
    })
  }

  getClosingHours = () => {
    let closingHours;
    db.collection("Business").doc(this.props.loggedUser.uid).get().then(doc => {
      closingHours = doc.data().closingHours;
      this.setState({
       closingHours: closingHours
     });
    });
  }

  queueLength(){
    let queueLength;
    let queueArr = [];
    db.collection("Business").doc(this.props.loggedUser.uid).get().then(doc => {
      queueLength = doc.data().QueueBoiArray.length;
      for (let i = 0; i < queueLength; i++) {
        queueArr.push(i);
      }
      this.setState({
       queueArr: [...this.state.queueArr, doc.data()]
     });
    });
  }

  hoursArray(){
    let openingHoursNum = Number(this.state.openingHours);
    let closingHoursNum = Number(this.state.closingHours);
    let hoursArray = [];
    for(let i = openingHoursNum; i <= closingHoursNum; i++){
      let usersPerHour = Math.floor(Math.random() * 10 )
      hoursArray.push(i)
      this.setState({
        labelArray: hoursArray,
        data: [8, 2, 4, 5, 7, 8, 9],
        label: 'NUMBER OF GUESTS PER HOUR'
      })
    }
  }

  daysArray(){
      let daysArray = []
      for(let i = 0; i <= 7; i++){
        daysArray.push(i)
        this.setState({
          labelArray: ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday'],
          data: [4, 3, 2, 6, 3, 7, 8],
          label: 'NUMBER OF GUESTS PER DAY'
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
          label: this.state.label,
          fill: true,
          lineTension: 0.1,
          // color: 'red',
          // borderColor: 'red',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          // pointBorderColor: 'blue',
          // pointBackgroundColor: 'blue',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'red',
          // pointHoverBorderColor: 'blue',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data

        }
      ]
    };
    return (
      <div>
     <Bar
      data={data}
        color='blue'
        options={{
          maintainAspectRatio: true
      }}
    />

    <Button backgrounColor="primary" onClick={this.hoursArray}> Show Guests Per Hour </Button>
    <Button backgrounColor="primary" onClick={this.daysArray}> Show Guests Per Day </Button>
    </div>
    )
  }
}

export default Graphic