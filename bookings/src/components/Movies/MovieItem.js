import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 240,
        height: "100%",
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s",
        ":hover": {
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <img
        height={251.484}
        width="100%"
        src={posterUrl}
        alt={title}
        style={{ borderRadius: "10px 10px 0 0" }}
      />
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold" marginBottom={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={`/booking/${id}`}
          sx={{
            bgcolor: "#2b2d42",
            color: "#fff",
            ":hover": {
              bgcolor: "#3f3162",
            },
          }}
          size="small"
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
