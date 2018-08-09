import React, { Component } from "react";
import PropTypes from "prop-types";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField } from "@material-ui/core";
import { ArrowUpward, ArrowDownward, LocationOn, Email, Phone, AccessTime, AvTimer } from "@material-ui/icons";
import {Line} from 'react-chartjs-2';

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 280,
    minWidth: 280,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto"
    // maxHeight: 300
  },
  item: {
    fontSize: 10
  },
  touchMe: {
    "&:hover": {
      backgroundColor: "#DCDCDC"
    },
    "&:active": {
      boxShadow: "0 5px #666",
      transform: "translateY(4px)",
      backgroundColor: "darkgrey"
    },
    button: {
      display: 'flex',
      marginTop: theme.spacing.unit * 2,
    },
    borderRadius: '6px',
    border: '.5px solid #e5e5e5',
    marginLeft: '18px',
    marginRight: '18px'
  }
});


class QueueUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQueueMembers: [],
      currentQueueNumber: 1,
      userObj: ""
    };
  }


// set state of currentQueue to queboiArr
  guestInfo(event) {
    event.preventDefault()
    let QueueBoiArray;
      db.collection("Business").doc(this.props.loggedUser.uid).onSnapshot(doc => {
        // set state to the array value of QBoi
        QueueBoiArray = doc.data().QueueBoiArray;
        this.setState({
         currentQueueMembers: QueueBoiArray
      });
      this.callNextQuest()
    });
  }


  callNextQuest() {
    let currentQueueMembers = this.state.currentQueueMembers;
    console.log('CUU', currentQueueMembers)
    let removeQueueMember = currentQueueMembers.shift()
    this.setState({
      currentQueueMembers: currentQueueMembers
    })
    db.collection('Business').doc(this.props.loggedUser.uid).update({
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
    var currentQueueMembers;
    var QueueLength;
    var userQuery;
    var databaseUsers;
    var documentRef;
    var userObj;
    var arrayOfUsers = [];
    db.collection("Business").doc(this.props.loggedUser.uid).onSnapshot(doc => {
      // setting currentQueueMemebers to the array of queuers in the business doc
      currentQueueMembers = doc.data().QueueBoiArray;
      // looping through the array of current queue members, and pulling out the user id to fetch the doc
      currentQueueMembers.map((user) => {
        // with doc fetched, able to pull the data for each user
        db.collection('Users').doc(user).get().then(doc => {
          // userObj set to the value of each user doc
          userObj = doc.data()
          // pushing the user obj to an array
          arrayOfUsers.push(userObj)
          // setting state to have an array with objects of users
          this.setState({
            userObj: arrayOfUsers
          })
        })
      })

      QueueLength = currentQueueMembers.length
      this.setState({
       currentQueueMembers: currentQueueMembers,
       currentQueueNumber: QueueLength
      });
    });
  }

  componentDidMount() {
    this.showQueue();
  }

  render() {
    const {classes} = this.props
    let firstUserStyle = {
      backgroundColor: '#455a64',
      color: 'white',
      borderRadius: '5px',
      marginLeft: '18px',
      marginRight: '18px',
    }

    let getUsers = this.state.userObj
    let user;

    let showUser = [];

    let renderNames;

      for (user in getUsers) {

        showUser.push(getUsers[user])

        renderNames = showUser.map((user, index) => {

          if ( index === 0 ) {
            return <div className={classes.touchMe} style={firstUserStyle}>
            <h4 key={user.email}> {user.fullName} </h4>
              <p> {user.email}</p>
              <p> {user.phoneNumber}</p>
            </div>

          } else {
            return <div className={classes.touchMe} key={user.email} color='primary'> {user.fullName}
                <p> {user.email} </p>
                <p> {user.phoneNumber} </p>
              </div>
          }
        })

      }

    return (
      <div>
        <Button
            type="submit"
            color="secondary"
            variant="raised"
            id="sign-up-submit"
            onClick={this.guestInfo.bind(this)}
        >
          Call Next Guest
        </Button>
        <br />
        <br />
    {renderNames}
        <br/>
        <br/>

      </div>
    );
  }
}

QueueUpdate.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(QueueUpdate);
