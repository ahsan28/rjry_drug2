import { useContext, useEffect, useState } from 'react'
import DataService from '../../services/data.services'
import MediaService from '../../services/media.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Select, Typography, MenuItem, Paper, Card, CardMedia, CardActions, Container, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
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
const thm = [
    // --themeFont: 'Open Sans', sans-serif, 'serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana';
    // --headerColor: skyblue;
    // --headerTextColor: black;
    // --themeSize: 1.5rem;
  
    // --bodyFont: 'Open Sans', sans-serif, 'serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana';
    // --bodyBgColor: white;
    // --bodyFontColor: black;
    // --bodySize: 1rem;
  
    // --stripFont: 'Open Sans', sans-serif, 'serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana';
    // --stripBgColor: orange;
    // --stripFontColor: white;
    // --stripSize: 2.5rem;
    {
        name: 'Default',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#4CAF50', // Green - OK as is
            info: '#2196F3', // Blue - OK as is
            warning: '#FFC107', // Lighter amber for better contrast
            error: '#F44336', // Red - OK as is

            primary: '#3F51B5', // Indigo - OK as is
            secondary: '#9C27B0', // Purple - OK as is
            primaryText: '#FFFFFF', // White for contrast with primary
            secondaryText: '#FAFAFA', // Off-white for contrast with secondary
            
            body: '#FFFFFF', // Pure white for better contrast
            paper: '#F5F5F5', // Lighter grey to differentiate from background
            text: '#212121', // Darker grey for better readability
            link: '#1E88E5', // Bright blue for links

            header: '#E8E8E8', // Slightly lighter than footer for distinction
            footer: '#DEDEDE', // Slightly darker to define footer area
            stripe: '#8FBC8F', // A softer green for Dark Sea Green
            headerText: '#212121', // Same as text for consistency
            footerText: '#212121', // Same as text for consistency
            stripeText: '#FFFFFF', // White for contrast on dark sea green
        },
    }, {
        name: 'Dark',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#4CAF50', // Bright green for visibility
            info: '#2196F3', // Bright blue
            warning: '#FFC107', // Bright amber
            error: '#F44336', // Bright red

            primary: '#90CAF9', // Light blue for primary elements
            secondary: '#CE93D8', // Soft purple for secondary elements
            primaryText: '#000000', // Black for contrast with primary
            secondaryText: '#000000', // Black for contrast with secondary
            
            body: '#212121', // Dark grey
            paper: '#424242', // Slightly lighter grey for paper elements
            text: '#E0E0E0', // Light grey for text
            link: '#BBDEFB', // Light blue for links

            header: '#333333', // Very dark grey for header
            footer: '#333333', // Same as header
            stripe: '#6A1B9A', // Deep purple
            headerText: '#E0E0E0', // Light grey for header text
            footerText: '#E0E0E0', // Light grey for footer text
            stripeText: '#FFFFFF', // White for stripe text
        },
    }, {
        name: 'Classic Blue',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#81C784', // Soft green
            info: '#64B5F6', // Light blue
            warning: '#FFD54F', // Soft yellow
            error: '#E57373', // Soft red

            primary: '#0D47A1', // Classic blue
            secondary: '#FF8A65', // Coral for contrast
            primaryText: '#FFFFFF', /* White for contrast */
            secondaryText: '#000000', /* Black for contrast */
            
            body: '#E3F2FD', // Very light blue
            paper: '#BBDEFB', // Lighter blue
            text: '#1A237E', // Dark blue for text
            link: '#FFC107', /* Amber for links */

            header: '#0D47A1', // Classic blue for header
            footer: '#0D47A1', // Same as header
            stripe: '#5C6BC0', // Moderate blue
            headerText: '#FFFFFF', // White for header text
            footerText: '#FFFFFF', // White for footer text
            stripeText: '#FFFFFF', // White for stripe text
        },
    }, {
        name: 'Baby Blue',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#A5D6A7', // Soft mint green
            info: '#81D4FA', // Baby blue
            warning: '#FFE082', // Light amber
            error: '#EF9A9A', // Soft red

            primary: '#4FC3F7', // Lighter blue
            secondary: '#F48FB1', // Pink for secondary
            primaryText: '#000000', /* Black for contrast */
            secondaryText: '#FFFFFF', /* White for contrast */
            
            body: '#E1F5FE', // Very light blue
            paper: '#B3E5FC', // Lighter blue
            text: '#0277BD', // Dark blue for text
            link: '#FF7043', /* Deep orange for links */

            header: '#29B6F6', // Light blue for header
            footer: '#29B6F6', // Same as header
            stripe: '#4DD0E1', // Cyan
            headerText: '#FFFFFF', // White for header text
            footerText: '#FFFFFF', // White for footer text
            stripeText: '#FFFFFF', // White for stripe text
        },
    }, {
        name: 'Green',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#81C784', // Soft Green
            info: '#4DD0E1', // Turquoise
            warning: '#FFD54F', // Amber
            error: '#E57373', // Soft Red

            primary: '#66BB6A', // Green
            secondary: '#26A69A', // Teal
            primaryText: '#FFFFFF', /* White for contrast */
            secondaryText: '#000000', /* Black for contrast */
            
            body: '#E8F5E9', // Very Light Green
            paper: '#C8E6C9', // Light Green
            text: '#1B5E20', // Dark Green
            link: '#FFEB3B', /* Yellow for links */

            header: '#A5D6A7', // Light Green
            footer: '#A5D6A7', // Light Green
            stripe: '#43A047', // Medium Green
            headerText: '#004D40', // Dark Teal
            footerText: '#004D40', // Dark Teal
            stripeText: '#FFFFFF', // White
        },
    }, {
        name: 'Orange',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#AED581', // Light Green
            info: '#4FC3F7', // Light Blue
            warning: '#FFB74D', // Light Orange
            error: '#FF8A65', // Soft Red

            primary: '#FFA726', // Orange
            secondary: '#FF7043', // Deep Orange
            primaryText: '#000000', /* Black for contrast */
            secondaryText: '#FFFFFF', /* White for contrast */
            
            body: '#FFF3E0', // Light Orange White
            paper: '#FFE0B2', // Soft Orange
            text: '#E65100', // Dark Orange
            link: '#4CAF50', /* Green for links */

            header: '#FFCCBC', // Light Orange
            footer: '#FFCCBC', // Light Orange
            stripe: '#FB8C00', // Vivid Orange
            headerText: '#BF360C', // Dark Brownish Orange
            footerText: '#BF360C', // Dark Brownish Orange
            stripeText: '#FFFFFF', // White
        },
    }, {
        name: 'Purple',
        fontFamily: 'sans-serif',
        sheds: {
            success: '#81C784', // Light Green
            info: '#64B5F6', // Light Blue
            warning: '#FFD54F', // Amber
            error: '#E57373', // Light Red

            primary: '#9575CD', // Medium Purple
            secondary: '#F06292', // Pink
            primaryText: '#FFFFFF', /* White for contrast */
            secondaryText: '#000000', /* Black for contrast */
            
            body: '#F3E5F5', // Lavender
            paper: '#EDE7F6', // Lighter Lavender
            text: '#5E35B1', // Dark Purple
            link: '#FFEB3B', /* Yellow for links */

            header: '#D1C4E9', // Soft Purple
            footer: '#D1C4E9', // Soft Purple
            stripe: '#BA68C8', // Purple
            headerText: '#4A148C', // Darker Purple
            footerText: '#4A148C', // Darker Purple
            stripeText: '#FFFFFF', // White
        },
    },
    // {
    //     name: 'Blue', 
    //     header: {color: 'darkblue', fontFamily: 'tahoma', backgroundColor: 'cornflowerblue', fontSize: '1rem'}, 
    //     stripe: {color: '#8fc7ff', fontFamily: 'sans-serif', backgroundColor: 'navy', fontSize: '2.5rem'},
    //     body: {color: '#d8d8d8', fontFamily: 'sans-serif', backgroundColor: '#557abb', fontSize: '1rem'},
    // },
]

