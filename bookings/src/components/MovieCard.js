import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { styled } from "@mui/system";

const WhiteIconButton = styled(IconButton)({
  color: "#ffffff", // Set the color to white
});

const MovieCard = ({ movie, selectMovie, addToWatchList }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToWatchList = () => {
    addToWatchList(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => selectMovie(movie)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {movie.poster_path ? (
        <img
          className="movie-cover"
          src={IMAGE_PATH + movie.poster_path}
          alt=""
        />
      ) : (
        <div className="movie-placeholder">No image found</div>
      )}
      <div className="movie-details">
        <h5>{movie.title}</h5>
        {isHovered && (
          <p className="movie-description">{movie.overview}</p>
        )}
        <div className="icon-container">
          <WhiteIconButton onClick={handleAddToWatchList}>
            <PlaylistAddIcon />
          </WhiteIconButton>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
