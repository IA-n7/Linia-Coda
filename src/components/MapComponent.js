import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';


const MapComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgEhsdvD_39T0FWsxHIHX6H5kob8MEBwA",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={14}
      center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat,
        lng: props.currentLocation.lng }}
        onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>GOES INSIDE INFO WINDOW
            {props.businessInfo.name}
            {props.businessInfo.location}
          </div>
          </InfoWindow>}
        </Marker>
      }
    </GoogleMap>
  );

  export default MapComponent



























