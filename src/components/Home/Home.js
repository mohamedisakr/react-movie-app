import React from "react";
import HeroImage from "../HeroImage/HeroImage";
import SearchBar from "../SearchBar/SearchBar";
import FourColGrid from "../FourColGrid/FourColGrid";
import MovieThumb from "../MovieThumb/MovieThumb";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Spinner from "../Spinner/Spinner";
import useFetchMovie from "./useFetchMovie";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";

import "./Home.css";

function Home() {
  const [{ state, isLoading }, fetchMovies] = useFetchMovie;
  const searchItems = searchTerm => {
    let endPoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;

    if (!searchTerm) {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    }
    console.log(endPoint);
    fetchMovies(endPoint);
  };

  const loadMoreItems = () => {
    // const { searchTerm, currentPage } = state;
    let endPoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${
      state.searchTerm
    }&page=${state.currentPage + 1}`;

    if (!state.searchTerm) {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${state.currentPage +
        1}`;
    }

    fetchMovies(endPoint);
  };

  return (
    <div className="rmdb-home">
      {state.heroImage && !state.searchTerm ? (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            title={state.heroImage.original_title}
            // title={state.heroImage.title}
            text={state.heroImage.overview}
          />
        </div>
      ) : null}
      <SearchBar callback={searchItems} />
      <div className="rmdb-home-grid">
        <FourColGrid
          header={state.searchTerm ? "Search Result" : "Popular Movies"}
          loading={isLoading}
        >
          {state.movies.map((element, index) => {
            return (
              <MovieThumb
                key={index}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </FourColGrid>
        {isLoading ? <Spinner /> : null}
        {state.currentPage < state.totalPages && !isLoading ? (
          <LoadMoreButton text="Load More" onClick={loadMoreItems} />
        ) : null}
      </div>
    </div>
  );
}

export default Home;

/*
class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    if (localStorage.getItem("HomeState")) {
      const state = JSON.parse(localStorage.getItem("HomeState"));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=1`;
      this.fetchItems(endPoint);
    }
  }

  async fetchItems(endPoint) {
    const { movies, heroImage, searchTerm } = this.state;
    try {
      const result = await (await fetch(endPoint)).json();
      this.setState(
        {
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        },
        () => {
          if (this.state.searchTerm === "") {
            localStorage.setItem("HomeState", JSON.stringify(this.state));
          }
        }
      );
    } catch (error) {
      console.log("There is an error: ", error);
    }
  }


  searchItems(searchTerm) {
    console.log(searchTerm);
    let endPoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm.trim() == "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=${this
        .state.currentPage + 1}`;
    } else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-us&query=${this.state.searchTerm}`;
    }

    this.fetchItems(endPoint);
  }

  loadMoreItems() {
    const { searchTerm, currentPage } = this.state;
    let endPoint = "";
    this.setState({ loading: true }); //(currentState => ({ loading: true }));
    console.log(this.state.loading);
    if (searchTerm.trim() == "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-us&page=${currentPage +
        1}`;
    } else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-us&query=${searchTerm}&page=${currentPage +
        1}`;
    }
    this.fetchItems(endPoint);
  }

  render() {
    const {
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
      searchTerm
    } = this.state;
    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              // title={heroImage.original_title}
              title={heroImage.title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm.trim() ? "Search Result" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((element, index) => {
              return (
                <MovieThumb
                  key={index}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : "./images/no_image.jpg"
                  }
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages && !loading ? (
            <LoadMoreButton text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
*/
