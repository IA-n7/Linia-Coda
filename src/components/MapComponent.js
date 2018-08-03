import React from 'react';
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
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgEhsdvD_39T0FWsxHIHX6H5kob8MEBwA",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) => {

    return (
      <GoogleMap
        defaultZoom={14}
        center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
      >

      {props.isMarkerShown && props.allBusinesses.map((business, index) => {
        const onClick = props.onToggleOpen.bind(this, business)
        const position = { lat: business.latitude, lng: business.longitude }
        return (
          <MarkerInfoWindow key={index} position={position} infoWindowContent={business.name}
                            businessAddress={business.address} businessNumber={business.phoneNumber}
                            businessCategory={business.category} queueInfo={business.queueInfo}
                            averageWait={business.averageWait}
          />
        )
      })}
    </GoogleMap>
      )
    }
  );

  export default MapComponent


























