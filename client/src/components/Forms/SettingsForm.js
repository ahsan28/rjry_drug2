import { useContext, useEffect, useState } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Select, Typography, MenuItem, Paper } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import UserService from "../../services/user.services";
import LinearProgress from '@mui/material'
import { UserContext } from "../../UserContext";


const colors = ['black','white','red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'silver', 'gold', 'skyblue', 'lime', 'teal']
const fonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana']
// 7 to 22 step 1
const fontSizes = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

const SettingsForm = () => {
    const { user, setUser, settings, setSettings } = useContext(UserContext);
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
        if(settings) setData(settings)
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


    function save(d) {
        const formData = new FormData();
        
        formData.append("userid", user._id);
        formData.append("username", user.username);
        formData.append("logo", d.logo);
        formData.append("cover", d.coverImg);
        formData.append("footer", d.footerImage);
        formData.append("themeColor", d.themeColor);
        formData.append("fontFamily", d.fontFamily);
        formData.append("fontColor", d.fontColor);



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
            // navigate(`/`)
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

  else return (<>
    <h1>User Settings</h1>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Paper elevation={1} sx={{p: 2, my: 2, gap: 2, display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h5" gutterBottom>
                Theme
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                {/* select theme text color dropdown */}
                <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="theme-color-label">Theme Text Color</InputLabel>
                    <Select
                        labelId="theme-color-label"
                        id="theme-color"
                        value={data.theme.color}
                        label="Theme Color"
                        onChange={(e) => {
                            setData({...data, theme: {...data.theme, color: e.target.value}})
                        }}
                    >
                        {colors.map((color) => <MenuItem value={color} disabled={color === data.theme.backgroundColor || color === data.body.color}>
                            {color}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select theme background color dropdown */}
                <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="theme-background-label">Theme Background</InputLabel>
                    <Select
                        labelId="theme-background-label"
                        id="theme-background"
                        value={data.theme.backgroundColor}
                        label="Theme Background"
                        onChange={(e) => {
                            setData({...data, theme: {...data.theme, backgroundColor: e.target.value}})
                        }}
                    >
                        {colors.map((color) => <MenuItem value={color} disabled={color === data.theme.color || color === data.body.backgroundColor}>
                            {color}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select theme font dropdown */}
                <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="theme-font-label">Theme Font</InputLabel>
                    <Select
                        labelId="theme-font-label"
                        id="theme-font"
                        value={data.theme.fontFamily}
                        label="Theme Font"
                        onChange={(e) => {
                            setData({...data, theme: {...data.theme, fontFamily: e.target.value}})
                        }}
                    >
                        {fonts.map((font) => <MenuItem value={font}>{font}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select theme font size dropdown */}
                <FormControl sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="theme-font-size-label">Theme Font Size</InputLabel>
                    <Select
                        labelId="theme-font-size-label"
                        id="theme-font-size"
                        value={data.theme.fontSize}
                        label="Theme Font Size"
                        onChange={(e) => {
                            setData({...data, theme: {...data.theme, fontSize: e.target.value}})
                        }}
                    >
                        {fontSizes.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                {/* select body text color dropdown */}
                <FormControl fullWidth sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="body-color-label">Body Text Color</InputLabel>
                    <Select
                        labelId="body-color-label"
                        id="body-color"
                        value={data.body.color}
                        label="Body Color"
                        onChange={(e) => {
                            setData({...data, body: {...data.body, color: e.target.value}})
                        }}
                    >
                        {colors.map((color) => <MenuItem value={color} disabled={color === data.body.backgroundColor || color === data.theme.color}>
                            {color}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select body background color dropdown */}
                <FormControl fullWidth sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="body-background-label">Body Background</InputLabel>
                    <Select
                        labelId="body-background-label"
                        id="body-background"
                        value={data.body.backgroundColor}
                        label="Body Background"
                        onChange={(e) => {
                            setData({...data, body: {...data.body, backgroundColor: e.target.value}})
                        }}
                    >
                        {colors.map((color) => <MenuItem value={color} disabled={color === data.body.color || color === data.theme.backgroundColor}>
                            {color}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select body font dropdown */}
                <FormControl fullWidth sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="body-font-label">Body Font</InputLabel>
                    <Select
                        labelId="body-font-label"
                        id="body-font"
                        value={data.body.fontFamily}
                        label="Body Font"
                        onChange={(e) => {
                            setData({...data, body: {...data.body, fontFamily: e.target.value}})
                        }}
                    >
                        {fonts.map((font) => <MenuItem value={font}>{font}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* select body font size dropdown */}
                <FormControl fullWidth sx={{ my: 2, minWidth: 120, flexGrow: 1 }}>
                    <InputLabel id="body-font-size-label">Body Font Size</InputLabel>
                    <Select
                        labelId="body-font-size-label"
                        id="body-font-size"
                        value={data.body.fontSize}
                        label="Body Font Size"
                        onChange={(e) => {
                            setData({...data, body: {...data.body, fontSize: e.target.value}})
                        }}
                    >
                        {fontSizes.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            {/* links */}
            <Typography variant="h5" gutterBottom>
                Links
            </Typography>
            {/* add link */}
            <Paper sx={{ p: 2 }} elevation={1}>
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
            </Paper>

            <Button variant="contained" onClick={saveSettings} sx={{ mt: 2, width: '15rem' }} size="medium">
                Save settings
            </Button>

        </Paper>



        
        
        
        
        <Divider sx={{ my: 2 }} />
        {/* upload file to be saved in the folder */}
        <Paper sx={{ p: 2, my: 2 }} elevation={1}>
            <Typography variant="h5" gutterBottom>
                Upload Image Files
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel htmlFor="cover-upload" shrink>Upload Cover</InputLabel>
                <Input
                    id="cover-upload"
                    type="file"
                    name="cover"
                    onChange={(e) => {
                        setData({...data, coverImg: e.target.files[0]})
                        console.log(e.target.files[0],'file 1')
                    }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel htmlFor="logo-upload" shrink>Upload Logo</InputLabel>
                <Input
                    id="logo-upload"
                    type="file"
                    name="logo"
                    onChange={(e) => {
                        setData({...data, logo: e.target.files[0]})
                        console.log(e.target.files[0],'file 2')
                    }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel htmlFor="footer-upload" shrink>Upload Footer</InputLabel>
                <Input
                    id="footer-upload"
                    type="file"
                    name="footer"
                    onChange={(e) => {
                        setData({...data, footerImage: e.target.files[0]})
                        console.log(e.target.files[0],'file 3')
                    }}
                />
            </FormControl>
            <Button variant="contained" onClick={()=>save(data)}>Upload and Save</Button>
        </Paper>
    </Box>
  </>)
}

export default SettingsForm