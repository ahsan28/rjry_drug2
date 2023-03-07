import { useEffect, useState } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Select } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const UserSettings = ({currentUser}) => {
    const [data, setData] = useState(null);
    console.log("🚀 ~ file: UserSettings.js ~ line 9 ~ UserSettings ~ data", data)
    let navigate = useNavigate();


    useEffect(() => {
        if (currentUser) {
            setData(currentUser.settings)
        }
    }, []);

    const handleFileUploadError = (error) => {
        console.log("🚀 ~ file: UserSettings.js ~ line 25 ~ handleFileUploadError ~ error", error)
        // Do something...
      }
      
      const handleCoverChange = (files) => {
        setData({...data, cover: files[0]})
      }

      const handleGalleryChange = (files) => {
        setData({...data, gallery: files})
      }

    // function handleChange(event) {
    //     const { name, value } = event.target;
    //     setData({ ...data, [name]: value });
    // }
    function save() {
        DataService.save(data)
            .then((res) => {
                console.log(res);
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }
    
  if (!data) return (<h2>No data</h2>)
  return (<>
    <h1>User Settings</h1>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {/* select theme color dropdown */}
        <FormControl>
            <InputLabel htmlFor="my-input">Theme Color</InputLabel>
            <Select native value={data?.themeColor} onChange={handleChange} inputProps={{name: 'themeColor', id: 'themeColor'}}>
                <option aria-label="None" value="" />
                <option value={'red'}>Red</option>
                <option value={'blue'}>Blue</option>
                <option value={'green'}>Green</option>
                <option value={'yellow'}>Yellow</option>
                <option value={'orange'}>Orange</option>
                <option value={'purple'}>Purple</option>
                <option value={'pink'}>Pink</option>
                <option value={'brown'}>Brown</option>
                <option value={'grey'}>Grey</option>
            </Select>
        </FormControl>
    </Box>
  </>)
}

export default UserSettings