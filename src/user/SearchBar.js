import { Paper } from "@material-ui/core";
import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    // SEARCH BAR HANDLER
    const handleChange = event => {
      event.preventDefault();
      this.setState({ value: event.target.value });
    };

    return (
      <Paper className="search-container">
        <input
          className="search"
          type="text"
          onChange={handleChange}
          placeholder="Search"
        />
      </Paper>
    );
  }
}

export default SearchBar;
