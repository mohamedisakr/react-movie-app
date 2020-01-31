import React from "react";
import "./MovieThumb.css";
import { Link } from "react-router-dom";

function MovieThumb(props) {
  const { image, movieId, movieName, clickable } = props;
  return (
    <div className="rmdb-moviethumb">
      {clickable ? (
        <Link
          to={{
            pathname: `/${movieId}`,
            movieName: `/${movieName}`
          }}
        >
          <img className="clickable" src={image} alt={movieName} />
        </Link>
      ) : (
        <img className="clickable" src={image} alt={movieName} />
      )}
    </div>
  );
}

export default MovieThumb;
