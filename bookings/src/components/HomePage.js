import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers.js/api-helpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const maxMoviesToShow = 4;

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" height="100vh" marginTop={2}>
      <Box margin="auto" width="80%" height="30vh" padding={2}>
        <img
          src="https://regie-media.moncinepack.fr/assets/campagnes/encarts/01h038pnrq8k1t82911jsxg6bc/645bc9f626e24639564553.jpg"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        width="80%"
        flexWrap="wrap"
        display="flex"
        justifyContent="center"
        margin="auto"
      >
        {movies &&
          movies.slice(0, maxMoviesToShow).map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#fff",
            bgcolor: "#2b2d42",
            border: "1px solid #2b2d42",
            ":hover": {
              bgcolor: "#2b2d42",
              color: "#fff",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
