import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import ViewImage from "../Hooks/ViewImage";
import ImageUploader from "./ImageUploader";
import UserService from "../../services/user.services";


const MemberForm = ({ open, handleClose, handleSubmit, uid }) => {
    console.log("🚀 ~ file: MemberForm.js:9 ~ uid:", uid)
    const [formValues, setFormValues] = useState({name: '', initials: '', avatar: null});
    console.log("🚀 ~ file: MemberForm.js:10 ~ MemberForm ~ formValues:", formValues)
    const [image, setImage] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    console.log("🚀 ~ file: MemberForm.js:13 ~ MemberForm ~ imgFile:", imgFile)

    useEffect(() => {
      if (uid===null||uid===undefined || uid==='new') {
        setFormValues({name: '', initials: '', avatar: null});
      } else {
        console.log("🚀 ~ file: MemberForm.js:22 ~ useEffect ~ uid", uid)
        UserService.get(uid).then((res) => {
          console.log("🚀 ~ file: MemberForm.js:23 ~ UserService.get ~ res.data:", res.data)
          setFormValues(res.data);
        });
      }
    }, [uid]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleFormSubmit = () => {
      console.log("🚀 ~ file: MemberForm.js:22 ~ handleFormSubmit ~ imgFile:", imgFile)
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
        <Typography variant="h5" gutterBottom>Add Member Profile</Typography>
      </DialogTitle>
      <DialogContent>
        {/* show preview if already exists and upload new image */}
        {!image && formValues.avatar?.length === 24 && <>
          <ViewImage image={formValues.avatar} sx={{ width: '64px', height: '64px', borderRadius: '50%' }} />
         <Button size='small' color='error' onClick={removeAvatar}>Remove Avatar</Button>
        </>}
        <ImageUploader oldImgId={formValues.avatar} setFile={setImgFile} image={image} setImage={setImage} name={formValues.name}/>
        {/* clear image button */}
        
        <TextField size='small' name="initials" label="initials" variant="outlined" fullWidth value={formValues.initials} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="name" label="Name" variant="outlined" fullWidth value={formValues.name} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="surname" label="Surname" variant="outlined" fullWidth value={formValues.surname} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="designation" label="Designation" variant="outlined" fullWidth value={formValues.designation} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="expertise" label="expertise" variant="outlined" fullWidth value={formValues.expertise} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="affiliation" label="affiliation" variant="outlined" fullWidth value={formValues.affiliation} onChange={handleChange} sx={{mt:1}} />

        <TextField size='small' name="email" label="Email" variant="outlined" fullWidth value={formValues.email} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="phone" label="Phone" variant="outlined" fullWidth value={formValues.phone} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="link" label="link" variant="outlined" fullWidth value={formValues.link} onChange={handleChange} sx={{mt:1}} />
        <TextField size='small' name="address" label="Address" variant="outlined" fullWidth value={formValues.address} onChange={handleChange} sx={{mt:1}} multiline rows={4}/>
        <TextField size='small' name="about" label="About" variant="outlined" fullWidth value={formValues.about} onChange={handleChange} sx={{mt:1}} multiline rows={4} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MemberForm