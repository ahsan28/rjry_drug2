import { Box, Button, Container, Grid, ListItemButton, ListItemIcon, ListItemText, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CoverflowGallery from "../Hooks/CoverflowGallery";
import ActivityForm from "../Forms/ActivityForm";
import ActivityService from "../../services/activity.services";
import MediaService from "../../services/media.services";
import ViewImage from "../Hooks/ViewImage";
import { UserContext } from "../../UserContext";

// const activities = [
//   {
//     id: 1,
//     title: 'Hiking at Mount Everest',
//     date: '2022-01-01',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     id: 2,
//     title: 'Swimming with dolphins',
//     date: '2022-02-01',
//     description: 'Suspendisse potenti. Praesent eget molestie sapien, quis ullamcorper quam.',
//   },
//   {
//     id: 3,
//     title: 'Camping at Yosemite National Park',
//     date: '2022-03-01',
//     description: 'Nulla tempus, arcu non pharetra commodo, enim lorem tincidunt erat, ac rhoncus leo turpis eu ipsum.',
//   },
// ];

const ActivityList = ({ activities, onItemClick }) => {
  console.log("🚀 ~ file: Activity2.js:100 ~ ActivityList ~ activities", activities)

  return (
  <Paper sx={{ p: 2, width: "100%", height: "100%" }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Aktiviti
    </Typography>
    {activities.map((activity,index) => (
      <ListItemButton
      key={activity.id}
      sx={{ py: 0, minHeight: 32, cursor: 'pointer' }}
      onClick={() => onItemClick(activity)}
    >
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 'medium' }}>
          {index + 1}
        </Typography>
      </ListItemIcon>

      <ListItemText
        primary={activity.title}
        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
      />
    </ListItemButton>
      // <Typography key={activity.id} onClick={() => onItemClick(activity)} sx={{ cursor: 'pointer', mb: 1 }}>
      //   {activity.title}
      // </Typography>
    ))}
  </Paper>
)};

const ActivityDetail = ({ activity }) => {
  useEffect(() => {
    console.log("🚀 ~ updated: Activity", activity)
  }, [activity])

  return (
  <Paper sx={{ p: 2, width: "100%", height: "100%" }}>
    <Typography variant="h6">
      {activity.title}
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      {activity.description}
    </Typography>
    <CoverflowGallery images={activity.images} divider={true} thumb={true} simple={true} />
  </Paper>
)};

const Activity = () => {
  const { user, setUser } = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [tab, setTab] = useState('mesyuarat');
  const [formHelper, setFormHelper] = useState({open: false, category: "activity", id: "new", infoType: tab});


  const handleChange = (event, newValue) => {
    setTab(newValue);
    // setSelectedActivity(null);
  };

  useEffect(() => {
    ActivityService.readAll(tab).then((res) => {
      if (res.data) {
        setActivities(res.data);
        if (res.data.length > 0) setSelectedActivity(res.data[0]);
        else setSelectedActivity(null);
      }
    });
  }, [tab]);

  const handleItemClick = (activity) => {
    setSelectedActivity(activity);
  };


  return (<>
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Aktiviti"}
      </Typography>
    </Box>

    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3, height: "100%" }}>
      {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }} onClick={()=>{
          setFormHelper({open: true, category: "activity", id: "new", infoType: tab});
          } }>
          +
        </Button>
      </Box>}

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList 
              // change selected background to orange and text color white, non-selected background white and text color orange
              onChange={handleChange} 
              aria-label="lab API tabs example" 
              // centered 
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
          <Grid container spacing={1}>
            {activities ? <>
            <Grid item xs={12} md={4} lg={3}>
              <ActivityList activities={activities} onItemClick={handleItemClick} />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              {selectedActivity ? (
                <ActivityDetail activity={selectedActivity} />
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
