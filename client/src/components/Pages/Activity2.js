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
  const [tab, setTab] = useState('1');


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

  useEffect(() => {
    switch (tab) {
      case "1":
        // setTab("Kerangka Sekolah Bebas Dadah");
        break;
      case "2":
        // setTab("Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah");
        break;
      case "3":
        // setTab("Modul Digital Sekolah Bebas Dadah");
        break;
      default:
        // setTab("Kerangka Sekolah Bebas Dadah");
        break;
    }
  }, [tab]);


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
              <Tab label={"mesyuarat"} value="1" />
              <Tab label={"bengkel"} value="2" />
              <Tab label={"latihan"} value="3" />
              <Tab label={"pengumpulan"} value="4" />
              <Tab label={"kolaborasi"} value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            Item One
          </TabPanel>
          <TabPanel value="2">
            Item Two
          </TabPanel>
          <TabPanel value="3">
            Item Three
          </TabPanel>
          <TabPanel value="4">
            Item Four
          </TabPanel>
          <TabPanel value="5">
            Item Five
          </TabPanel>
        </TabContext>
      </Box>

    </Container>
  </>);
};

export default Activity;
