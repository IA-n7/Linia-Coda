import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper
} from "@material-ui/core";
import React, { Component } from "react";

class QueueBusiness extends Component {
  render() {
    return (
      <Paper className="">
        <Card className="queue-bottom">
          <CardMedia
            className="logo"
            image="https://pbs.twimg.com/profile_images/378800000328970347/40e96c650dad499b060a4f24ddc68c6e_400x400.png"
            title=""
          />
          <CardContent>
            <Typography component="p">
              Business Average Wait Time Here.<br />
            </Typography>
            <Typography component="p">
              Business Address Here.<br />
            </Typography>
            <Typography component="p">
              Business Telephone Here.<br />
            </Typography>
            <Typography component="p">
              Business Hours Here.<br />
            </Typography>
            <Typography component="p">
              Business Description Here.<br />
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    );
  }
}

export default QueueBusiness;
