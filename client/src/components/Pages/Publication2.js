import { Box, Button, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import InfoService from "../../services/info.services";
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";

const Publication = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [cover, setCover] = useState(null);
  const [tab, setTab] = useState('buku');
  const [tabData, setTabData] = useState([]);
  const [formHelper, setFormHelper] = useState({ open: false, type: tab, id: "new" });


  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    InfoService.readAll("publication")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTabData(data.filter((item) => item.type === tab));
  }, [tab]);


  return (<>
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Penerbitan"}
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
              <Tab label={"Buku"} value="buku" />
              <Tab label={"Artikel"} value="artikel" />
              <Tab label={"Akhbar"} value="akhbar" />
              <Tab label={"Module"} value="module" />
            </TabList>
          </Box>
          <TabPanel value="1">
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mt: 2, gap: 1 }}>
          {data.length>0? data.map((datum, index) => (<>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', p: 1, bgcolor: 'background.paper' }}>
              <Typography variant="body1" sx={{ width: '6rem', textAlign: 'center', color: 'primary.main', fontSize: '1.5rem' }}>
                  {index + 1}
              </Typography>
              <Box sx={{ width: '100%', cursor:'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                onClick={()=>window.open(datum.link, "_blank")}>
                <Typography variant="h6" sx={{ textAlign: 'left' }}>
                  {datum.title}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'grey.500', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {datum.link}
                </Typography>
              </Box>
              <Box sx={{ width: '5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
              {user && <IconButton aria-label="edit" onClick={() => setFormHelper({open: true, type: tab, id: datum._id})}>
                <EditOutlinedIcon />
              </IconButton>}
              </Box>
            </Box>
          </>)): <Typography variant="body1">
            No data
            </Typography>}
        {/* <List component="nav" aria-label="main mailbox folders" >
        {data.length>0? data.map((datum, index) => (<ListItem button key={index} sx={{ bgcolor: 'background.paper' }}
          onClick={() => setFormHelper({open: true, type: pubType, id: datum._id})}>
            <ListItemText primary={datum.title} secondary={datum.link} />
          </ListItem>)
        ): <ListItem button>
            <ListItemText primary="No data" secondary={user?"Click + button to add new data.":null} />
          </ListItem>}
        </List> */}
      </Box>
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
        </TabContext>
      </Box>

    </Container>
  </>);
};

export default Publication;
