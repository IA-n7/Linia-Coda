import React from "react";
import PropTypes from "prop-types";
import db from "../config/firebase.js";

import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
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
    cursor: "pointer"
  }
});

const BusinessList = props => {
  let onModal = event => {
    db.collection("Business")
      .where("businessName", "==", event.currentTarget.firstChild.innerHTML)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let temp = doc.data();
          temp.id = doc.id;
          props.toggleModal(temp);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  const populateBusinesses = () => {
    // console.log(props);

    let businesses = props.businesses.map(business => {
      let hours = "";
      let minutes = "";
      let distance = (Math.ceil(business.distance / 5) * 5).toString();

      if (business.businessName === "Clinique OPUS") {
        console.log("DISTANCE: ", business.distance);
      }
      if (distance.length <= 3) {
        distance = distance + "m Away";
      } else {
        distance = distance / 1000;
        distance = distance + "km Away";
      }

      let openingHours = business.openingHours;
      let closingHours = business.closingHours - 1200;

      if (business.openingHours.length === 3) {
        hours = business.openingHours.slice(0, 1);
        minutes = business.openingHours.slice(1, 3);
        openingHours = hours + ":" + minutes;
      }
      if (business.openingHours.length === 4) {
        hours = business.openingHours.slice(0, 2);
        minutes = business.openingHours.slice(2, 4);
        openingHours = hours + ":" + minutes;
      }
      if (business.closingHours.length === 3) {
        hours = business.closingHours.slice(0, 1);
        minutes = business.closingHours.slice(1, 3);
        closingHours = hours + ":" + minutes;
      }
      if (business.closingHours.length === 4) {
        hours = business.closingHours.slice(0, 2);
        minutes = business.closingHours.slice(2, 4);
        closingHours = hours + ":" + minutes;
      }

      if (props.currentCategory === business.category) {
        return (
          <div>
            <CardContent onClick={onModal}>
              <Typography className={classes.item} align="center">
                {business.businessName}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
                name={business.businessName}
              >
                {"Open " + openingHours + "am - Closes " + closingHours + "pm"}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {business.businessEmail}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {business.businessPhoneNumber}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {"Average Wait - " + business.averageWait + " minutes"}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {distance}
              </Typography>
            </CardContent>
            <Divider />
          </div>
        );
      }
      if (props.currentCategory === "") {
        return (
          <div>
            <CardContent className={classes.touchMe} onClick={onModal}>
              <Typography className={classes.item} align="center">
                {business.businessName}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {"Open " + openingHours + "am - Closes " + closingHours + "pm"}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {business.businessEmail}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {business.businessPhoneNumber}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {"Average Wait - " + business.averageWait + " minutes"}
              </Typography>
              <Typography
                className={classes.item}
                color="textSecondary"
                align="center"
              >
                {distance}
              </Typography>
            </CardContent>
            <Divider />
          </div>
        );
      }
    });
    return businesses;
  };

  const { classes } = props;

  return (
    <div>
      <Card className={classes.root} component="nav">
        {populateBusinesses()}
      </Card>
    </div>
  );
};

BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusinessList);
