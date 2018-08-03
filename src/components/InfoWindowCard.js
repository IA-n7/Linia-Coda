import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {

}


class InfoWindowCard extends Component {

  render() {
    const { classes } = this.props;

    return (

      <div>
            <div className = "header">
            <b>{this.props.infoWindowContent}</b> <br/>
            <br/>
            <img src="./addressIcon.png" />{this.props.businessAddress} <br/>
            {this.props.businessNumber} <br/>
            <p># of People in Queue: {this.props.queueInfo}</p>
            <p>Average Wait Time: {this.props.averageWait}</p>
            </div>
      </div>


      )
  }
}

InfoWindowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoWindowCard);

























