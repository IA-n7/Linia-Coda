import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBar from 'material-ui-search-bar';
import FloatingActionButton from './FloatingActionButton';


class SearchBarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    location: {
      latitude: 12,
      longitude: 12
    },
    searchValue: ""
  }
 }




  handleFormSubmit = (submitEvent) => {
     submitEvent.preventDefault();

        this.props.geocodeAddress(this.state.searchValue);

    };

    handleChange = (event) => {
      this.setState({searchValue: event});
    }


  componentDidMount() {

    this.geocoder = new window.google.maps.Geocoder();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <SearchBar
         placeholder="Search for services near you..."
         style={{margin: '0 auto', maxWidth: 800}}
         onChange={this.handleChange}
         required />
        <FloatingActionButton />
      </form>
    )
  }
}

export default SearchBarContainer


























