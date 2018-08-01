import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper
} from "@material-ui/core";
import React, { Component } from "react";

class MapBusiness extends Component {
  render() {
    return (
      <Paper className="">
        <Card className="map-bottom">
          <CardMedia
            className="logo"
            image="https://pbs.twimg.com/profile_images/378800000328970347/40e96c650dad499b060a4f24ddc68c6e_400x400.png"
            title=""
          />
          <CardContent>
            <Typography component="p">
              Business Average Wait Time: WAIT_DATA<br />
            </Typography>
            <Typography component="p">
              Business Current Queue: QUEUE_DATA<br />
            </Typography>
            <Typography component="p">
              Business Address: ADDRESS_DATA<br />
            </Typography>
            <Typography component="p">
              Business Telephone: TELEPHONE_NUMBER<br />
            </Typography>
            <Typography component="p">
              Business Email: EMAIL_DATA
            </Typography>
            <Typography component="p">
              Business Hours: SCHEDULE_DATA<br />
            </Typography>
            <Typography component="p">
              Business Description: DESCRIPTION_TEXT<br />
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    );
  }
}

export default MapBusiness;
