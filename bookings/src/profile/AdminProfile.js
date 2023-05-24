import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import {
  getAdminById,
  getAllMovies,
  deleteMovieById,
} from "../api-helpers.js/api-helpers";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));

    fetchMovies();
  }, []);

  const fetchMovies = () => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movieId) => {
    deleteMovieById(movieId)
      .then(() => {
        console.log("Movie deleted successfully.");
        fetchMovies(); // Fetch the updated movie list after deletion
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}>
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}>
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {movies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}>
              All Movies
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%">
              <List>
                {movies.map((movie, index) => (
                  <ListItem
                    key={movie.id}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                      Movie: {movie.title}
                    </ListItemText>
                    <IconButton
                      color="inherit"
                      onClick={() => handleDeleteMovie(movie._id)} // Pass movie._id as the argument
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
