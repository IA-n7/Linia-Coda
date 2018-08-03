import React, { Component } from 'react';
//import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import SearchBar from 'material-ui-search-bar';
import FloatingActionButton from './FloatingActionButton';
import Grid from '@material-ui/core/Grid';


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
     <div>
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <Grid container spacing={0}>

          <Grid item xs>
            <SearchBar
              placeholder="Search for services near you..."
              style={{marginLeft: '20%', marginRight: '1%', maxWidth: 800}}
              onChange={this.handleChange}
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


























