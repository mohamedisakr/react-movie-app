import { useState, useEffect } from "react";
import { API_URL, API_KEY } from "../../config";

export const useFetchMovie = () => {
  const [state, setState] = useState({ movies: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMovies = async endPoint => {
    setIsError(false);
    setIsLoading(true);

    const paramters = new URLSearchParams(endPoint);
    if (!paramters.get("page")) {
      setState(prev => ({
        ...prev,
        movies: [],
        searchTerm: paramters.get("query")
      }));
    }

    try {
      const result = await (await fetch(endPoint)).json();
      // console.log(result);
      setState(prev => ({
        ...prev,
        movies: [...prev.movies, ...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }));
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("HomeState")) {
      const persistedState = JSON.parse(sessionStorage.getItem("HomeState"));
      setState({ ...persistedState });
    } else {
      fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
    }
  }, []);

  // Remember state for the next mount if we are not in a search
  useEffect(() => {
    if (!state.searchTerm) {
      sessionStorage.setItem("HomeState", JSON.stringify(state));
    }
  }, [state]);

  return [{ state, isLoading }, fetchMovies];
};
