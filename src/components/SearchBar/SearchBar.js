import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SearchBar.css";

class SearchBar extends Component {
  state = { query: "" };
  timeout = null;

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }));
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  doSearch = event => {
    // ES6 Destructuring prop
    const { callback } = this.props;
    // const { query } = this.state.query;

    this.setState({ query: event.target.value });
    clearTimeout(this.timeout);
    // Set a timeout to wait for the user to stop writing we don't have to make unnessesary calls
    this.timeout = setTimeout(() => {
      callback(this.state.query);
    }, 500);
  };

  render() {
    // const { query } = this.state.query;

    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          {/* <FontAwesomeIcon className="rmdb-fa-search" name="search" size="2x" /> */}
          {/* <FontAwesomeIcon            className="rmdb-fa-search"            name="search"            size="2x"            icon="search"          /> */}
          <input
            type="text"
            placeholder="Search"
            onChange={event => this.doSearch(event)} //event => this.updateQuery(event.target.value)
            value={this.state.query}
          />
        </div>
        {/* {console.log(this.state.query)} */}
      </div>
    );
  }
}

export default SearchBar;
/*
  timeout = null;

 
  doSearch = event => {
    // ES6 Destructuring prop
    // const { callback } = this.props;

    this.setState({ value: event.target.value });
    // clearTimeout(this.timeout);
    // Set a timeout to wait for the user to stop writing
    // So we don't have to make unnessesary calls
    // this.timeout = setTimeout(() => {
    //   callback(this.state.value);
    // }, 500);
  };
  */

/*
  doSearch(event) {
    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  }
  */
