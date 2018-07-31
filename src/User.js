import { Router, Link, navigate } from "@reach/router";
import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        {/*<div><Link to="map">Clinics</Link></div>
        <div><Link to="map">Restaurants</Link></div>
        <div><Link to="map">Hairdressers</Link></div>
        <div><Link to="map">RAMQ</Link></div>
        <div><Link to="map">DMV</Link></div>
        <div><Link to="map">Something Else</Link></div>
        <Router>
          <Map path="/map" />
          <Queue path="/queue" />
        </Router>*/}
        <h3>User Component</h3>
      </div>
    );
  }
}

// const Map = (props) => (

//   <div>
//     <h2>I'm the Map!</h2>
//     <div><Link to="../queue">Queue here!</Link></div>
//   </div>
// );

// const Queue = () => (
//       <div>
//         <h2>I'm the Queue!</h2>
//       </div>
// );

export default User;
