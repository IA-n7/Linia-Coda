import React, { Component } from "react";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField } from "@material-ui/core";
import { ArrowUpward, ArrowDownward, LocationOn, Email, Phone, AccessTime } from "@material-ui/icons";
import("./QueueModal.css");

class QueueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQueueMembers: [],
      currentQueueNumber: 0

    };
  }

  joinQueue = () => {
    let userId = this.props.loggedUser.uid;
    let businessId;
    let businessDocRef = db
      .collection("Business")
      .doc("Ok7xpLzj73AY91S985oP");
    let joinButton = document.getElementById("join-queue-button")

    let updatedArray = this.state.currentQueueMembers;
    updatedArray.push(userId);
    businessDocRef.update({
      QueueBoiArray: updatedArray
    });
    this.props.toggleQueue();
  };

  leaveQueue = () => {
    let userId = this.props.loggedUser.uid;
    let businessId;
    let businessDocRef = db
      .collection("Business")
      .doc("Ok7xpLzj73AY91S985oP");

    let updatedArray = this.state.currentQueueMembers;
    let filteredArr = updatedArray.filter(e => e !== userId)
    businessDocRef.update({
      QueueBoiArray: filteredArr
    });
    this.props.toggleQueue();
  };

  getCurrentGuestNumber = () => {
    db.collection("Business")
      .doc("Ok7xpLzj73AY91S985oP")
      .onSnapshot(doc => {
        console.log(doc.data().QueueBoiArray.length);
        this.setState({ currentQueueNumber: doc.data().QueueBoiArray.length });
      });
  };

  getDataFromBusiness = () => {
    db.collection("Business")
      .doc("Ok7xpLzj73AY91S985oP")
      .onSnapshot(doc => {
        console.log(doc.data());
        this.setState({ businessName: doc.data().businessName });
        this.setState({ businessEmail: doc.data().businessEmail });
        this.setState({ businessAddress: doc.data().businessAddress });
        this.setState({ businessPhoneNumber: doc.data().businessPhoneNumber });
        this.setState({ businessClosingHours: doc.data().closingHours });
        this.setState({ businessOpeningHours: doc.data().openingHours });
        this.setState({ currentQueueMembers: doc.data().QueueBoiArray })
      });
  };

  componentDidMount = () => {
    this.getCurrentGuestNumber();
    this.getDataFromBusiness();
    let currentArr = this.state.currentQueueMembers
  };

  render() {
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
            <h3>People in Queue:</h3>
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
