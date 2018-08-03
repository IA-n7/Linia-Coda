import React, { Component } from 'react';
import db from '../config/firebase.js';
import { initFirestorter, Collection } from 'firestorter';
import { observer } from 'mobx-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import MarkerIcon from './placeIcon.png';
import AddressIcon from './addressIcon.png';
import InfoWindowCard from './InfoWindowCard.js'

class MarkerInfoWindow extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
      loading: true,

    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return(
      <Marker
        position={this.props.position}
        onClick={this.onToggleOpen}
        icon={MarkerIcon}
      >

      {this.state.isOpen &&
         <InfoWindow onCloseClick={this.onToggleOpen}

        options={{
              pane: 'overlayLayer',
              boxStyle: {
                backgroundColor: 'white',
                boxShadow: '3px 3px 10px rgba(0,0,0,0.6)'}}}>


                <InfoWindowCard business={this.props.business}
                />


      </InfoWindow>

      }
      </Marker>)
  }

}

export default MarkerInfoWindow








