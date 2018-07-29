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

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }


  render() {

    const onCategory = event => {
      this.props.changeCategoriesDisplay();
    }

    const handleChange = event => {
      event.preventDefault();
      this.setState({value: event.target.value});
    }

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
      <div>
        {/* <script src="https://maps.googleapis.com/maps/api/js?callback=googleMap"></script> */}
        <h2>I'm the Map!</h2>

        <div className="row">
          <div className="column left">

            <input className="search"
                  type="text"
                  onChange={handleChange}
                  placeholder="Search" />

            <dl>
              <dt className="info-title">
                Average Wait Time:
              </dt>
              <dd className="info-content">
                30 years
              </dd>

              <dt className="info-title">
                Currently in Queue:
              </dt>
              <dd className="info-content">
                350 million
              </dd>

              <dt className="info-title">
                Business:
              </dt>
              <dd className="info-content">
                American Health Care System
              </dd>

              <dt className="info-title">
                Address:
              </dt>
              <dd className="info-content">
                United Stated
              </dd>

              <dt className="info-title">
                Phone:
              </dt>
              <dd className="info-content">
                White House Number: #-###-####-###
              </dd>

              <dt className="info-title">
                Email:
              </dt>
              <dd className="info-content">
                White House Email:
              </dd>

              <dt className="info-title">
                Description:
              </dt>
              <dd className="info-content">
                It's broken.
              </dd>
            </dl>

          </div>

          <div className="column right">
            <div id="map" style={{width:"400px;height:400px"}}></div>
          </div>

        </div>

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
