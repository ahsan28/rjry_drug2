import { useEffect, useState, useContext } from 'react'
import DataService from '../../services/data.services'
import MediaService from '../../services/media.services';
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Paper, Card, CardMedia, CardActions, Container } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import { UserContext } from "../../UserContext";


const CommonDataForm = () => {
    const { user, setUser, setIsLoading } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    let { page } = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        if (user && page) {
            DataService.read(page.charAt(0).toUpperCase() + page.slice(1))
            .then((res) => {
                console.log("🚀 ~ file: DataForm.js ~ line 16 ~ .then ~ res", res)
                if (res.data) {
                    setData(res.data)
                    if (res.data.cover) {
                        console.log("🚀 ~ file: DataForm.js ~ line 19 ~ .then ~ res.data.cover", res.data.cover)
                        MediaService.loadImage(res.data.cover)
                        .then((res2) => {
                            console.log("🚀 ~ file: DataForm.js ~ line 21 ~ .then ~ res2", res2)
                            setImage(URL.createObjectURL(res2.data));
                            setImgFile(res2.data);
                        })
                        .catch((err) => {
                            console.log('Error llllloading image: ', err);
                            console.log(err);
                        });
                    }

                }
                else setData({name: page.charAt(0).toUpperCase() + page.slice(1), title: page.charAt(0).toUpperCase() + page.slice(1)})
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, []);


    function save() {
        console.log("🚀 ~ file: DataForm.js ~ line 24 ~ save ~ page, data", page, data)
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("userid", user._id);
        formData.append("username", user.username);

        if (imgFile) formData.append("cover", imgFile);
        if (galleryFiles) formData.append("gallery", galleryFiles);
        
        DataService.save(formData, page.charAt(0).toUpperCase() + page.slice(1))
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
            gap: 2
          }}
        >
            {page!=="gallery" && 
            // put cards left
            <Container sx={{display: "flex", flexDirection: "row", width: "50%", pl: '0 !important' }}>
                <Box sx={{display: "flex", flexDirection: "column" }}>
                {image && <Card sx={{ maxWidth: 300, mb:2 }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={image}
                        alt="Cover Image"
                    />
                    <CardActions>
                        <Button
                            size="small"
                            onClick={()=>{
                                setImage(null)
                                setImgFile(null)
                                setData({...data, cover: null, coverUpdated: true})
                            }}
                            color="error"
                            variant="contained"
                        >
                            Remove
                        </Button>
                    </CardActions>
                </Card>}
                <label htmlFor="cover-upload">
                    <input
                        id="cover-upload"
                        name="cover-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{
                            setImgFile(e.target.files[0])
                            setImage(URL.createObjectURL(e.target.files[0]))
                            setData({...data, cover: e.target.files[0].name, coverUpdated: true})
                        }}
                        hidden
                    />
                    <Button variant="contained" component="span">
                        {image ? "Change Cover" : "Upload Cover"}
                    </Button>
                </label>
                </Box>

                </Container>}
            {page==="gallery" && 
            <Paper elevation={1} sx={{padding: 2, width: "50%"}}>
                <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                    {gallery.map((image, index) => (
                    <Card sx={{ maxWidth: 300, mb:2 }} key={index}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={image}
                        alt="Gallery Image"
                    />
                    <CardActions>
                        <Button 
                            size="small"
                            onClick={()=>{
                                const newGallery = gallery.filter((img, i) => i !== index)
                                const newGalleryFiles = galleryFiles.filter((img, i) => i !== index)
                                setGallery(newGallery)
                                setGalleryFiles(newGalleryFiles)
                                setData({...data, galleryUpdated: true})
                            }}
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
                    onChange={(e)=>{
                        setGalleryFiles(prev => [...prev, ...e.target.files])
                        setGallery(prev => [...prev, ...Array.from(e.target.files).map(file => URL.createObjectURL(file))])
                        setData({...data, galleryUpdated: true})
                    }}
                    multiple
                    hidden
                />
                <Button variant="contained" component="span" size="small" color="success">
                    {gallery.length > 0 ? "Add More Images" : "Add Images"}
                </Button>
            </label>
        </Paper>}
        <TextField name="title" label="Title" value={data ? data.title : ""} onChange={(e) => setData({...data, title: e.target.value})} sx={{width: "50%"}}/>
        <TextField name="description" label="Description" value={data ? data.description : ""} onChange={(e) => setData({...data, description: e.target.value})} sx={{width: "50%"}}/>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%"}}>
            <Button variant="contained" onClick={() => navigate(`/${page}`)} color="error" >Cancel</Button>
            <Button variant="contained" onClick={save} color="success" >Save</Button>
        </Box>
    </Box>)
}

export default CommonDataForm