import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserDetails,
  getUserBooking,
} from "../api-helpers.js/api-helpers";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalPlayIcon from "@mui/icons-material/LocalPlay";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  const fetchBookings = () => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        const updatedBookings = bookings.filter((booking) => booking._id !== id);
        setBookings(updatedBookings);
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <Box width="100%" display="flex">
      <Fragment>
        {user && (
          <Box
            width="30%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
          >
            <img
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
              alt="Profile"
              style={{ width: "10rem", textAlign: "center", marginLeft: "1rem" }}
            />
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              textAlign="center"
              marginY={2}
              bgcolor="#f3f3f3"
              padding={1}
              borderRadius={6}
            >
              Name: {user.name}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              textAlign="center"
              marginY={2}
              bgcolor="#f3f3f3"
              padding={1}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width="70%" display="flex" flexDirection="column">
            <Typography
              variant="h3"
              fontFamily="verdana"
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box margin="auto" display="flex" flexDirection="column" width="80%">
              <List>
                {bookings.map((booking, index) => (
                  <React.Fragment key={booking._id}>
                    {booking.movie && ( // Only render if booking.movie is available
                      <ListItem
                        sx={{
                          bgcolor: "#2b2d42",
                          color: "white",
                          textAlign: "center",
                          margin: 1,
                        }}
                      >
                        <ListItemText
                          sx={{ margin: 1, width: "auto", textAlign: "left" }}
                        >
                          <LocalPlayIcon style={{ marginRight: "0.5rem" }} />
                          Movie: {booking.movie.title}
                        </ListItemText>
                        <ListItemText
                          sx={{ margin: 1, width: "auto", textAlign: "left" }}
                        >
                          Seat: {booking.seatNumber}
                        </ListItemText>
                        <ListItemText
                          sx={{ margin: 1, width: "auto", textAlign: "left" }}
                        >
                          Date: {new Date(booking.date).toDateString()}
                        </ListItemText>
                        <IconButton
                          onClick={() => handleDelete(booking._id)}
                          color="error"
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
