import React, { useState } from "react";
import { Box, Checkbox, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { addMovie } from "../../api-helpers.js/api-helpers";

const labelProps = {
  mt: 1,
  mb: 1,
};

const getYoutubeVideoId = (url) => {
  try {
    if (!url) {
      return null;
    }

    const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/|embed\/|.*[?&]list=)([^"&?\/ ]{11}))/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};




const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
    trailerUrl: "",
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTrailerUrlChange = (e) => {
    const videoId = getYoutubeVideoId(e.target.value);
    setYoutubeVideoId(videoId);
    setInputs((prevState) => ({
      ...prevState,
      trailerUrl: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}>
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Trailer URL</FormLabel>
          <TextField
            value={inputs.trailerUrl}
            onChange={handleTrailerUrlChange}
            name="trailerUrl"
            variant="standard"
            margin="normal"
          />
          {youtubeVideoId && (
            <Box
              width="100%"
              height={0}
              paddingBottom="56.25%"
              position="relative"
              marginY={2}>
              <iframe
                title="Movie Trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0 }}></iframe>
            </Box>
          )}
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              variant="standard"
              margin="normal"
              onChange={(e) => setActor(e.target.value)}
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}>
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}>
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;