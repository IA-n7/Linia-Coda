import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import FloatingActionButton from './FloatingActionButton';


class SearchBarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    location: {
      latitude: 29.532804,
      longitude: -55.491477
    }
  }
}

  geocodeAddress = (address) => {
    this.geocoder = new window.google.maps.Geocoder();

    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === window.google.maps.GeocoderStatus.OK) {

          this.setState({
            location: {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng()
            }
          })

        // this.map.setCenter(results[0].geometry.location);
        // this.marker.setPosition(results[0].geometry.location);
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }

    }.bind(this));
  };


  handleFormSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    if (this.state.location) {
      var address = this.searchInputElement.value;

      console.log("address", address)
      this.geocodeAddress(address);
    }
  };

  useCurrentLocation = event => {
    event.preventDefault();
    this.setState({ location: "Current Location" });
  }


  componentDidMount() {

    this.geocoder = new window.google.maps.Geocoder();
  }

  setSearchInputElementReference = (inputReference) => {
    this.searchInputElement = inputReference;
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <SearchBar
         placeholder="Search for services near you..."
         style={{margin: '0 auto', maxWidth: 800}}
         ref={this.setSearchInputElementReference} required />
        <FloatingActionButton />
      </form>
    )
  }
}

export default SearchBarContainer


























