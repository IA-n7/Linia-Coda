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
      currentCategory: this.props.currentCategory,
      allBusinesses: [],
      currentLatLng: this.props.currentLatLng,
      infoWindowOpen: false
    }
    this.getGeoLocation();
    this.getLocationsForMap = this.getLocationsForMap.bind(this);
  }

  componentWillReceiveProps(nextProps,prevState) {
    if(nextProps.currentCategory !== prevState.currentCategory){
      this.setState({currentCategory: nextProps.currentCategory})
    }else{
      this.setState({currentLatLng: nextProps.currentLatLng})
    }

    if(nextProps.searchValue == prevState.searchValue){
      this.setState({currentLatLng: nextProps.currentLatLng})
    }
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
    console.log(allBusinesses.latitude)
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
    let businesses;
    if(this.state.currentCategory === undefined || this.state.currentCategory === ''){
      businesses = this.state.allBusinesses;
    }else{
      businesses = this.state.allBusinesses.filter(x=>this.state.currentCategory == x.category)
    }
    return (
      this.state.loading ? <p>loading...</p> : <MapComponent
       isMarkerShown={this.state.isMarkerShown}
       currentLocation={this.state.currentLatLng}
       businessInfo={this.state.businessInfo}
       allBusinesses={businesses}
       currentCategory={this.props.currentCategory}

     />
     )
  }
}

export default MapContainer;



