import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {  useParams, useNavigate, Link } from "react-router-dom";
import ActivityService from "../../services/activity.services";
import MediaService from "../../services/media.services";
import Image from 'mui-image';
import { UserContext } from "../../UserContext";
import CoverflowGallery from "../Hooks/CoverflowGallery";
import CarouselPage from "../Hooks/CarouselPage";
import ActViewer from "./ActViewer";

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
    {activities.map((activity) => (
      <Typography key={activity.id} onClick={() => onItemClick(activity)} sx={{ cursor: 'pointer', mb: 1 }}>
        {activity.title}
      </Typography>
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
  const [activities, setActivities] = useState(null);
  let { actId } = useParams();

  useEffect(() => {
    ActivityService.read(actId).then((res) => {
      if (res.data) {
        setActivities(res.data);
      }
    });
  }, [actId]);

  const handleItemClick = (activity) => {
    setSelectedActivity(activity);
  };

  return (<>
  {user && <Box sx={{display: "flex", justifyContent: "flex-end", mb: 2}}>
      <Button variant="contained" component={Link} to={`/activityform/${actId}`}>Add new activity</Button>
    </Box>}
    <Grid container spacing={3}>
      {activities ? <>
      <Grid item xs={12} sm={5}>
        <ActivityList activities={activities} onItemClick={handleItemClick} />
      </Grid>
      <Grid item xs={12} sm={7}>
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
        </Grid>}
    </Grid>
  </>
  );
};

export default Activities;
