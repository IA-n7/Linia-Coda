import { Router, Link } from "@reach/router";
import React, { Component } from 'react';

class User extends Component {

  render() {

    const onCategory = evt => {
      this.props.changeCategoriesDisplay();
    }

    return (
      <div>

        <div id="hide-me" style={{display: this.props.categoriesDisplay}}>
          <div className="categories">
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                Clinics</Link>
            </span>
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                Restaurants</Link>
              </span>
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                Barbers</Link>
              </span>
          </div>

          <div className="categories">
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                RAMQ</Link>
              </span>
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                DMV</Link>
              </span>
            <span className="category">
              <Link to="map"
                className="cat-link"
                onClick={onCategory}>
                Something</Link>
              </span>
          </div>
        </div>

        <Router>
          <MapPage path="/map" changeCategoriesDisplay={this.props.changeCategoriesDisplay}/>
          <Queue path="/queue" />
        </Router>
      </div>
    );
  }
}

class MapPage extends Component {

  render() {

    const onCategory = evt => {
      this.props.changeCategoriesDisplay();
    }

    return (
      <div>
        <h2>I'm the Map!</h2>
        <div><Link to="../queue">Queue here!</Link></div>
        <div><Link to="/" onClick={onCategory}>Back to Categories</Link></div>
      </div>
    );
  }
}

class Queue extends Component {

  render() {
    return (
      <div>
        <h2>I'm the Queue!</h2>
        <div><Link to="../map">Back to Map</Link></div>
      </div>
    );
  }
}

export default User;
