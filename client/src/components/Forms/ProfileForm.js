import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import ViewImage from "../Hooks/ViewImage";
import ImageUploader from "./ImageUploader";


const ProfileForm = ({ open, handleClose, handleSubmit, initialValues }) => {
    console.log("🚀 ~ file: ProfileForm.js:8 ~ ProfileForm ~ initialValues:", initialValues)
    const [formValues, setFormValues] = useState(initialValues);
    console.log("🚀 ~ file: ProfileForm.js:10 ~ ProfileForm ~ formValues:", formValues)
    const [image, setImage] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    console.log("🚀 ~ file: ProfileForm.js:13 ~ ProfileForm ~ imgFile:", imgFile)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleFormSubmit = () => {
      console.log("🚀 ~ file: ProfileForm.js:22 ~ handleFormSubmit ~ imgFile:", imgFile)
      if (imgFile) handleSubmit({ ...formValues, avatar: imgFile });
      else handleSubmit(formValues);
      handleClose();
    };

    const removeAvatar = () => {
      setFormValues({ ...formValues, avatar: null });
      setImage(null);
      setImgFile(null);
    }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h3">Edit Profile</Typography>
      </DialogTitle>
      <DialogContent>
        {/* show preview if already exists and upload new image */}
        {!image && formValues.avatar?.length === 24 && <>
          <ViewImage image={formValues.avatar} sx={{ width: '64px', height: '64px', borderRadius: '50%' }} />
         <Button size='small' color='error' onClick={removeAvatar}>Remove Avatar</Button>
        </>}
        <ImageUploader oldImgId={formValues.avatar} setFile={setImgFile} image={image} setImage={setImage} name={formValues.name}/>
        {/* clear image button */}
        
        <TextField name="name" label="Name" variant="outlined" fullWidth value={formValues.name} onChange={handleChange} margin="normal" />
        <TextField name="surname" label="Surname" variant="outlined" fullWidth value={formValues.surname} onChange={handleChange} margin="normal" />
        <TextField name="designation" label="Designation" variant="outlined" fullWidth value={formValues.designation} onChange={handleChange} margin="normal" />

        <TextField name="address" label="Address" variant="outlined" fullWidth value={formValues.address} onChange={handleChange} margin="normal" />
        <TextField name="phone" label="Phone" variant="outlined" fullWidth value={formValues.phone} onChange={handleChange} margin="normal" />
        <TextField name="email" label="Email" variant="outlined" fullWidth value={formValues.email} onChange={handleChange} margin="normal" />
        <TextField name="about" label="About" variant="outlined" fullWidth value={formValues.about} onChange={handleChange} margin="normal" multiline rows={4} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProfileForm