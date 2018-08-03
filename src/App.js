import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer.js";
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
     categoriesDisplay: "inline",
     loggedUser: null,

     currentLatLng: {
        lat: 0,
        lng: 0
      },
    }

    // BINDING FUNCTION TO SEND AS PROPS
    // this.changeCategoriesDisplay = this.changeCategoriesDisplay.bind(this);
    // this.geocodeAddress = this.geocodeAddress.bind(this);

  }

   geocodeAddress = (address) => {
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode({ 'address': address }, this.handleResults.bind(this))
  }

  handleResults(results, status) {

      if (status === window.google.maps.GeocoderStatus.OK) {

          this.setState({
            currentLatLng: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
          })

        // this.map.setCenter(results[0].geometry.location);
        // this.marker.setPosition(results[0].geometry.location);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }

    }

    authListener = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.state.loggedUser);
      } else {
        this.setState({ loggedUser: null });
        console.log(this.state.loggedUser);
      }
    });
  }
    
  componentDidMount() {

    this.authListener();

}

  render = () => {
    let user;
    let mapContainer;
    let landing;
    let navbar;
    if (this.state.loggedUser == null) {
      landing = (
        <Landing
          authListener={this.authListener}
          loggedUser={this.state.loggedUser}
        />
      );
    } else {
      
      user = <User currentLatLng={this.state.currentLatLng} loggedUser={this.state.loggedUser}/>
      navbar = <NavBar authListener={this.authListener}/>
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <NavBar geocodeAddress={this.geocodeAddress.bind(this)} />
          {landing}
        </div>

        <div>
          {/* <Graphic /> */}
          {/*<CenteredGrid />*/}
          {user}
        </div>
      </MuiThemeProvider>


  );
 }
}

export default App;
