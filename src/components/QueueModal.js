import React, { Component } from "react";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { ArrowUpward, ArrowDownward, LocationOn, Email, Phone, AccessTime, AvTimer } from "@material-ui/icons";
import("./QueueModal.css");

class QueueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQueueMembers: [],
      currentQueueNumber: 0,
    };
  }

  joinQueue = () => {
    let userId = this.props.loggedUser.uid;
    let businessDocRef = db
      .collection("Business")
      .doc(this.props.modalBusiness.id);

    let updatedArray = this.state.currentQueueMembers;
    updatedArray.push(userId);
    businessDocRef.update({
      QueueBoiArray: updatedArray
    });
    this.props.toggleQueue();
  };

  leaveQueue = () => {
    let userId = this.props.loggedUser.uid;
    let businessDocRef = db
      .collection("Business")
      .doc(this.props.modalBusiness.id);

    let updatedArray = this.state.currentQueueMembers;
    let filteredArr = updatedArray.filter(e => e !== userId)
    businessDocRef.update({
      QueueBoiArray: filteredArr
    });
    this.props.toggleQueue();
  };

  getCurrentGuestNumber = () => {
    db.collection("Business")
      .doc(this.props.modalBusiness.id)
      .onSnapshot(doc => {
        this.setState({ currentQueueNumber: doc.data().QueueBoiArray.length });
      });
  };

  getDataFromBusiness = () => {
    // console.log(this.props);
    db.collection("Business")
      .doc(this.props.modalBusiness.id)
      .onSnapshot(doc => {
        this.setState({ businessName: doc.data().businessName });
        this.setState({ businessEmail: doc.data().businessEmail });
        this.setState({ businessAddress: doc.data().businessAddress });
        this.setState({ businessPhoneNumber: doc.data().businessPhoneNumber });
        this.setState({ businessClosingHours: this.props.formatClosing(doc.data().closingHours) });
        this.setState({ businessOpeningHours: this.props.formatOpening(doc.data().openingHours) });
        this.setState({ currentQueueMembers: doc.data().QueueBoiArray });
        this.setState({ averageWait: doc.data().averageWait })
      });
  };

  calculateWaitTime = () => {
    let avgWait = this.state.averageWait;
    let currentQueueNumber = this.state.currentQueueNumber
    if (this.props.inQueue === true) {
      currentQueueNumber -= 1
    }
    return avgWait * currentQueueNumber
  }

  componentDidMount = () => {
    this.getCurrentGuestNumber();
    this.getDataFromBusiness();
  };

  render() {

    // Manages the button depending on whether or not the user is in a queue (Managed by App.js state)
    let joinQueueButton;
    if (this.props.inQueue === false) {
      joinQueueButton = <Button
        id="join-queue-button"
        color="secondary"
        variant="raised"
        onClick={this.joinQueue}
      >
        Join Queue
      <ArrowUpward className="arrow-icon" />
      </Button>
    } else {
      joinQueueButton = <Button
        id="leave-queue-button"
        color="secondary"
        variant="raised"
        onClick={this.leaveQueue}
      >
        Leave Queue
    <ArrowDownward className="arrow-icon" />
      </Button>
    }

    return (
          <div className="modal-background">
            <div className="modal">
            <div className="close" onClick={this.props.toggleModal}>
            +
            </div>
            <div className="circle" />
            <div className="circle-information">
              <h5>People in Queue:</h5>
              <Typography id="number-in-queue" component="h1" variant="display1">
                {this.state.currentQueueNumber}
              </Typography>
            </div>
              {joinQueueButton}
            <div className="bottom-part">
            <div className="business-info-container">
              <Typography
                id="business-name-info"
                component="h1"
                variant="display1"
              >
                {this.state.businessName}
              </Typography>
              <div className="business-info-flex">
                <div className="business-info">
                  <p><LocationOn /> Address: {this.state.businessAddress}</p>
                  <p><Email /> Email: {this.state.businessEmail}</p>
                  <p><Phone /> Phone Number: {this.state.businessPhoneNumber}</p>
                  <p>
                    <AccessTime />
                    Opening Hours: {this.state.businessOpeningHours} AM -{" "}
                    {this.state.businessClosingHours} PM
                  </p>
                </div>
              </div>
              <div className="wait-time">
                <h4><AvTimer className="wait-time-icon" /> Approximate Wait Time:</h4>
                <Typography
                id="wait-time-number"
                component="h3"
                variant="display1"
              >
                {this.calculateWaitTime()} minutes
              </Typography>
              </div>
              <form className="queue-modal-phone-number">
                <TextField
                  id="phone-field"
                  name="phone-field"
                  label="Phone Number"
                  type="text"
                  onChange={this.handleChange}
                  margin="normal"
                />
                <br />
                  <Button
                    id="phone-field-submit"
                    type="submit"
                    color="secondary"
                    variant="raised"
                    onClick={this.signUpOnSubmit}
                  >
                    Notify Me!
                  </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QueueModal;
