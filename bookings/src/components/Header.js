import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { TextField } from "@mui/material";
import { getAllMovies } from "../api-helpers.js/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, val) => {
    const movie = movies.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn && movie && movie._id) {
      navigate(`/booking/${movie._id}`);
    }
  };
  
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton component={Link} to="/">
            <MovieIcon style={{ color: "white", fontSize: "30px" }} />
          </IconButton>
        </Box>

        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                {...params}
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab component={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab component={Link} to="/admin" label="Admin" />
                <Tab component={Link} to="/auth" label="Auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
               <Tab component={Link} to="/stream" label="Streaming" />
                <Tab component={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logout(false)}
                  component={Link}
                  to="/"
                  label="Logout"
                />
               
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab component={Link} to="/add" label="Add Movie" />
                <Tab component={Link} to="/user-admin" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  component={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
