import React, { Component } from "react";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField } from "@material-ui/core";
import { ArrowUpward, ArrowDownward, LocationOn, Email, Phone, AccessTime, AvTimer } from "@material-ui/icons";

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
      currentQueueMembers: [1],
      currentQueueNumber: 1
    };
  }

  guestInfo() {
    var user = firebase.auth().currentUser;
      db.collection("business").doc(user.uid).get().then(doc => {
        let currentQueueMembers = doc.data().currentQueueMembers;
        this.setState({
         currentQueueMembers: currentQueueMembers
      });
      this.callNextQuest()
    });
  }


  callNextQuest() {
    var user = firebase.auth().currentUser;
    let currentQueueMembers = this.state.currentQueueMembers;
    let removeQueueMember = currentQueueMembers.shift()
    db.collection('business').doc(user.uid).set({
        currentQueueMembers: currentQueueMembers
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  showQueue() {
   var user = firebase.auth().currentUser;
    db.collection("business").doc(user.uid).get().then(doc => {
      let currentQueueMembers = doc.data().QArr;
      let QueueLength = currentQueueMembers.length
      this.setState({
       currentQueueMembers: currentQueueMembers,
       currentQueueNumber: QueueLength
      });
    });
  }

  render() {



    return (

      <div> HII

      {this.state.currentQueueNumber}
<br />

        <Button
            type="submit"
            color="secondary"
            variant="raised"
            id="sign-up-submit"
            onClick={this.showQueue.bind(this)}
        >
          Show Queue Details
        </Button>

        <Button
            type="submit"
            color="secondary"
            variant="raised"
            id="sign-up-submit"
            onClick={this.guestInfo.bind(this)}
        >
          Next Guest
        </Button>

      </div>
    );
  }
}

export default QueueUpdate;
