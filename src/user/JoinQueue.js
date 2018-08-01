import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper
} from "@material-ui/core";
import React, { Component } from "react";

class JoinQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    // JOIN QUEUE HANDLER
    const onQueue = event => {
      event.preventDefault();
      this.setState({ value: event.target.value });
    };

    return (
      <Paper className="">
        <Card className="queue-top">
          <CardContent>
            <Typography component="p">
              10<br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className=""
              variant="contained"
              color="primary"
              onClick={onQueue}
            >
              Join Queue
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

export default JoinQueue;
