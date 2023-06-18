import { Avatar, Box, Button, Card, CardContent, Container, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Document, Page } from 'react-pdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import InfoService from "../../services/info.services";
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";
import ProductForm from "../Forms/ProductForm";


const Product = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Product.js:27 ~ Product ~ data:", data)
  const [tab, setTab] = useState('Kerangka');
  const [editHelper, setEditHelper] = useState({open: false, infoId: null, fileId: null, name: ''});
  const [formHelper, setFormHelper] = useState({open: false, infoType: "product", id: "new"});

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setIsLoading(true)
    InfoService.readAll("product")
      .then((res) => {
        let tabData = res.data.filter((doc) => doc.infoType === tab);
        setData(tabData.flatMap((doc) => doc.files));
        setIsLoading(false)
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

  const downloadFile = (fileId) => {
    // load the file using loadImage function from media controller, then create a blob url and download it, keep original file name and extension
    MediaService.read(fileId).then((res) => {
      const filename = res.data.originalname;
      MediaService.loadImage(fileId).then((res) => {
        const url = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
    });
  };



  return (<>
    <Box sx={{ width: "100%", textAlign: 'center', bgcolor: "orange", color: "white", p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Produk"}
      </Typography>
    </Box>
    <Container sx={{ mt: 2, gap: 1, position: 'relative', mb:3}}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange} 
            aria-label="lab API tabs example" 
            // centered 
            scrollButtons="auto" 
            sx={{ 
              '& .MuiTab-root': { fontSize: '1rem', transition: '0.4s' }, 
              '& .Mui-selected': { borderRadius: '16px 16px 0 0', border: '1px solid orange', color: 'black' },
            }}
            TabIndicatorProps={{style: {background:'orange'}}}
            // textColor="secondary"
            // variant="fullWidth"
            // orientation="vertical"
            >
            <Tab label={"Kerangka"} title={"Kerangka Sekolah Bebas Dadah"} value="Kerangka" />
            <Tab label={"Rubrik Guru"} title={"Rubrik Efikasi dan Kompetensi Guru dalam PPDa dalam Bilik Darjah"} value="Rubrik Guru" />
            <Tab label={"Modul Digital"} title={"Modul Digital Sekolah Bebas Dadah"} value="Modul Digital" />
          </TabList>
        </Box>
        {user && <Box sx={{ position: "absolute", right: 0, zIndex: 1, m: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}
            onClick={()=>{ setFormHelper({open: true, infoType: tab, id: "new"}) }}>
            +</Button>
        </Box>}
        {/* show file name and size in KB if it is less than 1MB otherwise show size in MB */}
        <List sx={{ width: '100%' }}>
          {data.length>0? data.map((doc, index) => (<Card key={index} sx={{ width: '100%', bgcolor: '#1976d212', my:1, borderRadius: "10px" }}>
          <CardContent sx={{ py:'0 !important' }}>
              <ListItem
              key={index} 
              secondaryAction={<Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <IconButton edge="end" aria-label="download" onClick={()=>{downloadFile(doc._id)}}>
                  <DownloadIcon />
                </IconButton>
                {user && <>
                  <IconButton edge="end" aria-label="edit" onClick={()=>{setEditHelper({open: true, infoId: doc.infoId, fileId: doc._id, name: doc.originalname })}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={()=>{
                    if (window.confirm("Are you sure you want to delete this file?"))
                      InfoService.removeFile(doc._id)
                        .then((res) => {
                          setData(data.filter((item) => item._id !== doc._id));
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </>}
              </Box>
              }>
                <ListItemAvatar>
                  <Avatar>
                    <InsertDriveFileIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={doc.originalname.split('.')[0]}
                  secondary={<Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                    {doc.size < 1000000 ? `${(doc.size/1000).toFixed(2)} KB` : `${(doc.size/1000000).toFixed(2)} MB`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>}
                />
              </ListItem>
          </CardContent>
          </Card>
          )):<Box sx={{ width: '100%', typography: 'body1', textAlign: 'center', mt: 2 }}>
            <Typography variant="h6" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {"Tiada dokumen"}
            </Typography>
          </Box>
          }
        </List>
        {/* <TabPanel value="Modul Digital" sx={{ px:0}}>
          <div>
            <Document file="C:/Users/ahabi/Downloads/M2U_20230505_1819.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </TabPanel> */}
      </TabContext>
    </Box>
    <ProductForm formHelper={formHelper} setFormHelper={setFormHelper} />
    </Container>
    <Dialog open={editHelper.open} onClose={()=>{setEditHelper({open: false, infoId: null, fileId: null, name: ''})}}>
      <Box sx={{ p: 2, width: "500px" }}>
        <TextField label="Name" variant="outlined" value={editHelper.name} onChange={(e)=>{setEditHelper({...editHelper, name: e.target.value})}} />
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }} onClick={()=>{
          MediaService.updateFile({_id:editHelper.fileId, originalname: editHelper.name})
            .then((res) => {
              console.log("🚀 ~ file: Product.js:144 ~ .then ~ res", res)
              setData(data.map((item) => item._id === editHelper.fileId ? {...item, originalname: editHelper.name} : item));
              setEditHelper({open: false, infoId: null, fileId: null, name: ''});
            })
            .catch((err) => {
              console.log(err);
            });
        }
        }>
          Save</Button>
      </Box>
    </Dialog>
  </>);
};

export default Product;
