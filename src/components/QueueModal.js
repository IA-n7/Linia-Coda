import React, { Component } from "react";
import * as firebase from "firebase";
import db from "../config/firebase.js";
import { Button, Typography, TextField } from "@material-ui/core";
import { ArrowUpward, LocationOn, Email, Phone, AccessTime } from "@material-ui/icons";
import("./QueueModal.css");

class QueueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQueueNumber: 0
    };
  }

  joinQueue = () => {
    let userId = this.props.loggedUser.uid;
    let businessId;
    let updatedArray;
    let businessDocRef = db
      .collection("business")
      .doc("AUHMHg84BiTFLNxJxfBvxv3tCZF2");

    db.collection("business")
      .doc("AUHMHg84BiTFLNxJxfBvxv3tCZF2")
      .get()
      .then(doc => {
        console.log(doc.data().QueueBoiArray);
        updatedArray = doc.data().QueueBoiArray;
      });

    updatedArray.push(userId);
    console.log(updatedArray);
    businessDocRef.updated({
      QueueBoiArray: updatedArray
    });
  };

  getCurrentGuestNumber = () => {
    db.collection("business")
      .doc("AUHMHg84BiTFLNxJxfBvxv3tCZF2")
      .onSnapshot(doc => {
        console.log(doc.data().QueueBoiArray.length);
        this.setState({ currentQueueNumber: doc.data().QueueBoiArray.length });
      });
  };

  getDataFromBusiness = () => {
    db.collection("business")
      .doc("AUHMHg84BiTFLNxJxfBvxv3tCZF2")
      .onSnapshot(doc => {
        console.log(doc.data());
        this.setState({ businessName: doc.data().businessName });
        this.setState({ businessEmail: doc.data().businessEmail });
        this.setState({ businessAddress: doc.data().businessAddress });
        this.setState({ businessPhoneNumber: doc.data().businessPhoneNumber });
        this.setState({ businessClosingHours: doc.data().closingHours });
        this.setState({ businessOpeningHours: doc.data().openingHours });
      });
  };

  componentDidMount = () => {
    this.getCurrentGuestNumber();
    this.getDataFromBusiness();
  };

  render() {
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
          <Button
            id="join-queue-button"
            color="secondary"
            variant="raised"
            onClick={this.joinQueue}
          >
            Join Queue
            <ArrowUpward className="arrow-icon" />
          </Button>
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
                  <p><LocationOn />Address: {this.state.businessAddress}</p>
                  <p><Email />Email: {this.state.businessEmail}</p>
                  <p><Phone />Phone Number: {this.state.businessPhoneNumber}</p>
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
