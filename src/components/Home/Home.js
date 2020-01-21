import React, { Component } from "react";
import HeroImage from "../HeroImage/HeroImage";
import SearchBar from "../SearchBar/SearchBar";
import FourColGrid from "../FourColGrid/FourColGrid";
import MovieThumb from "../MovieThumb/MovieThumb";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Spinner from "../Spinner/Spinner";

import "./Home.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="rmdb--home">
        <HeroImage />
        <SearchBar />
        <FourColGrid />
        <Spinner />
        <LoadMoreButton />
      </div>
    );
  }
}

export default Home;
