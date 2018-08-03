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
  const populateBusinesses = () => {
    let businesses = props.businesses.map(business => {
      // business.businessLocation._lat + business.businessLocation._long
      if (props.currentCategory === business.category) {
        return (
          <div>
            <CardContent>
              <Typography className={classes.item} align="center">{business.businessName}</Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {"Open " +
                  business.openingHours +
                  "am - Closes " +
                  (business.closingHours - 12) +
                  "pm"}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {business.businessEmail}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {business.businessPhoneNumber}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
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
            <CardContent>
              <Typography className={classes.item} align="center">{business.businessName}</Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {"Open " +
                  business.openingHours +
                  "am - Closes " +
                  (business.closingHours - 12) +
                  "pm"}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {business.businessEmail}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
                {business.businessPhoneNumber}
              </Typography>
              <Typography className={classes.item} color="textSecondary" align="center">
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
    // className="business-list"
    <Card className={classes.root} component="nav" button>
      {populateBusinesses()}
    </Card>
  );
};

BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusinessList);
