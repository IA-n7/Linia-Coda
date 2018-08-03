import React, { Component } from 'react';
import db from '../config/firebase.js';
import { initFirestorter, Collection } from 'firestorter';
import { observer } from 'mobx-react';
import MapComponent from './MapComponent';
import SearchBar from 'material-ui-search-bar';
import FloatingActionButton from './FloatingActionButton';

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isMarkerShown: true,
        businessInfo: [
          {
                  businessName: 'Walk-In Express',
                  businessLatitude: [],
                  businessLongitude: []
                }],

        currentLatLng: this.props.currentLatLng,
        infoWindowOpen: false
    }
    this.getGeoLocation();
    this.getLocationsForMap = this.getLocationsForMap.bind(this);
  }

  componentWillReceiveProps(props) {

    this.setState({currentLatLng: props.currentLatLng})

  }

  componentDidMount() {
    this.showMarker()
    this.getLocationsForMap()
  }

  getLocationsForMap() {

    let allBusinesses = [];
   const self = this;

    db.collection('Business').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

       let businessInfo = {
          id: doc.id,
          name: doc.data().businessName,
          latitude: doc.data().businessLocation.latitude,
          longitude: doc.data().businessLocation.longitude,
          address: doc.data().businessAddress,
          phoneNumber: doc.data().businessPhoneNumber,
          category: doc.data().category,
          queueInfo: doc.data().QueueBoiArray.length,
          averageWait: doc.data().averageWait,
        }

        allBusinesses.push(businessInfo);

      });

    self.setState({
        loading: false,
        allBusinesses: allBusinesses
      });
    });

   }

  showMarker = () => {
      this.setState({ isMarkerShown: true })
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
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
      this.state.loading ? <p>loading...</p> : <MapComponent
       isMarkerShown={this.state.isMarkerShown}
       currentLocation={this.state.currentLatLng}
       businessInfo={this.state.businessInfo}
       allBusinesses={this.state.allBusinesses}

     />
     )
  }
}

export default MapContainer;



