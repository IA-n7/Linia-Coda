import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Grid from '@material-ui/core/Grid';
import db from '../config/firebase.js'
// import Example from './Countdown.js'
import Countdown from './Countdown'
import PeopleCount from './PeopleCount'


class QueueSelect extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: "Nicholas",
      name: "WOOO",
      email: "",
      hours: ""
    }
  }

  getName = () => {
    console.log('QUUUU', this.props.loggedUser.uid)
    db.collection('Users').doc(this.props.loggedUser.uid).get().then(doc => {
     //  let name = doc.data().fullName;
     //  this.setState({
     //   name
     // });
    });
  }

  componentDidMount = () => {
    this.getName();
  }

  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

    return (
      <div>
    COUNTDOWN -->test connection to DB:   {this.state.name}
        <Countdown date={`${year}-12-24T00:00:00`} />
        <br/>
        <br/>


      PEOPLE COUNT
        <PeopleCount  loggedUser={this.props.loggedUser}/>
      </div>
    );
  }
}

export default QueueSelect;


