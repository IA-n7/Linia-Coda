import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography } from '@material-ui/core';
import { Business, LocalPhone, Watch, PermIdentity, AddCircle } from '@material-ui/icons';



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

  render() {
    const { classes } = this.props;

    return (

      <div>
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
            <Button variant="contained" color="secondary" className={classes.button}>
              QUEUE
              <AddCircle className={classes.rightIcon} />
            </Button>
          </Card>
      </div>
      )
     }
    }

InfoWindowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoWindowCard);

























