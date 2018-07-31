import { Router, Link } from "@reach/router";
import React, { Component } from "react";
import QueueBusiness from "./user/QueueBusiness.js";
import MapBusiness from "./user/MapBusiness.js";
import JoinQueue from "./user/JoinQueue.js";
import SearchBar from "./user/SearchBar.js";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
// eslint-disable-next-line
import {
  createMuiTheme,
  MuiThemeProvider,
  // eslint-disable-next-line
  getMuiTheme
} from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";
// eslint-disable-next-line
import * as firebase from "firebase";
import db from "./config/firebase.js";
// eslint-disable-next-line
import { initFirestorter, Collection } from "firestorter";
// eslint-disable-next-line
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
    this.state = {};
  }

  render() {
    //CATEGORIES DISPLAY HANDLER
    const onCategory = event => {
      this.props.changeCategoriesDisplay();
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div id="hide-me" style={{ display: this.props.categoriesDisplay }}>
          <Paper className="categories">
            <Grid container spacing={24}>
              {/* TOP */}
              <Grid item xs={12} className="categories-align">
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    Something
                  </Link>
                </Card>
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    Clinics
                  </Link>
                </Card>
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    Barbers
                  </Link>
                </Card>
              </Grid>
              {/* BOTTOM */}
              <Grid item xs={12}>
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    DMV
                  </Link>
                </Card>
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    RAMQ
                  </Link>
                </Card>
                <Card className="category">
                  <Link to="map" className="cat-link" onClick={onCategory}>
                    Restaurants
                  </Link>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <Router>
          <MapPage
            path="/map"
            changeCategoriesDisplay={this.props.changeCategoriesDisplay}
          />
          <Queue path="/queue" />
        </Router>
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
    // CATEGORIES DISPLAY HANDLER
    const onCategory = event => {
      this.props.changeCategoriesDisplay();
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <h2>I'm the Map!</h2>

          <Grid container spacing={24}>
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            <Grid item xs={6}>
              <MapBusiness />
            </Grid>
            <Grid item xs={6}>
              <Paper className="">
                <Card className="map-bottom">MAP WILL GO HERE</Card>
              </Paper>
            </Grid>
          </Grid>

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
    return (
      <MuiThemeProvider theme={theme}>
        <h2>I'm the Queue!</h2>

        <Grid container spacing={24}>
          {/* TOP */}
          <Grid item xs={12}>
            <JoinQueue />
          </Grid>

          {/* BOTTOM */}
          <Grid item xs={12}>
            <QueueBusiness />
          </Grid>
        </Grid>

        <div>
          <Link to="../map">Back to Map</Link>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default User;
