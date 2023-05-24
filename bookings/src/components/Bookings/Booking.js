import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  getMovieDetails,
  newBooking,
} from "../../api-helpers.js/api-helpers";

function getYoutubeVideoId(url) {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }
  return videoId;
}

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            fontWeight="bold"
            color="#3f3162"
            textAlign="center"
            marginBottom={3}
          >
            Book Tickets for Movie: {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box width="60%" maxWidth="800px" marginRight={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={3}
                  margin="auto"
                  display="flex"
                  flexDirection="column"
                  bgcolor="#f8f8f8"
                  boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
                  borderRadius={4}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    value={inputs.date}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      margin: "auto",
                      bgcolor: "#6b5b95",
                      color: "#fff",
                      ":hover": {
                        bgcolor: "#3f3162",
                      },
                    }}
                    size="large"
                    marginTop={3}
                  >
                    Book
                  </Button>
                </Box>
              </form>
              {movie.trailerUrl && (
                <Box display="flex" justifyContent="center" marginTop={3}>
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                      movie.trailerUrl
                    )}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              )}
            </Box>
            <Box width="40%">
              {movie.posterUrl && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={3}
                  marginBottom={2}
                  marginRight={3}
                  maxWidth="300px"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }}
                  />
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="column"
                padding={2}
                bgcolor="#f8f8f8"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
                borderRadius={4}
              >
                <Typography color="#3f3162" fontWeight="bold" marginBottom={1}>
                  Description:
                </Typography>
                <Typography color="#3f3162" marginBottom={1}>
                  {movie.description}
                </Typography>
                <Typography color="#3f3162" fontWeight="bold" marginTop={1}>
                  Actors: {movie.actors.join(", ")}
                </Typography>
                <Typography color="#3f3162" fontWeight="bold" marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
