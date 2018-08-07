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

      let openingHours = props.formatOpening(business.openingHours);
      let closingHours = props.formatClosing(business.closingHours);

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
