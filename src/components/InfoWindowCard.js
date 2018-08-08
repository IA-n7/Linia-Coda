import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography } from '@material-ui/core';
import { Business, LocalPhone, Watch, PermIdentity, AddCircle } from '@material-ui/icons';
import * as firebase from "firebase";
import db from "../config/firebase.js";

const styles = {
  header: {
    fontSize: 20,
    marginLeft: 15,
  },
  button: {
    marginLeft: 50
  },
  rightIcon: {
    marginLeft: 10
  },
  info: {
    marginBottom: 10,
    fontSize: 15,
  }
}


class InfoWindowCard extends Component {

constructor(props) {
    super(props);

    this.state = {
      currentQueueMembers: [],
      currentQueueNumber: 0,
      inQueue: false,
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

  render() {
    const { classes } = this.props;

    return (

          <Card className={classes.card}>
            <div>
              <div>
              <Typography color="primary" className={classes.header}>
                <b>{this.props.business.name}</b>
              </Typography>
              </div>
            </div>
            <CardContent className={classes.content} color="primary">
              <span>
                <Typography className={classes.info} color="primary">
                  <Business />
                  {this.props.business.address}
                </Typography>
              </span>

              <Typography className={classes.info} color="primary">
                <LocalPhone />
                {this.props.business.phoneNumber}
              </Typography>


              <Typography className={classes.info} color="primary">
                <PermIdentity />
                # In Queue: {this.props.business.queueInfo}
              </Typography>

              <Typography className={classes.info} color="primary">
                <Watch />
                Wait Time: {this.props.business.averageWait} minutes
              </Typography>
            </CardContent>
            <Button
              color="secondary"
              className={classes.button}
              variant="raised"
              onClick={this.joinQueue}
            >
              JOIN Q
            <AddCircle className={classes.rightIcon} />
            </Button>
          </Card>
      )
     }
    }

InfoWindowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoWindowCard);


