import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer.js";
import QueueModal from "./components/QueueModal";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { blueGrey, red } from "@material-ui/core/colors";
import "./User.css";
import { observer } from "mobx-react";
import * as firebase from "firebase";
// eslint-disable-next-line
import db from "./config/firebase.js";
import { initFirestorter, Collection } from "firestorter";
import Landing from "./Landing.js";
import User from "./User.js";
import Graphic from "./Graphic.js";
import CenteredGrid from "./gridLayout.js";
import("./Landing.css");
const loadingSpinner = require('./img/lg.palette-rotating-ring-loader.gif')
const auth = firebase.auth();

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      modalShow: false,
      inQueue: false,
      currentLatLng: {
        lat: 0,
        lng: 0
      },
    }
    this.geocodeAddress = this.geocodeAddress.bind(this);
  }

  toggleQueue = () => {
    this.setState({ inQueue: !this.state.inQueue })

  }

  geocodeAddress(address) {
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode({ 'address': address }, this.handleResults.bind(this))
  }

  handleResults = (results, status) => {

    if (status === window.google.maps.GeocoderStatus.OK) {

      this.setState({
        currentLatLng: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
      })

      //this.map.setCenter(results[0].geometry.location);
      //this.marker.setPosition(results[0].geometry.location);

      console.log("APP", this.state.currentLatLng)

    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  }

  authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.state.loggedUser);

      } else {
        this.setState({ loggedUser: null });
        console.log(this.state.loggedUser);
      }
      this.setState({ loading: false })
    })
  };

  toggleModal = e => {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  componentDidMount() {
    this.authListener();

}

  render = () => {

    let loading;
    let user;
    let mapContainer;
    let landing;
    let navbar;
    let modal;
    let modalButton;

    if (this.state.loading == false) {
      if (this.state.loggedUser != null) {
        user = (
          <User currentLatLng={this.state.currentLatLng} loggedUser={this.state.loggedUser} />
        );

        mapContainer = <MapContainer currentLatLng={this.state.currentLatLng} />;
        navbar = <NavBar authListener={this.authListener} geocodeAddress={this.geocodeAddress.bind(this)} currentLatLng={this.state.currentLatLng}
 />
        modalButton = <Button
          id="toggle-modal-button"
          color="secondary"
          variant="raised"
          onClick={this.toggleModal}>
          Toggle Modal
        </Button>

        if (this.state.modalShow === true) {
          modal = <QueueModal inQueue={this.state.inQueue} toggleQueue={this.toggleQueue} toggleModal={this.toggleModal} loggedUser={this.state.loggedUser} />
        }

      } else {
        landing = (
          <Landing
            loggedUser={this.state.loggedUser}
          />
        );
      }
    } else {
      loading = <img src={loadingSpinner} style={{ position: "absolute", left: "40%", top: "35%" }} alt="" />
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {loading}
          {navbar}
          {modalButton}
          {modal}

          {landing}
         {/* {mapContainer}*/}

        </div>

        <div>
          {/* <Graphic /> */}
          {/*<CenteredGrid />*/}
         {user}
        </div>
      </MuiThemeProvider>
    );
  };
}



export default App;