const SettingsForm = () => {
    const { user, setUser, settings, setSettings } = useContext(UserContext);
    console.log("🚀 ~ file: SettingsForm.js:55 ~ SettingsForm ~ user:", user)
    const [covers, setCovers] = useState([]);
    const [coversFiles, setCoversFiles] = useState([]);
    const [logo, setLogo] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [footer, setFooter] = useState(null);
    const [footerFile, setFooterFile] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [myThemes, setMyThemes] = useState(thm);
    const [data, setData] = useState({
        _id: null,
        ...thm[0],
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
    function saveSettings(newData) {
        if(window.confirm('Are you sure you want to save these settings?')) {
            UserService.updateSettings(user._id, newData)
            .then((res) => {
                console.log('saveSettings', res)
                setSettings(newData)
                setShowEdit(false)
            })
            .catch((err) => {
                console.log(err);
            });
        }
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
  <Box className="themeCBF" sx={{ height: '72px' }} />
  <Container>

    <h1>Website Theme Settings</h1>
    {/* <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="default"
    >
        <FormControlLabel value="default" control={<Radio />} label="Default" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        <FormControlLabel value="blue" control={<Radio />} label="Blue" />
    </RadioGroup> */}

    <Box sx={{ width: '100%' }}>
        <Box sx={{my: 2, gap: 1, display: 'flex', flexDirection: 'column'}}>
            {/* Preview a page at the center  */}
            <Box sx={{display: 'block', width: '100%', height: 350, position: 'relative', background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 3px, #dedede 10px, #dedede 8px)'}}>
                {/* make a stiky label near top left corner with border and radius */}
                <Box sx={{position: 'absolute', top: 0, height:28, left: 18, width: 'auto', backgroundColor: '#79d2ff', border: '4px solid #b5daff', borderRadius: "0 0 12px 12px", display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: 3}}>
                    <Typography gutterBottom sx={{px: 2, fontSize: 13, color: 'honeydew',fontFamily: 'monospace'}}>
                        Preview
                    </Typography>
                </Box>
                {/* make mythemes tiles preview horizontal scrollable */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'flex-start', width: '100%', height: '100%', overflowX: 'auto', overflowY: 'hidden', position: 'relative', px:5}}>
                {myThemes.map((t, i) => (
                    <Paper key={i} elevation={1} 
                        onClick={() => { saveSettings(t) }}
                        sx={{ width: '100%', minWidth: 200, display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', borderRadius: '4px', border: '2px solid #b5daff', boxShadow: 3, '&:hover': {border: '2px solid #79d2ff'}}}>
                        <Box sx={{width: '100%', minHeight: 20, backgroundColor: t.sheds.header, borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', px:2, borderRadius: '4px 4px 0 0', '-webkit-text-stroke': '0.2px white', textShadow: '0 0 2px black', color: t.sheds.headerText, fontSize: '1rem' }}>
                                {/* Pengenalan  Profil  Aktiviti  Penerbitan  ... */}
                                {t.name}
                            </Typography>
                        </Box>
                        <Box sx={{width: '100%', minHeight: 20, backgroundColor: t.sheds.stripe }}>
                            <Typography sx={{textAlign: 'center', color: t.sheds.stripeText, fontSize: '2.5rem' }}>
                                {/* stripe color and text color, size, background etc. goes here. */}
                                Title
                            </Typography>
                        </Box>
                        <Box sx={{width: '100%', minHeight: 150, backgroundColor: t.sheds.body }}>
                            <Typography sx={{textAlign: 'center', lineHeight: '50px', px:2, color: t.sheds.text }}>
                                {/* Body color and text color, size, background etc. goes here. */}
                                The body text example of the theme
                            </Typography>
                            {/* add a large green check mark here bottom right corner if the theme is selected */}
                            {t.name === data.name && <Box sx={{position: 'absolute', left: -10, top: -10, width: 50, height: 50, backgroundColor: '#feff0080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 3, border: '2px solid #004100'}}>
                                <Typography sx={{color: '#00b536', fontSize: 30, fontWeight: 'bold'}}>
                                    ✓
                                </Typography>
                            </Box>}
                        </Box>
                        <Box sx={{width: '100%', minHeight: 15, backgroundColor: t.sheds.footer, borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px'}} />
                    </Paper>
                ))}
                </Box>
                <Box sx={{position: 'absolute', bottom: 0, right: 0, m:2 }}>
                     <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-around'}}>
                     
                     
                     {/* {showEdit ? <>
                            <Button variant="contained" onClick={saveSettings} size="small" color="success" sx={{width: '6rem'}}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={() => setShowEdit(false)} size="small" color="error" sx={{width: '6rem'}}>
                                Cancel
                            </Button>
                        </>: <Button variant="contained" onClick={() => setShowEdit(true)} size="small" color="primary" sx={{width: '6rem'}}>
                            Modify    
                        </Button>} */}
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
                                color={ data.header.backgroundColor } 
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                onChange={ (color, e) => {
                                    if(![data.header.color, data.header.backgroundColor].includes(color.hex))
                                        setData({...data, header: {...data.header, backgroundColor: color.hex}})
                                }}
                                // onChangeComplete={ (color, e) => {
                                //     setData({...data, theme: {...data.header, backgroundColor: color.hex}})
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
                                color={ data.header.color }
                                width={150}
                                presetColors={['#3f3f3f','#4a4a4a','#808080','#ababab','#cecece','#fafafa']}
                                disableAlpha={true}
                                onChange={ (color, e) => {
                                    if(![data.header.color, data.header.backgroundColor].includes(color.hex))
                                        setData({...data, theme: {...data.header, color: color.hex}})
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
                                sx={{textTransform:'uppercase', fontFamily: data.header.fontFamily}}
                                value={data.header.fontFamily}
                                label="Theme Font"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, theme: {...data.header, fontFamily: e.target.value}})
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
                                value={data.header.fontSize}
                                label="Theme Font Size"
                                size="small"
                                onChange={(e) => {
                                    setData({...data, theme: {...data.header, fontSize: e.target.value}})
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
  </Container>
  </>)
}

export default SettingsForm