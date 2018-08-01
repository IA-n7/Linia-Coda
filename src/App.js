import React, { Component } from "react";
import "./App.css";
import "./User.css";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import { initFirestorter, Collection } from "firestorter";
import { observer } from "mobx-react";
import NavBar from "./components/NavBar";
import {
  createMuiTheme,
  MuiThemeProvider,
  getMuiTheme
} from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";
import User from "./User.js";
import Graphic from "./Graphic.js";
import CenteredGrid from "./gridLayout.js";

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
    this.state = {};
  }

  // getData = () => {
  //   db.collection("Business")
  //     .doc("DxbucRUhcSzfvgSDML6J")
  //     .get()
  //     .then(doc => {
  //       let name = doc.data().Name;
  //
  //       this.setState({
  //         name
  //       });
  //       return name;
  //     });
  // };

  componentDidMount() {
    // this.getData();
  }

  render() {
    // console.log(window.google);
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <NavBar />
        </div>
        <div>
          HELLOOOOO
          {/* <Graphic /> */}
          {/* <CenteredGrid /> */}
          <User
            changeCategoriesDisplay={this.changeCategoriesDisplay}
            categoriesDisplay={this.state.categoriesDisplay}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
