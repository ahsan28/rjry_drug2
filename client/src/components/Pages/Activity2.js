import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";

const Activity = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const [tab, setTab] = useState('mesyuarat');


  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    DataService.read("Research")
      .then((res) => {
        if (res.data) {
          setData(res.data);
          if (res.data.cover) {
            MediaService.read(res.data.cover)
              .then((res) => {
                setCover(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        else setData({title: "Click edit button to entry", description: "Not in the database yet."});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (<>
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Aktiviti"}
      </Typography>
    </Box>

    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3}}>
      {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" component={Link} to={`/activity_form/${tab}`} sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}>
          +</Button>
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
                '& .MuiTab-root': { color: 'orange', fontSize: '1rem', transition: '0.4s' }, 
                '& .Mui-selected': { color: 'white', bgcolor: 'orange', borderRadius: '5px' },
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
          <TabPanel value="mesyuarat" sx={{ px:0}}>
            Item One
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
          </TabPanel>
        </TabContext>
      </Box>

    </Container>
  </>);
};

export default Activity;
