// import React from 'react';
// import { Marker } from 'react-google-maps';
// import MarkerIcon from 'location.png';

// class MapMarker extends React {
//   render() {
//     return (
//       <Marker
//         position={this.props.location}
//         icon={MarkerIcon}
//       >
//       </Marker>
//     );
//   }
// }

// export default MapMarker


//// class Map extends Component {

//   constructor() {
//     super();
//     this.state = {
//       //default is Bell Centre in Montreal
//       currentLatLng: {
//         lat: 0,
//         lng: 0
//       },
//       isMarkerShown: false
//     }
//   }

//   ComponentDidMount(){
//     this.getGeoLocation()
//     //this.delayedShowMarker()
// }
//   // delayedShowMarker = () => {
//   //   setTimeout(() => {
//   //     this.getGeoLocation()
//   //     this.setState({
//   //       isMarkerShown: true })
//   //   }, 5000)
//   // }

//   // handleMarkerClick = () => {
//   //   this.setState({ isMarkerShown: false})
//   //   this.delayedShowMarker()
//   // }

//   getGeoLocation = () => {
//        if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(position => {
//           this.setState(prevState => ({
//             currentLatLng: {
//               ...prevState.currentLatLng,
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             },
//             isMarkerShow: true
//           }))
//          }
//         )
//      }
//    }

//   render() {

//     const MapWithMarker = compose (withProps({
//       googleMapURL: "https://maps.googleapis.com/maps/api/js",
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%`}} />,
//     }),
//       withScriptjs,
//       withGoogleMap)
//     ((props) =>
//         <GoogleMap
//           center = {{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
//           defaultZoom = { 14 }
//         >
//           {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat,
//             lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
//         </GoogleMap>
//       );
//     return (
//       <div>
//         <MapWithMarker
//           containerElement={ <div style={{ height: `500px`, width: `500px` }} /> }
//           mapElement={ <div style={{ height: `100%` }} /> }
//           isMarkerShown={this.state.isMarkerShown}
//           currentLocation={this.state.currentLatLng}
//         />
//       </div>
//     );
//   }
// }

// export default Map;