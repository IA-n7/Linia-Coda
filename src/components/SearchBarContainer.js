import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBar from 'material-ui-search-bar';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from './FloatingActionButton';
import Grid from '@material-ui/core/Grid';
//import LocationSearchInput from './LocationSearchInput.js';



class SearchBarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    currentLatLng: this.props.currentLatLng,
    searchValue: [],
  }
 }

  handleFormSubmit = (submitEvent) => {
     submitEvent.preventDefault();

        this.setState ({
          currentLatLng: this.props.geocodeAddress(this.state.searchValue)
        })
    }


  handleInputChange = (event) => {

    this.setState({
      searchValue: event,
     })
  }

  componentDidMount() {

   this.geocoder = new window.google.maps.Geocoder();

  }

  render() {

    return (

     <div>
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <Grid container spacing={0}>

          <Grid item xs>
           <SearchBar style={{marginLeft: '40%', marginRight: '1%', maxWidth: 800}}
                        placeholder='Search for services near you ...'
                        onChange={this.handleInputChange}
                        handleSelect={this.handleSelect}
                        handleAddressInput={this.handleAddressInput}
                        value={this.state.address}
                        required
           />

          </Grid>
          <Grid item xs={3}>
          <FloatingActionButton />
          </Grid>
        </Grid>
      </form>
    </div>

    )
  }
}

export default SearchBarContainer




























