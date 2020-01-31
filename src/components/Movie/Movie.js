import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../Navigation/Navigation";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieInfoBar from "../MovieInfoBar/MovieInfoBar";
import Actor from "../Actor/Actor";
import FourColGrid from "../FourColGrid/FourColGrid";
import Spinner from "../Spinner/Spinner";

import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      // First fetch the movie ...
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }

  async fetchItems(endpoint) {
    const { movieId } = this.props.match.params;
    try {
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        // If we don't find any movie
        this.setState({ loading: false });
      } else {
        this.setState({ movie: result });
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        const directors = creditsResult.crew.filter(
          member => member.job === "Director"
        );
        this.setState(
          { actors: creditsResult.cast, directors, loading: false },
          () => {
            localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
          }
        );
      }
    } catch (error) {
      console.log("There is an error: ", error);
    }
  }

  /*
  fetchItems = endpoint => {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          // If we don't find any movie
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            // ... then fetch actors in the setState callback function
            let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(
                  member => member.job === "Director"
                );
                this.setState(
                  {                    actors: result.cast,                    directors,                    loading: false                  },
                  () => {
                    localStorage.setItem(
                      `${movieId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };
  */

  render() {
    // ES6 Destructuring the props and state
    // const { movieName } = this.props.location;
    const { movie, directors, actors, loading } = this.state;

    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            {/* <Navigation movie={movieName} /> */}
            <Navigation movie={movie.title} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </div>
        ) : null}
        {actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {actors.map((element, i) => (
                <Actor key={i} actor={element} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
        {!actors && !loading ? <h1>No movie found</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;

/*
class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    // const {movieId} =
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-us`;
    this.fetchItem(endpoint);
  }

  fetchItem = endpoint => {
    const { movieId } = this.props.match.params;
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        // console.log(result);
        if (result.status_code) {
          // console.log(result.status_code);
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            // console.log("result from fetch method", this.state.movie);
            const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(
                  member => member.job === "Director"
                );
                this.setState({
                  actors: result.cast,
                  directors,
                  loading: false
                });
              });
          });
        }
      })
      .catch(error => console.error("There is an error ", error));
  };

  render() {
    // console.log(this.state.movie);
    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.props.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}
        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, index) => (
                <Actor key={index} actor={element} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found!</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
// */

/*
 */
