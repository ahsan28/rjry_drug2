import { Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, TextField, Typography } from "@mui/material";
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

const PublicationForm = ({ formHelper, setFormHelper }) => {
  const { user, setUser } = useContext(UserContext);
  const [info, setInfo] = useState({
    category: "publication",
    type: formHelper.type,
    title: "",
    // description: "",
    link: "",
  });

  useEffect(() => {
    if (formHelper.id !== "new") {
      InfoService.read(formHelper.id).then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [formHelper.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formHelper.id === "new") {
      InfoService.create(info)
        .then((res) => {
          console.log(res);
          setFormHelper({open: false, type: formHelper.type, id: "new"});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      InfoService.update(info)
        .then((res) => {
          console.log(res);
          setFormHelper({open: false, type: formHelper.type, id: "new"});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    InfoService.remove(formHelper.id)
      .then((res) => {
        console.log(res);
        setFormHelper({open: false, type: formHelper.type, id: "new"});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: "100%", mt: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "100%", mt: 1 }}>
            <TextField id="category" label="Category" variant="outlined" fullWidth value={info.category} onChange={(e) => setInfo({ ...info, category: e.target.value })} hidden disabled margin='dense' />
            <TextField id="type" label="Type" variant="outlined" fullWidth value={info.type} onChange={(e) => setInfo({ ...info, type: e.target.value })} hidden disabled margin='dense' />
            <TextField id="title" label="Title" variant="outlined" fullWidth value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} margin='dense' />
            {/* <TextField id="description" label="Description" variant="outlined" fullWidth value={info.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} /> */}
            <TextField id="link" label="Link" variant="outlined" fullWidth value={info.link} onChange={(e) => setInfo({ ...info, link: e.target.value })} margin='dense' />
        </Box>
        <Box sx={{ width: "100%", maxWidth: "100%", display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" sx={{ bgcolor: "skyblue", color: "white", width: "5rem" }} onClick={() => setFormHelper({open: false, type: formHelper.type, id: "new"})}>
            Cancel
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            {formHelper.id !== "new" && (
              <Button variant="contained" sx={{ bgcolor: "red", color: "white", width: "5rem" }} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button type="submit" variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem"}} onClick={handleSubmit}>
              {formHelper.id === "new" ? "Add" : "Update"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Publication = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [cover, setCover] = useState(null);
  const [tab, setTab] = useState('buku');
  // const [tabData, setTabData] = useState([]);
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

  // useEffect(() => {
  //   setTabData(data.filter((item) => item.type === tab));
  // }, [tab]);


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
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 1, my: 2 }}>
            {data.length>0? data.filter(val=>val.type===tab).map((datum, index) => (<>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', p: 1, bgcolor: 'background.paper' }} key={datum._id}>
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
          </Box>
          {/* <TabPanel value="buku" sx={{ px:0}}>
          </TabPanel>
          <TabPanel value="artikel" sx={{ px:0}}>
            Item Two
          </TabPanel>
          <TabPanel value="akhbar" sx={{ px:0}}>
            Item Three
          </TabPanel>
          <TabPanel value="module" sx={{ px:0}}>
            Item Four
          </TabPanel> */}
        </TabContext>
      </Box>

    </Container>
    <Dialog open={formHelper.open} onClose={() => setFormHelper({open: false, type: tab, id: "new"})} fullWidth maxWidth="md">
      <DialogTitle>{formHelper.id === "new" ? "Add" : "Edit"} {tab}</DialogTitle> 
      <DialogContent>
        <PublicationForm formHelper={formHelper} setFormHelper={setFormHelper} />
      </DialogContent>
    </Dialog>
  </>);
};

export default Publication;
