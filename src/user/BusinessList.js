import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
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
  }
});

const BusinessList = props => {
  let onModal = event => {
    console.log("heglawegjnrelkgnalrekngjkl")
  };

  const populateBusinesses = () => {
    let businesses = props.businesses.map(business => {
      let hours = "";
      let minutes = "";
      let openingHours = business.openingHours;

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
              >
                {"Open " +
                  openingHours +
                  "am - Closes " +
                  (business.closingHours - 12) +
                  "pm"}
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
            </CardContent>
            <Divider />
          </div>
        );
      }
      if (props.currentCategory === "") {
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
              >
                {"Open " +
                  openingHours +
                  "am - Closes " +
                  (business.closingHours - 12) +
                  "pm"}
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
    <Card className={classes.root} component="nav" button>
      {populateBusinesses()}
    </Card>
  );
};

BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusinessList);
