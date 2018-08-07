import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import MarkerInfoWindow  from './MarkerInfoWindow.js';


const MapComponent = compose(withStateHandlers(() => ({
    isOpen: false, //create initial state
  }), { //state handlers
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgEhsdvD_39T0FWsxHIHX6H5kob8MEBwA&libraries=places&",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) => {

    const currentLocation = props.currentLocation;
    console.log(currentLocation)
    return (
      <GoogleMap
        defaultZoom={14}
        center={currentLocation}
      >

      {props.isMarkerShown && props.allBusinesses.map((business, index) => {
        const onClick = props.onToggleOpen.bind(this, business)
        const position = { lat: business.latitude, lng: business.longitude }
        return (
          <MarkerInfoWindow key={index} position={position} business={business}
          />
        )
      })}
    </GoogleMap>
      )
    }
  );

  export default MapComponent
