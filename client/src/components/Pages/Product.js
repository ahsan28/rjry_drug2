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

const Product = () => {
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
        {"Produk"}
      </Typography>
    </Box>
    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3}}>
      {user && <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 1, m: 2 }}>
        <Button variant="contained" component={Link} to={`/activity_form/${tab}`} sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}>
          +</Button>
      </Box>}
   
      {/* <Box sx={{ width: '100%' }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          wrapped
        >
          <Tab value="one" label={"Kerangka Sekolah Bebas Dadah"} />
          <Tab value="two" label={"Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah"} />
          <Tab value="three" label={"Modul Digital Sekolah Bebas Dadah"} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange} 
            aria-label="lab API tabs example" 
            // centered 
            scrollButtons="auto" 
            sx={{ 
              '& .MuiTab-root': { color: 'orange', fontSize: '1rem', transition: '0.4s' }, 
              '& .Mui-selected': { color: 'white', bgcolor: 'orange', borderRadius: '5px' },
            }}
            TabIndicatorProps={{style: {background:'orange'}}}
            // textColor="secondary"
            // variant="fullWidth"
            // orientation="vertical"
            >
            <Tab wrapped label={"Kerangka Sekolah Bebas Dadah"} value="1" />
            <Tab wrapped label={"Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah"} value="2" />
            <Tab wrapped label={"Modul Digital Sekolah Bebas Dadah"} value="3" />
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
      </TabContext>
    </Box>

    </Container>
  </>);
};

export default Product;
