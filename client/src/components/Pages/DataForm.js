import React, { useEffect } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField } from '@mui/material'
import {Link, useParams} from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"

const DataForm = ({currentUser}) => {
    const [data, setData] = React.useState(null);
    let { page } = useParams();

    useEffect(() => {
        if (currentUser && page) {
            DataService.read(page.charAt(0).toUpperCase() + page.slice(1))
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, []);

    const handleFileUploadError = (error) => {
        // Do something...
      }
      
      const handleFilesChange = (files) => {
        // Do something...
      }

    function handleChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }
    function save() {
        console.log("🚀 ~ file: DataForm.js ~ line 24 ~ save ~ page, data", page, data)
        // DataService.update(page, data)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

  return (
    <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <FormControl>
            {/* title */}
            {/* <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" value={data ? data.title : ""} onChange={handleChange} disabled={true} />
            <FormHelperText>Title of the page</FormHelperText> */}
            <TextField
                sx={{ margin: 1, width: '25ch' }}
                id="outlined-multiline-flexible"
                disabled={true}
                label="Title"
                // multiline
                // maxRows={4}
                value={data?.title||""}
                onChange={(e) => setData({...data, title: e.target.value})}
            />
            {/* description */}
            {/* <InputLabel htmlFor="description">Description</InputLabel> */}
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <FileUpload
                multiFile={false}
                disabled={false}
                title="Upload Cover"
                imageSrc={'path/to/custom/image'}
                header="[Drag and drop]"
                leftLabel="or"
                buttonLabel="click here"
                rightLabel="to select an image"
                buttonRemoveLabel="Remove"
                // maxFileSize={10}
                maxUploadFiles={0}
                // maxFilesContainerHeight={357}
                errorSizeMessage={'fill it or move it to use the default error message'}
                allowedExtensions={['jpg', 'jpeg', 'png', 'gif']}
                onFilesChange={handleFilesChange}
                onError={handleFileUploadError}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
            />
            </Box>
            {/* <Input id="description" name="description" value={data ? data.description : ""} onChange={handleChange} /> */}
            <TextField
                sx={{ margin: 1 }}
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={data?.description||""}
                onChange={(e) => setData({...data, description: e.target.value})}
            />
            {/* <FormHelperText>Enter the description of the page</FormHelperText> */}
            {/* cover */}
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>

            {page==="gallery" && (<FileUpload
                multiFile={true}
                disabled={false}
                title="Upload Gallery Images"
                // imageSrc={'path/to/custom/image'}
                header="[Drag and drop]"
                leftLabel="or"
                buttonLabel="click here"
                rightLabel="to select images"
                buttonRemoveLabel="Remove all"
                maxFileSize={10}
                maxUploadFiles={0}
                maxFilesContainerHeight={357}
                errorSizeMessage={'fill it or move it to use the default error message'}
                allowedExtensions={['jpg', 'jpeg', 'png', 'gif']}
                onFilesChange={handleFilesChange}
                onError={handleFileUploadError}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
            />)}
            </Box>
            {/* <InputLabel htmlFor="cover">Cover</InputLabel>
            <Input id="cover" name="cover" value={data ? data.cover : ""} onChange={handleChange} />
            <FormHelperText>Enter the cover of the page</FormHelperText> */}
            {/* media */}
            {/* <InputLabel htmlFor="media">Media</InputLabel>
            <Input id="media" name="media" value={data ? data.media : ""} onChange={handleChange} />
            <FormHelperText>Enter the media of the page</FormHelperText> */}
            {/* two buttons: save and cancel flex around */}
            <Box sx={{display: "flex", justifyContent: "space-around", marginTop: 4}}>
                {/* cancel gray color */}
                <Button variant="contained" color="secondary" >
                    <Link to={`/${page.toLocaleLowerCase()}`} style={{textDecoration: "none", color: "white"}}>Cancel</Link>
                </Button>
                {/* save button */}
                <Button variant="contained" color='success' onClick={save}>Save</Button>
            </Box>
        </FormControl>

        </Box>


  )
}

export default DataForm