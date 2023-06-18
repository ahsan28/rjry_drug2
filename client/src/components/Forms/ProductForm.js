import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Card, CardMedia, CardActions, Paper, Container, Typography, Divider, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import InfoService from "../../services/info.services";
import FileUploader from "../Hooks/FileUploader";

const ProductForm = ({ formHelper, setFormHelper }) => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  // let { infoType } = useParams();
  // console.log("🚀 ~ file: ProductForm.js:10 ~ ProductForm ~ infoType:", infoType)
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [documents, setDocuments] = useState([]);
  console.log("🚀 ~ file: ProductForm.js:17 ~ ProductForm ~ files:", documents)
  const [docFiles, setDocFiles] = useState([]);
  console.log("🚀 ~ file: ProductForm.js:19 ~ ProductForm ~ imgFiles:", docFiles)
  const [isEditing, setIsEditing] = useState(false);
  
  


  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("userid", user._id);
    formData.append("username", user.username);
    
    formData.append("category", "product");
    formData.append("infoType", formHelper.infoType);
    // formData.append("title", title);
    for (let i = 0; i < docFiles.length; i++) {
      console.log(i,docFiles[i])
      formData.append("document", docFiles[i]);
    }
    console.log("🚀 ~ file: ProductForm.js:44 ~ handleSubmit ~ files:", documents)
    console.log("🚀 ~ file: ProductForm.js:44 ~ handleSubmit ~ docFiles:", docFiles)
    // formData.append("links", links);
    // const product = { name, title, description, files, links };
    // console.log("🚀 ~ file: ProductForm.js:18 ~ handleSubmit ~ product:", product)
    // onAdd(product);
    

    InfoService.createProduct(formData)
        .then((res) => {
            console.log("🚀 ~ file: ProductForm.js:21 ~ handleSubmit ~ res", res);

            // setName("");
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

  const saveFiles = async () => {
    console.log("🚀 ~ file: ProductForm.js:21 ~ handleSubmit ~ files", documents);
    const formData = new FormData();
    formData.append("userid", user._id);
    formData.append("username", user.username);
    
    formData.append("category", "product");
    formData.append("infoType", formHelper.infoType);

    documents.forEach(file => formData.append('files', file.file));
    
    try {
      InfoService.createProduct(formData)
      .then((res) => {
        console.log("🚀 ~ file: ProductForm.js:21 ~ handleSubmit ~ res", res);

        // setName("");
        setDocuments([]);
        setDocFiles([]);
        setFormHelper({open: false, type: formHelper.type, id: "new"});
        
        // setLinks([]);
        
        // navigate("/product/" + infoType);
    })
    .catch((err) => {
        console.log(err);
    });

      // const response = await axios.post('http://mywebsite.com/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      
      // if(response.status === 200) {
      //   console.log("Files uploaded successfully.");
      // }
    } catch (error) {
      console.log("Error uploading files: ", error);
    }
  };



  return (<Dialog 
    open={formHelper.open} 
    onClose={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} 
    maxWidth="md" fullWidth>
    <DialogTitle>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product (Files)
      </Typography>
    </DialogTitle>
    <DialogContent>
    {/* possibility to upload multiple files at once. and no title/description and display the list of uploaded files, where file name can be edited, and file can be removed. and a button to add more files. these are not images, consider these as files  */}
      <FileUploader isEditing={isEditing} setIsEditing={setIsEditing} files={documents} setFiles={setDocuments} />
          


    </DialogContent>
    <DialogActions sx={{ gap: 1, mx: 2, mb:2 }}>
      <Button onClick={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} variant="contained" sx={{ bgcolor: "skyblue", color: "white" }}> 
        Cancel
      </Button>
      <Button onClick={saveFiles} variant="contained" sx={{ bgcolor: "orange", color: "white" }} disabled={isEditing}>
        Add Product
      </Button>
    </DialogActions>
  </Dialog>);
};

export default ProductForm;
