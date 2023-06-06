import { Box, Button, Container, Divider, Grid, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {  useParams, useNavigate, Link } from "react-router-dom";
import ActivityService from "../../services/activity.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import CoverflowGallery from "../Hooks/CoverflowGallery";
import CarouselPage from "../Hooks/CarouselPage";
import ActViewer from "../Forms/ActViewer";
import ViewImage from "../Hooks/ViewImage";

const activities = [
  {
    id: 1,
    title: 'Hiking at Mount Everest',
    date: '2022-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Swimming with dolphins',
    date: '2022-02-01',
    description: 'Suspendisse potenti. Praesent eget molestie sapien, quis ullamcorper quam.',
  },
  {
    id: 3,
    title: 'Camping at Yosemite National Park',
    date: '2022-03-01',
    description: 'Nulla tempus, arcu non pharetra commodo, enim lorem tincidunt erat, ac rhoncus leo turpis eu ipsum.',
  },
];

const ActivityList = ({ activities, onItemClick }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Activities
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
);

const ActivityDetail = ({ activity }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      {activity.title}
    </Typography>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Date: {activity.date}
    </Typography>
    <Typography>{activity.description}</Typography>
  </Paper>
);

const Activities = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedActivity, setSelectedActivity] = useState(null);
  // const [activities, setActivities] = useState(null);
  let { actId } = useParams();

  useEffect(() => {
    ActivityService.read(actId).then((res) => {
      if (res.data) {
        // setActivities(res.data);
      }
    });
  }, [actId]);

  const handleItemClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (<>
  <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Activiti"}
      </Typography>
    </Box>
    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3}}>
      {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" component={Link} to={`/activity_form/${actId}`} sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}>
          +</Button>
      </Box>}
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
    </Container>
  </>
  );
};

export default Activities;
