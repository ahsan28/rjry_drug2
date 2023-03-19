import { useEffect, useState, useContext } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../../UserContext";


const CommonDataForm = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
    const [oldGalleryIds, setOldGalleryIds] = useState([]);
    console.log("🚀 ~ file: DataForm.js ~ line 9 ~ DataForm ~ data", data)
    let { page } = useParams();
    console.log("🚀 ~ file: DataForm.js ~ line 12 ~ DataForm ~ page", page)
    let navigate = useNavigate();


    useEffect(() => {
        if (user && page) {
            DataService.read(page.charAt(0).toUpperCase() + page.slice(1))
            .then((res) => {
                console.log("🚀 ~ file: DataForm.js ~ line 16 ~ .then ~ res", res)
                if (res.data) setData(res.data);
                else setData({name: page.charAt(0).toUpperCase() + page.slice(1), title: page.charAt(0).toUpperCase() + page.slice(1)})
                setOldGalleryIds(res.data.gallery)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, []);

    const handleFileUploadError = (error) => {
        console.log("🚀 ~ file: DataForm.js ~ line 25 ~ handleFileUploadError ~ error", error)
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
        console.log("🚀 ~ file: DataForm.js ~ line 24 ~ save ~ page, data", page, data)
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("cover", data.cover);
        formData.append("gallery", data.gallery);
        
        DataService.save(data)
            .then((res) => {
                console.log(res);
                navigate(`/${page}`)
            })
            .catch((err) => {
                console.log(err);
            });
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
                // disabled={true}
                label="Title"
                // multiline
                // maxRows={4}
                value={data?.title||""}
                onChange={(e) => setData({...data, title: e.target.value})}
            />
            {/* description */}
            {/* <InputLabel htmlFor="description">Description</InputLabel> */}
            {page!=="gallery" && (<Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <FileUpload
                id="cover"
                multiFile={false}
                disabled={false}
                title="Upload Cover"
                imageSrc={data?.cover?.path||data?.cover?.url||""}
                header="[Drag and drop]"
                leftLabel="or"
                buttonLabel="click here"
                rightLabel="to select an image"
                buttonRemoveLabel="Remove"
                // maxFileSize={10}
                maxUploadFiles={1}
                // maxFilesContainerHeight={357}
                errorSizeMessage={'fill it or move it to use the default error message'}
                allowedExtensions={['jpg', 'jpeg', 'png', 'gif']}
                onFilesChange={handleCoverChange}
                onError={handleFileUploadError}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
            />
            </Box>)}
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
            {page==="gallery" && (<Box sx={{ marginTop: 2, marginBottom: 2 }}>
                {/* show the list of gallery ids */}
                <List subheader={<ListSubheader>Gallery</ListSubheader>}>
                    {data?.gallery?.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                    let newGallery = data.gallery.filter((item, i) => i!==index)
                                    setData({...data, gallery: newGallery})
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                            />
                        </ListItem>
                    ))}
                </List>
            <FileUpload
                id="gallery"
                multiFile={true}
                disabled={false}
                title="Upload Gallery Images"
                imageSrc={data?.gallery?.map((img) => img.path||img.url)||""}
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
                onFilesChange={handleGalleryChange}
                onError={handleFileUploadError}
                bannerProps={{ elevation: 0, variant: "outlined" }}
                containerProps={{ elevation: 0, variant: "outlined" }}
            />
            </Box>)}
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

export default CommonDataForm