import React, { Component } from 'react';
import db from '../config/firebase.js';
import { initFirestorter, Collection } from 'firestorter';
import { observer } from 'mobx-react';
import MapComponent from './MapComponent';
import SearchBar from 'material-ui-search-bar';
import FloatingActionButton from './FloatingActionButton';

class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false,
        businessInfo: {
          name: 'Walk-In Express',
          location: 'Sherbrooke'
        }
    }
  }

  componentWillUpdate() {
    this.getGeoLocation()
  }

  componentDidMount() {
    this.showMarker()
    this.getData()
  }

  getData = () => {
    db.collection('Business').doc('YYMc8S7qv2wPRfYWlqfP').get().then(doc => {
      let name = doc.data().businessName;
      let location = "Montreal";

      this.setState({
        businessInfo: {
          name,
          location
        }
      })
    })
  }

  showMarker = () => {
      this.getGeoLocation()
      this.setState({ isMarkerShown: true })
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.showMarker()
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          this.setState(prevState => ({
            currentLatLng: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
         }))
        }
      )
    }
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
        businessInfo={this.state.businessInfo}

      />
    )
  }
}

export default MapContainer;
