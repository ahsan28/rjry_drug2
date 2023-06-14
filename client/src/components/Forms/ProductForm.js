import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Card, CardMedia, CardActions, Paper, Container, Typography, Divider, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import InfoService from "../../services/info.services";

const ProductForm = ({ formHelper, setFormHelper }) => {
  const { user, setUser } = useContext(UserContext);
  // let { infoType } = useParams();
  // console.log("🚀 ~ file: ProductForm.js:10 ~ ProductForm ~ infoType:", infoType)
  const [selectedActId, setSelectedActId] = useState(null);
  const [activities, setActivities] = useState([]);
  // const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  console.log("🚀 ~ file: ProductForm.js:17 ~ ProductForm ~ images:", documents)
  const [docFiles, setDocFiles] = useState([]);
  console.log("🚀 ~ file: ProductForm.js:19 ~ ProductForm ~ imgFiles:", docFiles)
  // const [links, setLinks] = useState([]);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   InfoService.readAllByType(infoType).then((res) => {
  //     console.log("🚀 ~ file: ProductForm.js:21 ~ InfoService.readAllByType ~ res", res)
  //     setActivities(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("userid", user._id);
    formData.append("username", user.username);
    
    formData.append("category", "product");
    formData.append("infoType", formHelper.infoType);
    // formData.append("title", title);
    formData.append("title", title);
    formData.append("description", description);
    for (let i = 0; i < docFiles.length; i++) {
      console.log(i,docFiles[i])
      formData.append("document", docFiles[i]);
    }
    console.log("🚀 ~ file: ProductForm.js:44 ~ handleSubmit ~ imgFiles:", docFiles)
    // formData.append("links", links);
    // const product = { name, title, description, images, links };
    // console.log("🚀 ~ file: ProductForm.js:18 ~ handleSubmit ~ product:", product)
    // onAdd(product);

    InfoService.createProduct(formData)
        .then((res) => {
            console.log("🚀 ~ file: ProductForm.js:21 ~ handleSubmit ~ res", res);

            // setName("");
            setTitle("");
            setDescription("");
            setDocuments([]);
            setDocFiles([]);
            setFormHelper({open: false, type: formHelper.type, id: "new"});
            
            // setLinks([]);
            
            // navigate("/product/" + infoType);
        })
        .catch((err) => {
            console.log(err);
        });
  };

  // const handleLinkChange = (index, event, field) => {
  //   const values = [...links];
  //   values[index][field] = event.target.value;
  //   setLinks(values);
  // };

  // const handleAddLink = () => {
  //   const values = [...links];
  //   values.push({ url: "", name: "" });
  //   setLinks(values);
  // };

  // const handleRemoveLink = (index) => {
  //   const values = [...links];
  //   values.splice(index, 1);
  //   setLinks(values);
  // };

  const handleImageChange = (event) => {
    const files = event.target.files;
    console.log("🚀 ~ file: ProductForm.js:93 ~ handleImageChange ~ files:", files)
    setDocFiles(prevFiles => prevFiles.concat(Array.from(files)));
    const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log("🚀 ~ file: ProductForm.js:96 ~ handleImageChange ~ imagesArray:", imagesArray)
    setDocuments(prevImages => prevImages.concat(imagesArray));
  };

  const handleRemoveImage = (index) => {
    const values = [...documents];
    values.splice(index, 1);
    setDocuments(values);

    const files = [...docFiles];
    files.splice(index, 1);
    setDocFiles(files);
  };

  return (<Dialog 
    open={formHelper.open} 
    onClose={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} 
    maxWidth="md" fullWidth>
    <DialogTitle>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
    </DialogTitle>
    <DialogContent>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", mt:1 }}>
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
      <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <Typography variant="h6" component="h1" gutterBottom>
          Documents
        </Typography>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden multiple onChange={handleImageChange} />
        </Button>
        <Typography variant="body1" component="h1" gutterBottom>
          {docFiles.length} files selected
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          {documents.length} files uploaded
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          {docFiles.length === documents.length && docFiles.length > 0 && "All files uploaded"}
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          {docFiles.length !== documents.length && docFiles.length > 0 && "Some files not uploaded"}
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          {docFiles.length === 0 && "No files selected"}
        </Typography>
        <Typography variant="body1" component="h1" gutterBottom>
          {docFiles.length === 0 && "No files uploaded"}
        </Typography>
      </Box>
               
    </Box>
    </DialogContent>
    <DialogActions sx={{ gap: 1, mx: 2, mb:2 }}>
      <Button onClick={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} variant="contained" sx={{ bgcolor: "skyblue", color: "white" }}> 
        Cancel
      </Button>
      <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "orange", color: "white" }}>
        Add Product
      </Button>
    </DialogActions>
  </Dialog>);
};

export default ProductForm;
