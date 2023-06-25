import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Card, CardMedia, CardActions, Paper, Container, Typography, Divider, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import InfoService from "../../services/info.services";
import FileUploader from "../Hooks/FileUploader";

const ProductForm = ({ formHelper, setFormHelper, reload }) => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [documents, setDocuments] = useState([]);
  const [docFiles, setDocFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (formHelper.id !== "new") {
      setIsLink(true);
      InfoService.read(formHelper.id)
        .then((res) => {
          console.log("🚀 ~ file: ProductForm.js:26 ~ useEffect ~ res", res);
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formHelper.id]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(true);
    InfoService.update(info)
      .then((res) => {
        console.log("🚀 ~ file: ProductForm.js:26 ~ handleSubmit ~ res", res);
        setFormHelper({open: false, type: formHelper.type, id: "new"});
        setIsEditing(false);
        reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveFiles = async () => {
    try {
      if (isLink) {
        InfoService.create({
          userid: user._id,
          username: user.username,
          category: "product",
          infoType: formHelper.infoType,
          title: info.title,
          link: info.link
        }).then((res) => {
          setInfo({title: '', link: ''});
          setFormHelper({open: false, type: formHelper.type, id: "new"});
        }).catch((err) => console.log(err));
        return;
      }
    const formData = new FormData();
    formData.append("userid", user._id);
    formData.append("username", user.username);
    
    formData.append("category", "product");
    formData.append("infoType", formHelper.infoType);

    documents.forEach(file => formData.append('files', file.file));
    
      InfoService.createProduct(formData)
      .then((res) => {
        setDocuments([]);
        setDocFiles([]);
        setFormHelper({open: false, type: formHelper.type, id: "new"});
    })
    .catch((err) => {
        console.log(err);
    });

    } catch (error) {
      console.log("Error uploading files: ", error);
    }
  };



  return (<Dialog 
    open={formHelper.open} 
    onClose={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} 
    maxWidth="md" fullWidth>
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product ({isLink?'Video Link':'Files'})
      </Typography>
      {/* add a toggle to switch between files and links */}
      <ToggleButtonGroup value={isLink} exclusive onChange={(event, value) => setIsLink(value)} disabled={formHelper.id !== "new"}>
        <ToggleButton value={false} disabled={formHelper.id !== "new"}>Files</ToggleButton>
        <ToggleButton value={true}>Links</ToggleButton>
      </ToggleButtonGroup>
    </DialogTitle>
    <DialogContent>
    {/* possibility to upload multiple files at once. and no title/description and display the list of uploaded files, where file name can be edited, and file can be removed. and a button to add more files. these are not images, consider these as files  */}
      {isLink? <>
        <TextField value={info.title} onChange={e=>setInfo(p=>({...p, title: e.target.value}))} label="Title" fullWidth sx={{ mt:1}} />
        <TextField value={info.link} onChange={e=>setInfo(p=>({...p, link: e.target.value}))} label="Link" fullWidth sx={{ mt:1}} />
      </>:
        <FileUploader isEditing={isEditing} setIsEditing={setIsEditing} files={documents} setFiles={setDocuments} />
      }
          
    </DialogContent>
    <DialogActions sx={{ gap: 1, mx: 2, mb:2 }}>
      <Button onClick={() => setFormHelper({open: false, type: formHelper.type, id: "new"})} variant="contained" sx={{ bgcolor: "skyblue", color: "white" }}> 
        Cancel
      </Button>
      {formHelper.id !== "new"? <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: "green", color: "white" }} disabled={isEditing}>
        Update
      </Button>:
      <Button onClick={saveFiles} variant="contained" sx={{ bgcolor: "orange", color: "white" }} disabled={isEditing}>
        {isLink?'Add Link':'Add Files'}
      </Button>}
    </DialogActions>
  </Dialog>);
};

export default ProductForm;
