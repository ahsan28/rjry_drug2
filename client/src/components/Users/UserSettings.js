import { useContext, useEffect, useState } from 'react'
import DataService from '../../services/data.services'
import { FormControl, InputLabel, Input, FormHelperText, Button, PaginationItem, Box, TextField, Select, Typography, MenuItem } from '@mui/material'
import {Link, useParams, useNavigate } from 'react-router-dom'
import FileUpload from "react-mui-fileuploader"
import {List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, ListSubheader, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import UserService from "../../services/user.services";
import LinearProgress from '@mui/material'
import { UserContext } from "../../UserContext";


const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey', 'silver', 'gold', 'skyblue', 'lime', 'teal']
const fonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'system-ui', 'roboto', 'arial', 'helvetica', 'georgia', 'courier', 'impact', 'garamond', 'bookman', 'arial black', 'avant garde', 'century gothic', 'optima', 'rockwell', 'tahoma', 'times new roman', 'verdana']


const UserSettings = () => {
    const { user, setUser } = useContext(UserContext);
    const [data, setData] = useState(user?.settings)
    console.log("🚀 ~ file: UserSettings.js ~ line 9 ~ UserSettings ~ data", data)
    let navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setData(user.settings)
            console.log("🚀 ~ file: UserSettings.js ~ line 14 ~ UserSettings ~ user", user)
        }
      }, []);


    function save(d) {
        console.log(" save ~ d:", d)
        // add this to formData encType="multipart/form-d"
        const formData = new FormData();
        
        formData.append("userid", user._id);
        formData.append("username", user.username);

        formData.append("logo", d.logo);
        formData.append("cover", d.coverImg);
        formData.append("footer", d.footerImage);
        formData.append("themeColor", d.themeColor);
        formData.append("fontFamily", d.fontFamily);
        formData.append("fontColor", d.fontColor);
        // formData.append("logo", d.logo);
        // formData.append("homepageImage", d.homepageImage);
        




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

    function handleChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    const [file, setFile] = useState(null);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // const formData = new FormData();
    //     // formData.append("file", file);

    //     DataService.upload(formData).then((response) => {
    //         console.log(response.data);
    //     });
    // };

    const handleFileChange = (e) => {
        console.log(111,e.target.files)
        setFile(e.target.files[0]);
    };
    
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
        {/* select theme color dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-theme-small">Theme</InputLabel>
            <Select
                labelId="select-theme-small"
                id="select-theme-small"
                value={data?.themeColor}
                label="Theme"
                onChange={(e) => {
                    setData({...data, themeColor: e.target.value})
                }}
            >
                {/* <MenuItem value=""><em>None</em></MenuItem> */}
                {colors.map(color => <MenuItem value={color} sx={{color: color, textShadow: '1px 1px 3px #000000aa', fontWeight: 'bold', fontStyle: data?.themeColor === color ? 'italic' : 'normal'}} key={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                </MenuItem>)}
            </Select>
        </FormControl>
        {/* select font color dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-font-color-small">Font Color</InputLabel>
            <Select
                labelId="select-font-color-small"
                id="select-font-color-small"
                value={data?.fontColor}
                label="Font Color"
                onChange={(e) => {
                    setData({...data, fontColor: e.target.value})
                }}
            >
                {colors.map(color => <MenuItem value={color} sx={{color: color, textShadow: '1px 1px 3px #000000aa', fontWeight: 'bold', fontStyle: data?.fontColor === color ? 'italic' : 'normal'}} key={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                </MenuItem>)}
            </Select>
        </FormControl>
        {/* select font family dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-font-small">Font</InputLabel>
            <Select
                labelId="select-font-small"
                id="select-font-small"
                value={data?.fontFamily}
                label="Font"
                onChange={(e) => {
                    setData({...data, fontFamily: e.target.value})
                }}
            >
                {fonts.map(font => <MenuItem value={font} sx={{fontFamily: font, fontWeight: 'bold', fontStyle: data?.fontFamily === font ? 'italic' : 'normal'}} key={font}>
                    {/* capitlaize each word */}
                    {font.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </MenuItem>)}
            </Select>
        </FormControl>
        {/* upload file to be saved in the folder */}
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
    </Box>
    <Button variant="contained" onClick={()=>save(data)}>Save</Button>
  </>)
}

export default UserSettings