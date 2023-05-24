import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./stream.css";
import Youtube from "react-youtube";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Stream = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const API_KEY = "5e441fb1f18cc51011e1df183cb5ade6"; // Your API key
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [genres, setGenres] = useState([
    { id: 99, name: "Currently on Cinema" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 80, name: "Crime" },
    { id: 10749, name: "Romance" },
  ]);

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover";
      const response = await axios.get(`${API_BASE_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });

      const movieId = response.data.results[0].id;
      const movieData = await fetchMovie(movieId);
      const movieVideos = await fetchVideos(movieId);

      setSelectedMovie({ ...movieData, videos: movieVideos });
      setMovies(response.data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return data;
  };

  const fetchVideos = async (id) => {
    const { data } = await axios.get(`${API_BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return data.results;
  };

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
        },
      });
      return response.data.results;
    } catch (error) {
      console.log(`Error fetching ${genreId} movies:`, error);
    }
  };

  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    const videos = await fetchVideos(movie.id);
    setSelectedMovie({ ...data, videos });
    setShowTrailer(false); // Reset showTrailer state when a new movie is selected
  };

  useEffect(() => {
    fetchMovies(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      const genreMoviesPromises = genres.map(async (genre) => {
        const genreMovies = await fetchMoviesByGenre(genre.id);
        return {
          genreId: genre.id,
          genreName: genre.name,
          movies: genreMovies,
        };
      });
      const genreMoviesData = await Promise.all(genreMoviesPromises);
      setGenres(genreMoviesData);
    };

    fetchMoviesByGenres();
  }, []);

  const renderMovies = (movies) => {
    if (!movies) {
      return null;
    }

    return (
      <Slider slidesToShow={5} slidesToScroll={1}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
        ))}
      </Slider>
    );
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const handleTrailerClick = () => {
    setShowTrailer((prevState) => !prevState);
  };

  return (
    <div className="stream">
      <header className="header">
        <div className="header-content max-center">
          <span>Streaming</span>
          <form onSubmit={searchMovies}>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <div
        className="hero"
        style={{
          backgroundImage: selectedMovie.backdrop_path
            ? `url(${IMAGE_BASE_URL}${selectedMovie.backdrop_path})`
            : "none",
        }}>
        {selectedMovie && (
          <div className="hero-content max-center">
            {!showTrailer && (
              <>
                <button className="button" onClick={handleTrailerClick}>
                  Watch Trailer
                </button>
                <h1 className="hero-title">{selectedMovie.title}</h1>
                {selectedMovie.overview && (
                  <p className="hero-overview">{selectedMovie.overview}</p>
                )}
              </>
            )}
            {showTrailer &&
            selectedMovie.videos &&
            selectedMovie.videos.length > 0 &&
            selectedMovie.videos[0].key ? (
              <Youtube videoId={selectedMovie.videos[0].key} />
            ) : null}
          </div>
        )}
      </div>
      <div className="slider-container max-center">
        {genres.map((genre) => (
          <React.Fragment key={genre.genreId}>
            <h2 className="title">{genre.genreName} Movies</h2>
            {renderMovies(genre.movies)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stream;
