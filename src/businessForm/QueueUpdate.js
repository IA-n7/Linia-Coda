import React, { Component } from "react";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField } from "@material-ui/core";
import { ArrowUpward, ArrowDownward, LocationOn, Email, Phone, AccessTime, AvTimer } from "@material-ui/icons";
import {Line} from 'react-chartjs-2';

const styles = theme => ({
  button: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  }
});

class QueueUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQueueMembers: [],
      currentQueueNumber: 1
    };
  }


// set state of currentQueue to queboiArr
  guestInfo() {
    let QueueBoiArray;
      db.collection("business").doc(this.props.loggedUser.uid).get().then(doc => {
        QueueBoiArray = doc.data().QueueBoiArray;
        this.setState({
         currentQueueMembers: QueueBoiArray
      });
      this.callNextQuest()
    });
  }


  callNextQuest() {
    let currentQueueMembers = this.state.currentQueueMembers;
    let removeQueueMember = currentQueueMembers.shift()
    console.log('currentQueueMembers THIS', currentQueueMembers)
    console.log('TYYPE', typeof currentQueueMembers)
    this.setState({
      currentQueueMembers: currentQueueMembers
    })
    db.collection('business').doc(this.props.loggedUser.uid).update({
        QueueBoiArray: currentQueueMembers
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  showQueue() {
    let currentQueueMembers;
    let QueueLength;
    db.collection("business").doc(this.props.loggedUser.uid).onSnapshot(doc => {
      currentQueueMembers = doc.data().QueueBoiArray;
      QueueLength = currentQueueMembers.length
      this.setState({
       currentQueueMembers: currentQueueMembers,
       currentQueueNumber: QueueLength
      });
    });
  }

  componentDidMount() {
    this.showQueue()
  }

  render() {
    let firstUserStyle = {
      backgroundColor: '#455a64',
      color: 'white',
      borderRadius: '5px',
      marginLeft: '5px',
      marginRight: '5px',
    }

    const showUsersInQueue = this.state.currentQueueMembers.map((user, index) => {
      if (index === 0) {
        return  <div>
        <p> Current User: </p>
        <h4 style={firstUserStyle}>{user} </h4>
        </div>

      } else {

      return <h3> {user} </h3>

      }
    });

    return (

      <div>
      <br/>
        <Button
            type="submit"
            color="secondary"
            variant="raised"
            id="sign-up-submit"
            onClick={this.guestInfo.bind(this)}
        >
          Call Next Guest
        </Button>
        <br/>
                <br/>
      {showUsersInQueue}
      </div>
    );
  }
}

export default QueueUpdate;
