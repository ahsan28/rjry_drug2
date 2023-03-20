import React, { useContext, useState } from "react";
import { TextField, Button, Box, Card, CardMedia, CardActions, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import ActivityService from "../../services/activity.services";

const ActivityForm = ({ onAdd }) => {
  const { user, setUser } = useContext(UserContext);
  let { actId } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [links, setLinks] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("userid", user._id);
    formData.append("username", user.username);
    
    formData.append("actId", actId);
    formData.append("name", name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("images", imgFiles);
    formData.append("links", links);
    // const activity = { name, title, description, images, links };
    // console.log("🚀 ~ file: ActivityForm.js:18 ~ handleSubmit ~ activity:", activity)
    // onAdd(activity);

    ActivityService.create(formData)
        .then((res) => {
            console.log("🚀 ~ file: ActivityForm.js:21 ~ handleSubmit ~ res", res);

            setName("");
            setTitle("");
            setDescription("");
            setImages([]);
            setImgFiles([]);
            setLinks([]);
            
            navigate("/activity/" + actId);
        })
        .catch((err) => {
            console.log(err);
        });
  };

  const handleLinkChange = (index, event, field) => {
    const values = [...links];
    values[index][field] = event.target.value;
    setLinks(values);
  };

  const handleAddLink = () => {
    const values = [...links];
    values.push({ url: "", name: "" });
    setLinks(values);
  };

  const handleRemoveLink = (index) => {
    const values = [...links];
    values.splice(index, 1);
    setLinks(values);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImgFiles(prevFiles => prevFiles.concat(files));
    const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages(prevImages => prevImages.concat(imagesArray));
  };

  const handleRemoveImage = (index) => {
    const values = [...images];
    values.splice(index, 1);
    setImages(values);

    const files = [...imgFiles];
    files.splice(index, 1);
    setImgFiles(files);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Paper sx={{ p: 2 }} elevation={1}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {links.map((link, index) => (
          <Box sx={{ display: "flex", alignItems: "center", mb: index===links.length-1?2:'' }} key={index}>
            <TextField
                label={`Name`}
                variant="outlined"
                value={link.name}
                onChange={(e) => handleLinkChange(index, e, "name")}
                sx={{ width: "200px", mr: 1 }}
            />
            <TextField
              label={`Link ${index + 1}`}
              variant="outlined"
              value={link.url}
              onChange={(e) => handleLinkChange(index, e, "url")}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={() => handleRemoveLink(index)} sx={{ ml: 1, height: "60px" }} size="small" color="error" >
            Remove
            </Button>
          </Box>
        ))}
        </Box>
        <Button variant="contained" onClick={handleAddLink} size="small" color="success">
          {links.length > 0 ? "Add Another Link" : "Add Link"}
        </Button>
        </Paper>
        <Paper sx={{ p: 2 }} elevation={1}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
                {images.map((image, index) => (
                <Card sx={{ maxWidth: 300, mb:2 }} key={image}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={image}
                        alt="activity image"
                    />
                    <CardActions>
                        <Button 
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            color="error"
                            variant="contained"
                        >
                            Remove
                        </Button>
                    </CardActions>
                </Card>
            ))}
            </Box>
            <label htmlFor="image-upload">
                <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    hidden
                />
                <Button variant="contained" component="span" size="small" color="success">
                    {images.length > 0 ? "Add More Images" : "Add Images"}
                </Button>
            </label>
        </Paper>
      <Button variant="contained" onClick={handleSubmit}>
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
