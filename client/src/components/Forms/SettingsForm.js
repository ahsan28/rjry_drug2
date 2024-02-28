import { useContext, useEffect, useState } from "react";
import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  PaginationItem,
  Box,
  TextField,
  Select,
  Typography,
  MenuItem,
  Paper,
  Card,
  CardMedia,
  CardActions,
  Container,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import FileUpload from "react-mui-fileuploader";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserService from "../../services/user.services";
import LinearProgress from "@mui/material";
import { UserContext } from "../../UserContext";
import ViewImage from "../Hooks/ViewImage";
import { SketchPicker } from "react-color";

const fonts = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "system-ui",
  "roboto",
  "arial",
  "helvetica",
  "georgia",
  "courier",
  "impact",
  "garamond",
  "bookman",
  "arial black",
  "avant garde",
  "century gothic",
  "optima",
  "rockwell",
  "tahoma",
  "times new roman",
  "verdana",
];
// 7 to 22 step 1
const fontSizes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const themes = [
  {
    name: "Default",
    fontFamily: "sans-serif",
    sheds: {
      success: "#347a2a", // Darker green
      info: "#0275d8", // Classic medium blue
      warning: "#e67e22", // Warm, saturated orange
      error: "#d32f2f", // Bold, but readable red

      primary: "#005cb2", // Deeper blue
      secondary: "#ffb300", // Contrasting orange
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#F5F5F5",
      text: "#000000",
      link: "#0066cc", // Slightly brighter blue for links

      header: "#E0E8F9", // Light shade of primary
      footer: "#C4D3EC", // Slightly different light shade
      stripe: "#7A96C9", // More muted shade related to primary
      headerText: "#212121",
      footerText: "#212121",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Dark",
    fontFamily: "sans-serif",
    sheds: {
      success: "#43A047", // Slightly brighter green in dark mode
      info: "#18FFFF", // Aqua blue stands out against dark
      warning: "#FFCC80", // Softened orange
      error: "#EF5350", // Less saturated red

      primary: "#64B5F6", // Softer blue
      secondary: "#FFAB91", // Peach-toned contrast
      primaryText: "#000000",
      secondaryText: "#000000",

      body: "#121212", // Dark gray background
      paper: "#333333",
      text: "#E0E0E0", // Off-white text
      link: "#90CAF9", // Muted blue for links

      header: "#212121",
      footer: "#212121",
      stripe: "#78909C", // Grayish blue
      headerText: "#EEEEEE",
      footerText: "#EEEEEE",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Classic Blue",
    fontFamily: "sans-serif",
    sheds: {
      success: "#318236", // Darker green
      info: "#007bff", // Familiar 'bootstrap blue'
      warning: "#ffc107", // Classic yellow
      error: "#dc3545", // Saturated, readable red

      primary: "#0056b3", // Slightly toned-down blue
      secondary: "#ff8533", // Warm orange contrast
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#E0E8F9",
      text: "#000000",
      link: "#004085", // Darker blue

      header: "#004085",
      footer: "#004085",
      stripe: "#002d5c", // Very dark blue
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Baby Blue",
    fontFamily: "sans-serif",
    sheds: {
      success: "#28a745", // Standard green
      info: "#17a2b8", // Info blue
      warning: "#ffc107", // Standard yellow
      error: "#dc3545", // Standard red

      primary: "#007bff", // Bootstrap blue
      secondary: "#ffc107", // Yellow as contrast
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#E0F7FA", // Very light blue
      text: "#000000",
      link: "#0056b3", // Darker blue for links

      header: "#007bff",
      footer: "#007bff",
      stripe: "#0062cc",
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Green",
    fontFamily: "sans-serif",
    sheds: {
      success: "#28a745", // Standard green
      info: "#00bcd4", // Cyan-like info color
      warning: "#ffc107",
      error: "#dc3545",

      primary: "#00796b", // Dark, natural green
      secondary: "#ffc107",
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#E8F5E9", // Very light green
      text: "#000000",
      link: "#004d40", // Darker green for links

      header: "#1b5e20", // Very dark green
      footer: "#1b5e20",
      stripe: "#2e7d32", // Slightly different dark green
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Orange",
    fontFamily: "sans-serif",
    sheds: {
      success: "#28a745",
      info: "#17a2b8",
      warning: "#fd7e14", // Saturated orange
      error: "#dc3545",

      primary: "#f08032", // Warm orange
      secondary: "#007bff", // Blue as contrast
      primaryText: "#000000",
      secondaryText: "#FFFFFF",

      body: "#FFFFFF",
      paper: "#FFF8E1", // Very light orange
      text: "#000000",
      link: "#ad581c", // Darker orange

      header: "#f08032",
      footer: "#f08032",
      stripe: "#d96b28",
      headerText: "#000000",
      footerText: "#000000",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Purple",
    fontFamily: "sans-serif",
    sheds: {
      success: "#28a745",
      info: "#007bff",
      warning: "#ffc107",
      error: "#dc3545",

      primary: "#6f42c1", // Rich purple
      secondary: "#f8bbd0", // Light pink contrast
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#F8F9FA",
      text: "#000000",
      link: "#431978", // Darker purple

      header: "#5c39a8",
      footer: "#5c39a8",
      stripe: "#4d2c86",
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
];

const thm_old = [
  {
    name: "Default",
    fontFamily: "sans-serif",
    sheds: {
      success: "#347a2a",
      info: "#0275d8",
      warning: "#e67e22",
      error: "#d32f2f",

      primary: "#005cb2", // Deeper blue
      secondary: "#ffb300", // Contrasting orange
      primaryText: "#FFFFFF",
      secondaryText: "#FAFAFA",

      body: "#FFFFFF",
      paper: "#F5F5F5",
      text: "#000000",
      link: "#1E88E5",

      header: "#E0E8F9", // Lighter shade of primary
      footer: "#C4D3EC", // Slightly different lighter shade
      stripe: "#7A96C9", // More muted shade related to primary
      headerText: "#212121",
      footerText: "#212121",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Dark",
    fontFamily: "sans-serif",
    sheds: {
      success: "#4CAF50",
      info: "#2196F3",
      warning: "#FFC107",
      error: "#F44336",

      primary: "#90CAF9",
      secondary: "#CE93D8",
      primaryText: "#000000",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#424242",
      text: "#000000",
      link: "#BBDEFB",

      header: "#333333",
      footer: "#333333",
      stripe: "#6A1B9A",
      headerText: "#E0E0E0",
      footerText: "#E0E0E0",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Classic Blue",
    fontFamily: "sans-serif",
    sheds: {
      success: "#81C784",
      info: "#64B5F6",
      warning: "#FFD54F",
      error: "#E57373",

      primary: "#0D47A1",
      secondary: "#FF8A65",
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#BBDEFB",
      text: "#000000",
      link: "#FFC107",

      header: "#0D47A1",
      footer: "#0D47A1",
      stripe: "#5C6BC0",
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Baby Blue",
    fontFamily: "sans-serif",
    sheds: {
      success: "#A5D6A7",
      info: "#81D4FA",
      warning: "#FFE082",
      error: "#EF9A9A",

      primary: "#4FC3F7",
      secondary: "#F48FB1",
      primaryText: "#000000",
      secondaryText: "#FFFFFF",

      body: "#FFFFFF",
      paper: "#B3E5FC",
      text: "#000000",
      link: "#FF7043",

      header: "#29B6F6",
      footer: "#29B6F6",
      stripe: "#4DD0E1",
      headerText: "#FFFFFF",
      footerText: "#FFFFFF",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Green",
    fontFamily: "sans-serif",
    sheds: {
      success: "#81C784",
      info: "#4DD0E1",
      warning: "#FFD54F",
      error: "#E57373",

      primary: "#66BB6A",
      secondary: "#26A69A",
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#C8E6C9",
      text: "#000000",
      link: "#FFEB3B",

      header: "#A5D6A7",
      footer: "#A5D6A7",
      stripe: "#43A047",
      headerText: "#004D40",
      footerText: "#004D40",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Orange",
    fontFamily: "sans-serif",
    sheds: {
      success: "#AED581",
      info: "#4FC3F7",
      warning: "#FFB74D",
      error: "#FF8A65",

      primary: "#FFA726",
      secondary: "#FF7043",
      primaryText: "#000000",
      secondaryText: "#FFFFFF",

      body: "#FFFFFF",
      paper: "#FFE0B2",
      text: "#000000",
      link: "#4CAF50",

      header: "#FFCCBC",
      footer: "#FFCCBC",
      stripe: "#FB8C00",
      headerText: "#BF360C",
      footerText: "#BF360C",
      stripeText: "#FFFFFF",
    },
  },
  {
    name: "Purple",
    fontFamily: "sans-serif",
    sheds: {
      success: "#81C784",
      info: "#64B5F6",
      warning: "#FFD54F",
      error: "#E57373",

      primary: "#9575CD",
      secondary: "#F06292",
      primaryText: "#FFFFFF",
      secondaryText: "#000000",

      body: "#FFFFFF",
      paper: "#EDE7F6",
      text: "#000000",
      link: "#FFEB3B",

      header: "#D1C4E9",
      footer: "#D1C4E9",
      stripe: "#BA68C8",
      headerText: "#4A148C",
      footerText: "#4A148C",
      stripeText: "#FFFFFF",
    },
  },
];

const SettingsForm = () => {
  const { user, setUser, settings, setSettings } = useContext(UserContext);
  console.log("🚀 ~ file: SettingsForm.js:55 ~ SettingsForm ~ user:", user);
  const [covers, setCovers] = useState([]);
  const [coversFiles, setCoversFiles] = useState([]);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [footer, setFooter] = useState(null);
  const [footerFile, setFooterFile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [myThemes, setMyThemes] = useState(themes);
  const [data, setData] = useState({
    _id: null,
    ...themes[0],
    logo: null,
    covers: [],
    footer: null,

    links: [],
  });
  console.log(
    "🚀 ~ file: UserSettings.js ~ line 9 ~ UserSettings ~ data",
    data
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (settings) {
      setData(settings);
      MediaService.loadImage(settings.logo).then((res) => {
        setLogo(URL.createObjectURL(res.data));
      });
    } else {
      if (user) {
        UserService.getSettings(user.settings)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [settings]);
  console.log(
    "🚀 ~ file: SettingsForm.js:55 ~ useEffect ~ settings:",
    settings
  );

  function save() {
    const formData = new FormData();

    formData.append("userid", user._id);
    formData.append("username", user.username);
    formData.append("_id", data._id || settings._id || user.settings);
    if (data.logoUpdated) formData.append("logo", logoFile);
    if (data.coversUpdated) formData.append("covers", coversFiles);
    if (data.footerUpdated) formData.append("footer", footerFile);
    // formData.append("logo", data.logo);
    // formData.append("covers", data.covers);
    // formData.append("footer", data.footer);

    DataService.upload(formData)
      .then((res) => {
        setUser(res.data.user);
        console.log("okr", res.data);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function saveSettings(newData) {
    if (window.confirm("Are you sure you want to save these settings?")) {
      UserService.updateSettings(user._id, newData)
        .then((res) => {
          console.log("saveSettings", res);
          setSettings(newData);
          setShowEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (!user)
    return (
      <>
        <Typography variant="h1" gutterBottom>
          You are not logged in.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please <Link to="/signin">login</Link> to view this page.
        </Typography>
      </>
    );
  else
    return (
      <>
        <Box className="themeCBF" sx={{ height: "72px" }} />
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

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ my: 2, gap: 1, display: "flex", flexDirection: "column" }}
            >
              {/* Preview a page at the center  */}
              <Box
                sx={{
                  display: "block",
                  width: "100%",
                  height: 450,
                  position: "relative",
                  background:
                    "repeating-linear-gradient(45deg, #ffffff, #ffffff 3px, #dedede 10px, #dedede 8px)",
                }}
              >
                {/* make a stiky label near top left corner with border and radius */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    height: 28,
                    left: 18,
                    width: "auto",
                    backgroundColor: "#79d2ff",
                    border: "4px solid #b5daff",
                    borderRadius: "0 0 12px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    boxShadow: 3,
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      px: 2,
                      fontSize: 13,
                      color: "honeydew",
                      fontFamily: "monospace",
                    }}
                  >
                    Preview
                  </Typography>
                </Box>
                {/* make mythemes tiles preview horizontal scrollable */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    position: "relative",
                    px: 5,
                  }}
                >
                  {myThemes.map((t, i) => (
                    <Paper
                      key={i}
                      elevation={1}
                      onClick={() => {
                        saveSettings(t);
                      }}
                      sx={{
                        width: "100%",
                        minWidth: 200,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        cursor: "pointer",
                        borderRadius: "4px",
                        border: "2px solid #b5daff",
                        boxShadow: 3,
                        "&:hover": { border: "2px solid #79d2ff" },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: 20,
                          backgroundColor: t.sheds.header,
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            px: 2,
                            borderRadius: "4px 4px 0 0",
                            "-webkit-text-stroke": "0.2px white",
                            textShadow: "0 0 2px black",
                            color: t.sheds.headerText,
                            fontSize: "1rem",
                          }}
                        >
                          {/* Pengenalan  Profil  Aktiviti  Penerbitan  ... */}
                          {t.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: 20,
                          backgroundColor: t.sheds.stripe,
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            color: t.sheds.stripeText,
                            fontSize: "2.5rem",
                          }}
                        >
                          {/* stripe color and text color, size, background etc. goes here. */}
                          Title
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: 150,
                          backgroundColor: t.sheds.body,
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            lineHeight: "50px",
                            px: 2,
                            color: t.sheds.text,
                          }}
                        >
                          {/* Body color and text color, size, background etc. goes here. */}
                          The body text example of the theme
                        </Typography>
                        {/* add a large green check mark here bottom right corner if the theme is selected */}
                        {t.name === data.name && (
                          <Box
                            sx={{
                              position: "absolute",
                              left: -10,
                              top: -10,
                              width: 50,
                              height: 50,
                              backgroundColor: "#feff0080",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: 3,
                              border: "2px solid #004100",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#00b536",
                                fontSize: 30,
                                fontWeight: "bold",
                              }}
                            >
                              ✓
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          minHeight: 15,
                          backgroundColor: t.sheds.footer,
                          borderBottomLeftRadius: "4px",
                          borderBottomRightRadius: "4px",
                        }}
                      />
                    </Paper>
                  ))}
                </Box>

                <Box sx={{ display: "block", position: "relative", bottom: 100, left: 0, m: 2 }}>
                    <hr/>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "start", justifyContent: "start" }}>
                        <Button variant="contained" size="small" color="success" sx={{width: '6rem'}}>Success</Button>
                        <Button variant="contained" size="small" color="info" sx={{width: '6rem'}}>Info</Button>
                        <Button variant="contained" size="small" color="warning" sx={{width: '6rem'}}>Warning</Button>
                        <Button variant="contained" size="small" color="error" sx={{width: '6rem'}}>Error</Button>
                    </Box>
                </Box>


                <Box sx={{ position: "absolute", bottom: 0, right: 0, m: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
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

            </Box>

            <Divider sx={{ my: 2 }} />
            {/* upload file to be saved in the folder */}
            <Box sx={{ my: 2 }}>
              <Typography variant="h5" gutterBottom>
                Upload Image Files
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* <Paper sx={{ p: 2, width: '100%' }} elevation={1}>
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
            </Paper> */}

                <Paper elevation={1} sx={{ padding: 2, width: "100%" }}>
                  {logo && (
                    <Card sx={{ maxWidth: 100, mb: 2 }}>
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
                          onClick={() => {
                            setLogo(null);
                            setLogoFile(null);
                            setData({
                              ...data,
                              cover: null,
                              coversUpdated: true,
                            });
                          }}
                          color="error"
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  )}
                  <label htmlFor="logo-upload">
                    <input
                      id="logo-upload"
                      name="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setLogoFile(e.target.files[0]);
                        setLogo(URL.createObjectURL(e.target.files[0]));
                        setData({
                          ...data,
                          logo: e.target.files[0],
                          logoUpdated: true,
                        });
                      }}
                      hidden
                    />
                    <Button
                      variant="contained"
                      component="span"
                      size="small"
                      color="success"
                    >
                      {logo ? "Change Logo" : "Upload Logo"}
                    </Button>
                  </label>
                </Paper>

                {/* <Paper elevation={1} sx={{padding: 2, width: "100%"}}>
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

            </Paper> */}
              </Box>
              <Button variant="contained" onClick={() => save(data)}>
                Upload and Save
              </Button>
              {/* <Divider sx={{ my: 2 }} /> */}
            </Box>
          </Box>
        </Container>
      </>
    );
};

export default SettingsForm;
