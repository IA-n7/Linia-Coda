import { Router, Link } from "@reach/router";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  getMuiTheme
} from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import { initFirestorter, Collection } from "firestorter";
import { observer } from "mobx-react";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[700],
      dark: blueGrey[900]
    },
    secondary: {
      light: red[500],
      main: red[800],
      dark: red[900]
    }
  }
});

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "WOOO"
    };
  }

  getData = () => {
    db.collection("Business")
      .doc("DxbucRUhcSzfvgSDML6J")
      .get()
      .then(doc => {
        let name = doc.data().Name;

        this.setState({
          name
        });
        return name;
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const onCategory = event => {
      this.props.changeCategoriesDisplay();
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div id="hide-me" style={{ display: this.props.categoriesDisplay }}>
            <div className="categories">
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  Clinics
                </Link>
              </span>
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  Restaurants
                </Link>
              </span>
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  Barbers
                </Link>
              </span>
            </div>

            <div className="categories">
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  RAMQ
                </Link>
              </span>
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  DMV
                </Link>
              </span>
              <span className="category">
                <Link to="map" className="cat-link" onClick={onCategory}>
                  Something
                </Link>
              </span>
            </div>
          </div>

          <Router>
            <MapPage
              path="/map"
              changeCategoriesDisplay={this.props.changeCategoriesDisplay}
            />
            <Queue path="/queue" />
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      name: "WOOO"
    };
  }

  getData = () => {
    db.collection("Business")
      .doc("DxbucRUhcSzfvgSDML6J")
      .get()
      .then(doc => {
        let name = doc.data().Name;

        this.setState({
          name
        });
        return name;
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const onCategory = event => {
      this.props.changeCategoriesDisplay();
    };

    const handleChange = event => {
      event.preventDefault();
      this.setState({ value: event.target.value });
    };

    // const googleMap = () => {
    //   const mapOptions = {
    //       center: new google.maps.LatLng(0, 0),
    //       zoom: 10,
    //       mapTypeId: google.maps.MapTypeId.HYBRID
    //   }
    //
    //   const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {/* <script src="https://maps.googleapis.com/maps/api/js?callback=googleMap"></script> */}
          <h2>I'm the Map!</h2>

          <div className="row">
            <div className="column left">
              <input
                className="search"
                type="text"
                onChange={handleChange}
                placeholder="Search"
              />

              <dl>
                <dt className="info-title">Average Wait Time:</dt>
                <dd className="info-content">30 years</dd>

                <dt className="info-title">Currently in Queue:</dt>
                <dd className="info-content">350 million</dd>

                <dt className="info-title">Business:</dt>
                <dd className="info-content">American Health Care System</dd>

                <dt className="info-title">Address:</dt>
                <dd className="info-content">United Stated</dd>

                <dt className="info-title">Phone:</dt>
                <dd className="info-content">
                  White House Number: #-###-####-###
                </dd>

                <dt className="info-title">Email:</dt>
                <dd className="info-content">White House Email:</dd>

                <dt className="info-title">Description:</dt>
                <dd className="info-content">It's broken.</dd>
              </dl>
            </div>

            <div className="column right">
              <div id="map" />
            </div>
          </div>

          <div>
            <Link to="../queue">Queue here!</Link>
          </div>
          <div>
            <Link to="/" onClick={onCategory}>
              Back to Categories
            </Link>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "WOOO"
    };
  }

  getData = () => {
    db.collection("Business")
      .doc("DxbucRUhcSzfvgSDML6J")
      .get()
      .then(doc => {
        let name = doc.data().Name;

        this.setState({
          name
        });
        return name;
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const onQueue = event => {
      event.preventDefault();
      this.setState({ value: event.target.value });
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <h2>I'm the Queue!</h2>

          <div className="queue-area">
            <Card className="queue-number">
              <CardContent>
                <Typography component="p">
                  10<br />
                </Typography>
              </CardContent>
            </Card>
            <Button
              className="join-queue"
              variant="contained"
              color="primary"
              onClick={onQueue}
            >
              Join Queue
            </Button>
          </div>

          <div className="row">
            <div className="column left business-icon">
              <CardMedia
                className="logo"
                image="https://pbs.twimg.com/profile_images/378800000328970347/40e96c650dad499b060a4f24ddc68c6e_400x400.png"
                title=""
              />
            </div>

            <div className="column right">
              <Card className="business-info">
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
            </div>
          </div>

          <div>
            <Link to="../map">Back to Map</Link>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default User;
