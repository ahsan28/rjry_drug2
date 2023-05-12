import { useContext, useEffect, useState } from 'react'
import DataService from '../../services/data.services'
import MediaService from '../../services/media.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Select, Typography, MenuItem, Paper, Card, CardMedia, CardActions, Container } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import UserService from "../../services/user.services";
import LinearProgress from '@mui/material'
import { UserContext } from "../../UserContext";
import ViewImage from '../Hooks/ViewImage'
import { SketchPicker } from 'react-color';

const fonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana']
// 7 to 22 step 1
const fontSizes = [7,8,9,10,11,12,13,14,15,16]

const SettingsForm = () => {
    const { user, setUser, settings, setSettings } = useContext(UserContext);
    const [covers, setCovers] = useState([]);
    const [coversFiles, setCoversFiles] = useState([]);
    const [logo, setLogo] = useState(null);
    console.log("🚀 ~ file: SettingsForm.js:24 ~ SettingsForm ~ logo:", logo)
    const [logoFile, setLogoFile] = useState(null);
    const [footer, setFooter] = useState(null);
    const [footerFile, setFooterFile] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [data, setData] = useState({
        theme: {
            color: 'black',
            fontFamily: 'sans-serif',
            backgroundColor: 'white',
            fontSize: 16,
        },
        body: {
            color: 'black',
            fontFamily: 'sans-serif',
            backgroundColor: 'white',
            fontSize: 16,
        },
        logo: null,
        covers: [],
        footer: null,

        links: []
    })
    console.log("🚀 ~ file: UserSettings.js ~ line 9 ~ UserSettings ~ data", data)
    let navigate = useNavigate();

    useEffect(() => {
        if(settings) {
            setData(settings)
            MediaService.loadImage(settings.logo).then((res) => {
                setLogo(URL.createObjectURL(res.data))
            })
        }
        else {
            if (user) {
                UserService.getSettings(user.settings).then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    }, [settings]);
        console.log("🚀 ~ file: SettingsForm.js:55 ~ useEffect ~ settings:", settings)


    function save() {
        const formData = new FormData();
        
        formData.append("userid", user._id);
        formData.append("username", user.username);
        formData.append("_id", data._id||settings._id||user.settings);
        if (data.logoUpdated) formData.append("logo", logoFile);
        if (data.coversUpdated) formData.append("covers", coversFiles);
        if (data.footerUpdated) formData.append("footer", footerFile);
        // formData.append("logo", data.logo);
        // formData.append("covers", data.covers);
        // formData.append("footer", data.footer);

        DataService.upload(formData)
            .then((res) => {
                setUser(res.data.user)
                console.log('okr',res.data);
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function saveSettings() {
        UserService.updateSettings(user._id, data)
        .then((res) => {
            console.log('saveSettings', res)
            setSettings(data)
            setShowEdit(false)
        })
        .catch((err) => {
            console.log(err);
        });
    }


    
  if (!user) return (<>
    <Typography variant="h1" gutterBottom>
        You are not logged in.
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
        Please <Link to="/signin">login</Link> to view this page.
    </Typography>
  </>)

  else return (<Container>
    <h1>Website Theme Settings</h1>
    <Box sx={{ width: '100%' }}>
        <Box sx={{my: 2, gap: 1, display: 'flex', flexDirection: 'column'}}>
            {/* Preview a page at the center  */}
            <Box sx={{display: 'block', width: '100%', height: 250, position: 'relative', background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 3px, #dedede 10px, #dedede 8px)'}}>
                {/* make a stiky label near top left corner with border and radius */}
                <Box sx={{position: 'absolute', top: 0, height:28, left: 18, width: 'auto', backgroundColor: '#79d2ff', border: '4px solid #b5daff', borderRadius: "0 0 12px 12px", display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: 3}}>
                    <Typography gutterBottom sx={{px: 2, fontSize: 13, color: 'honeydew',fontFamily: 'monospace'}}>
                        Preview
                    </Typography>
                </Box>
                <Paper elevation={1} sx={{p: 1, gap: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', width: "auto", justifyContent: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Box sx={{width: '100%', height: 40, backgroundColor: data.theme.backgroundColor}}>
                            <Typography sx={{color: data.theme.color, fontFamily: data.theme.fontFamily, fontSize: data.theme.fontSize, textAlign: 'center', lineHeight: '50px', fontWeight: 'bold', textTransform: 'uppercase', px:2}}>
                                Pengenalan  Profil  Aktiviti  Penerbitan  ...
                            </Typography>
                        </Box>
                        <Box sx={{width: '100%', height: 120, backgroundColor: data.body.backgroundColor}}>
                            <Typography sx={{color: data.body.color, fontFamily: data.body.fontFamily, fontSize: data.body.fontSize, textAlign: 'center', lineHeight: '80px'}}>
                                Body color and text color, size, background etc. goes here.
                            </Typography>
                        </Box>
                        <Box sx={{width: '100%', height: 20, backgroundColor: data.theme.backgroundColor}}/>
                </Paper>
                <Box sx={{position: 'absolute', bottom: 0, right: 0, m:2 }}>
                     <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-around'}}>
                     {showEdit ? <>
                            <Button variant="contained" onClick={saveSettings} size="small" color="success" sx={{width: '6rem'}}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={() => setShowEdit(false)} size="small" color="error" sx={{width: '6rem'}}>
                                Cancel
                            </Button>
                        </>: <Button variant="contained" onClick={() => setShowEdit(true)} size="small" color="primary" sx={{width: '6rem'}}>
                            Modify    
                        </Button>}
                    </Box>
                </Box>
            </Box>

            {/* select theme bg color, text color, fonts, size */}
                {showEdit && <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-around'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom>
                            Menu background
                        </Typography>
                        <Box>
                            <SketchPicker 
                                width={150}
                                disableAlpha={true}
                                color={ data.theme.backgroundColor } 
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                onChange={ (color, e) => {
                                    if(![data.theme.color, data.theme.backgroundColor].includes(color.hex))
                                        setData({...data, theme: {...data.theme, backgroundColor: color.hex}})
                                }}
                                // onChangeComplete={ (color, e) => {
                                //     setData({...data, theme: {...data.theme, backgroundColor: color.hex}})
                                // }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom>
                            Menu text
                        </Typography>
                        <Box>
                            <SketchPicker 
                                color={ data.theme.color }
                                width={150}
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                disableAlpha={true}
                                onChange={ (color, e) => {
                                    if(![data.theme.color, data.theme.backgroundColor].includes(color.hex))
                                        setData({...data, theme: {...data.theme, color: color.hex}})
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                            <InputLabel id="theme-font-label">Theme Font</InputLabel>
                            <Select
                                labelId="theme-font-label"
                                id="theme-font"
                                sx={{textTransform:'uppercase', fontFamily: data.theme.fontFamily}}
                                value={data.theme.fontFamily}
                                label="Theme Font"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, theme: {...data.theme, fontFamily: e.target.value}})
                                }}
                            >
                                {fonts.map((font) => <MenuItem value={font} sx={{fontFamily:font, textTransform:'uppercase'}} >{font}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                            <InputLabel id="theme-font-size-label">Theme Font Size</InputLabel>
                            <Select
                                labelId="theme-font-size-label"
                                id="theme-font-size"
                                value={data.theme.fontSize}
                                label="Theme Font Size"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, theme: {...data.theme, fontSize: e.target.value}})
                                }}
                            >
                                {fontSizes.map((size) => <MenuItem value={size+2}>{size+2}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Divider />
                        <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                            <InputLabel id="body-font-label">Body Font</InputLabel>
                            <Select
                                labelId="body-font-label"
                                id="body-font"
                                value={data.body.fontFamily}
                                sx={{fontFamily: data.body.fontFamily}}
                                label="Body Font"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, body: {...data.body, fontFamily: e.target.value}})
                                }}
                            >
                                {fonts.map((font) => <MenuItem value={font} sx={{fontFamily:font}} >{font}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                            <InputLabel id="body-font-size-label">Body Font Size</InputLabel>
                            <Select
                                labelId="body-font-size-label"
                                id="body-font-size"
                                value={data.body.fontSize}
                                label="Body Font Size"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, body: {...data.body, fontSize: e.target.value}})
                                }}
                            >
                                {fontSizes.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom>
                            Body background
                        </Typography>
                        <Box>
                            <SketchPicker 
                                color={ data.body.backgroundColor } 
                                // 10 black and white shades
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                width={150}
                                disableAlpha={true}
                                onChange={ (color, e) => {
                                    if(![data.body.color, data.body.backgroundColor].includes(color.hex))
                                        setData({...data, body: {...data.body, backgroundColor: color.hex}})
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography gutterBottom>
                            Body text
                        </Typography>
                        <Box>
                            <SketchPicker 
                                color={ data.body.color } 
                                width={150}
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                disableAlpha={true}
                                onChange={ (color, e) => {
                                    if(![data.body.color, data.body.backgroundColor].includes(color.hex))
                                        setData({...data, body: {...data.body, color: color.hex}})
                                }}
                                // onChangeComplete={ (color, e) => {
                                //     setData({...data, body: {...data.body, color: color.hex}})
                                // }}
                            />
                        </Box>
                    </Box>
                </Box>
            }

            {/* links */}
            {/* <Typography variant="h5" gutterBottom>
                Links
            </Typography> */}
            {/* add link */}
            {/* <Paper sx={{ p: 2 }} elevation={1}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {data.links.map((link, index) => (
                    <Box sx={{ display: "flex", alignItems: "center", mb: index===data.links.length-1?2:'' }} key={index}>
                        <TextField
                            label={`Name`}
                            variant="outlined"
                            value={link.name}
                            onChange={(e) =>{
                                const newLinks = [...data.links]
                                newLinks[index].name = e.target.value
                                setData({...data, links: newLinks})
                            }}
                            sx={{ width: "200px", mr: 1 }}
                        />
                        <TextField
                        label={`Link ${index + 1}`}
                        variant="outlined"
                        value={link.url}
                        onChange={(e) => {
                            const newLinks = [...data.links]
                            newLinks[index].url = e.target.value
                            setData({...data, links: newLinks})
                        }}
                        sx={{ flex: 1 }}
                        />
                        <Button variant="contained" onClick={() => {
                            const newLinks = [...data.links]
                            newLinks.splice(index, 1)
                            setData({...data, links: newLinks})
                        }} sx={{ ml: 1, height: "60px" }} size="small" color="error" >
                        Remove
                        </Button>
                    </Box>
                    ))}
                </Box>
                <Button variant="contained" onClick={(e)=>{
                    setData({...data, links: [...data.links, {name: '', url: ''}]})
                }} size="small" color="success">
                    {data.links.length > 0 ? "Add Another Link" : "Add Link"}
                </Button>
            </Paper> */}

            {/* <Button variant="contained" onClick={saveSettings} sx={{ mt: 2, width: '15rem' }} size="medium">
                Save settings
            </Button> */}

        </Box>



        
        
        
        
        <Divider sx={{ my: 2 }} />
        {/* upload file to be saved in the folder */}
            <Box sx={{ my: 2 }} >
                <Typography variant="h5" gutterBottom>
                    Upload Image Files
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper sx={{ p: 2, width: '100%' }} elevation={1}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {covers.map((image, index) => (
                    <Card sx={{ maxWidth: 100, mb:2 }} key={image}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={image}
                            alt="activity image"
                        />
                        <CardActions>
                            <Button 
                                size="small"
                                onClick={(e) => {
                                    const newCovers = [...covers]
                                    newCovers.splice(index, 1)
                                    setCovers(newCovers)
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
                        onChange={(e) => {
                            const files = e.target.files
                            setCoversFiles(prev => prev.concat(Array.from(files)))
                            setCovers(prev => prev.concat(Array.from(files).map(file => URL.createObjectURL(file))))
                        }}
                        multiple
                        hidden
                    />
                    <Button variant="contained" component="span" size="small" color="success">
                        {covers.length > 0 ? "Add More Images" : "Add Images"}
                    </Button>
                </label>
            </Paper>



            <Paper elevation={1} sx={{padding: 2, width: "100%"}}>
                {logo && <Card sx={{ maxWidth: 100, mb:2 }}>
                    <CardMedia
                        component="img"
                        // height="100"
                        // width="100"
                        image={logo}
                        alt="Logo Image"
                    />
                    <CardActions>
                        <Button
                            size="small"
                            onClick={()=>{
                                setLogo(null)
                                setLogoFile(null)
                                setData({...data, cover: null, coversUpdated: true})
                            }}
                            color="error"
                            variant="contained"
                        >
                            Remove
                        </Button>
                    </CardActions>
                </Card>}
                <label htmlFor="logo-upload">
                    <input
                        id="logo-upload"
                        name="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{
                            setLogoFile(e.target.files[0])
                            setLogo(URL.createObjectURL(e.target.files[0]))
                            setData({...data, logo: e.target.files[0], logoUpdated: true})
                        }}
                        hidden

                    />
                    <Button variant="contained" component="span" size="small" color="success">
                        {logo ? "Change Logo" : "Upload Logo"}
                    </Button>
                </label>

            </Paper>


            <Paper elevation={1} sx={{padding: 2, width: "100%"}}>
                {footer && <Card sx={{ maxWidth: 100, mb:2 }}>  
                    <CardMedia
                        component="img"
                        // height="150"
                        image={footer}
                        alt="Footer Image"
                    />
                    <CardActions>
                        <Button
                            size="small"
                            onClick={()=>{
                                setFooter(null)
                                setFooterFile(null)
                                setData({...data, footer: null, footerUpdated: true})
                            }}
                            color="error"
                            variant="contained"
                        >
                            Remove
                        </Button>
                    </CardActions>
                </Card>}
                <label htmlFor="footer-upload">
                    <input
                        id="footer-upload"
                        name="footer-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{
                            setFooterFile(e.target.files[0])
                            setFooter(URL.createObjectURL(e.target.files[0]))
                            setData({...data, footer: e.target.files[0], footerUpdated: true})
                        }}
                        hidden

                    />
                    <Button variant="contained" component="span" size="small" color="success">
                        {footer ? "Change Footer" : "Upload Footer"}
                    </Button>
                </label>

            </Paper>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" onClick={()=>save(data)}>Upload and Save</Button>
        </Box>
    </Box>
  </Container>)
}

export default SettingsForm