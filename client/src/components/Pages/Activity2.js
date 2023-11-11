import { Box, Button, Container, Divider, Grid, ListItemButton, ListItemIcon, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CoverflowGallery from "../Hooks/CoverflowGallery";
import ActivityForm from "../Forms/ActivityForm";
import ActivityService from "../../services/activity.services";
import MediaService from "../../services/media.services";
import ViewImage from "../Hooks/ViewImage";
import { UserContext } from "../../UserContext";
import Loader from "../Pages/Loader";
import ComponentLoader from '../Pages/ComponentLoader';


const useStyles = makeStyles((theme) => ({
  listItem: {
    position: 'relative',
    transition: 'background-color 0.3s',
    backgroundColor: 'transparent',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.sliding': {
      transition: 'transform 0.3s',
      transform: 'translateX(0)',
    },
  },
}));

const ActivityList = ({ activities, onItemClick, selectedActivity }) => {
  console.log("🚀 ~ file: Activity2.js:100 ~ ActivityList ~ activities", activities)
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState(0);
  const [slidingIndex, setSlidingIndex] = useState(-1);

  const handleItemClick = (index) => {
    setSlidingIndex(activeItem);
    setActiveItem(index);
  };
  return (
  <Paper sx={{ p: 2, width: "100%", height: "100%" }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 20 }}>
      Aktiviti
    </Typography>
    <List>
      {activities.map((activity,index) => (
        <ListItem
        button
        key={index}
        selected={selectedActivity && selectedActivity._id === activity._id}
        // className={`${classes.listItem} ${ activeItem === index ? 'active' : '' } ${slidingIndex >= 0 && index > slidingIndex ? 'sliding' : ''}`}
        sx={{ p: 0, minHeight: 32, borderRadius: 0.5, cursor: 'pointer', transition: '0.2s', mb: 0.5,
          '&:hover': { pl: 1 }, 
          '&.Mui-selected': { bgcolor: 'orange', pl: 1, ml: -1, color: 'white' },
          '&.Mui-selected:hover': { bgcolor: 'lightsalmon', ml: -0.5 },  
        }}
        onClick={() => {handleItemClick(index); onItemClick(activity)}}
      >
        <ListItemIcon sx={{ minWidth: 24 }}>
          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 'bold', color: selectedActivity && selectedActivity._id === activity._id ? 'white' : 'black' }}>
            {index + 1}.
          </Typography>
        </ListItemIcon>

        <ListItemText
          primary={activity.title}
          primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
        />
      </ListItem>
        // <Typography key={activity.id} onClick={() => onItemClick(activity)} sx={{ cursor: 'pointer', mb: 1 }}>
        //   {activity.title}
        // </Typography>
      ))}
    </List>
  </Paper>
)};

const ActivityDetail = ({ activity, cLoading, setCLoading }) => {
  console.log("🚀 ~ file: Activity2.js:84 ~ ActivityDetail ~ cLoading:", cLoading)
  useEffect(() => {
    console.log("🚀 ~ updated: Activity", activity)
  }, [activity])

  return (
  <Paper sx={{ p: 2, width: "100%", height: "100%", position: 'relative' }}>
    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
      {activity.title}
      <Divider sx={{ my: 1, borderColor: 'transparent' }} />
    </Typography>

    <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 'bold', mb: 1, fontStyle: 'italic', color: '#007aff' }}>
      Description
    </Typography>
    <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line', textAlign: 'justify' }}>
      {activity.description}
    </Typography>
    <CoverflowGallery images={activity.images} divider={true} thumb={true} simple={true} setCLoading={setCLoading} />
    {cLoading && <ComponentLoader />}
  </Paper>
)};

const Activity = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [tab, setTab] = useState('mesyuarat');
  const [formHelper, setFormHelper] = useState({open: false, category: "activity", id: "new", infoType: tab});
  const [cLoading, setCLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);

    // setSelectedActivity(null);
  };
  
  useEffect(() => {
    setIsLoading(true);
    ActivityService.readAll(tab).then((res) => {
      if (res.data) {
        setActivities(res.data);
        setIsLoading(false);
        if (res.data.length > 0) setSelectedActivity(res.data[0]);
        else setSelectedActivity(null);
      }
    });
  }, [tab]);

  const handleItemClick = (activity) => {
    setCLoading(true);
    setSelectedActivity(activity);
  };


  return (<>
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Aktiviti"}
      </Typography>
    </Box>

    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3, height: "100%" }}>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb:2 }}>
            <TabList 
              // change selected background to orange and text color white, non-selected background white and text color orange
              onChange={handleChange} 
              aria-label="lab API tabs example" 
              // centered 
              variant="scrollable"
            scrollButtons="auto"
              selectionFollowsFocus={true}
              sx={{ 
                '& .MuiTab-root': { fontSize: '1rem', transition: '0.4s' }, 
                '& .Mui-selected': { borderRadius: '16px 16px 0 0', border: '1px solid orange', color: 'black' },
              }}
              TabIndicatorProps={{style: {background:'orange'}}}
              >
              <Tab label={"mesyuarat"} value="mesyuarat" />
              <Tab label={"bengkel"} value="bengkel" />
              <Tab label={"latihan"} value="latihan" />
              <Tab label={"pengumpulan"} value="pengumpulan" />
              <Tab label={"kolaborasi"} value="kolaborasi" />
            </TabList>
          </Box>
          {user && <Box sx={{ position: "absolute", right: 0, zIndex: 1, mx: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }} onClick={()=>{
          setFormHelper({open: true, category: "activity", id: "new", infoType: tab});
          } }>
          +
        </Button>
      </Box>}
          <Grid container spacing={1}>
            {activities ? <>
            <Grid item xs={12} md={4} lg={3}>
              <ActivityList activities={activities} onItemClick={handleItemClick} selectedActivity={selectedActivity} />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              {selectedActivity ? (
                <ActivityDetail activity={selectedActivity} cLoading={cLoading} setCLoading={setCLoading} />
              ) : (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">Select an activity to view details</Typography>
                </Paper>
              )}
            </Grid>
            </> : <Grid item xs={12} sm={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">No activities yet</Typography>
                <Typography variant="subtitle2">Click the button above to add new activities</Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2">Image below is the mock</Typography>
                <ViewImage image={'6418fb5fc75e8fe3920a0431'} sx={{width: "100%", height: "auto"}} />
              </Paper>
              </Grid>}
          </Grid>
          {/* <TabPanel value="mesyuarat" sx={{ px:0}}>
          </TabPanel>
          <TabPanel value="bengkel" sx={{ px:0}}>
            Item Two
          </TabPanel>
          <TabPanel value="latihan" sx={{ px:0}}>
            Item Three
          </TabPanel>
          <TabPanel value="pengumpulan" sx={{ px:0}}>
            Item Four
          </TabPanel>
          <TabPanel value="kolaborasi" sx={{ px:0}}>
            Item Five
          </TabPanel> */}
        </TabContext>
      </Box>
      <ActivityForm formHelper={formHelper} setFormHelper={setFormHelper} />
    </Container>
  </>);
};

export default Activity;
