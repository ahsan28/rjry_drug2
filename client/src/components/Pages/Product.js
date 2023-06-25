import { Avatar, Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, TextField, Typography } from "@mui/material";
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
import VisibilityIcon from '@mui/icons-material/Visibility';

import InfoService from "../../services/info.services";
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";
import ProductForm from "../Forms/ProductForm";

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

function getGoogleDriveId(url) {
  const regExp = /^.*(drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2])
    ? match[2]
    : null;
}

function getEmbedUrl(url) {
  if (url.includes('youtube')) {
    let id = getYouTubeId(url);
    return `https://www.youtube.com/embed/${id}`;
  }
  else if (url.includes('drive')) {
    let id = getGoogleDriveId(url);
    let ID = id.split('/')[0]
    return `https://drive.google.com/file/d/${ID}/preview`
  }
  else return url;
}

function getThumpnail(url) {
  if (url.includes('youtube')) {
    let id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/default.jpg`;
  }
  else if (url.includes('drive')) {
    let id = getGoogleDriveId(url);
    let ID = id.split('/')[0]
    // return `https://drive.google.com/uc?export=view&id=${ID}`
    return `https://drive.google.com/thumbnail?sz=w640&id=${ID}`
  }
  else return url;
}

const Product = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [data, setData] = useState([]); // files
  const [data2, setData2] = useState([]); // links
  const [tab, setTab] = useState('Kerangka');
  const [editHelper, setEditHelper] = useState({open: false, infoId: null, fileId: null, name: ''});
  const [formHelper, setFormHelper] = useState({open: false, infoType: tab, id: "new"});
  const [previewHelper, setPreviewHelper] = useState({open: false, info: {}});

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    reload()
  }, [tab]);


  const reload = () => {
    setIsLoading(true)
    InfoService.readAll("product")
      .then((res) => {
        let tabData = res.data.filter((doc) => doc.infoType === tab);
        setData(tabData.flatMap((doc) => doc.files));
        setData2(tabData.filter(info=> info.link))
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  const linkHandler = (doc) => {
    
    if(doc.link?.includes('youtube')||doc.link?.includes('drive')) {
      setIsLoading(true);
      setPreviewHelper({open: true, info: doc})
      return
    }
    // open link in new tab
    window.open(doc.link,'_blank', 'rel=noopener noreferrer')
  }


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
          {data.length>0 && data.map((doc, index) => (<Card key={index} sx={{ width: '100%',  my:1, borderRadius: "10px" }}>
          <CardContent sx={{ py:'0 !important', px: '8px !important' }}>
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
          ))}
          {data2.length>0 && data2.map((doc, index) => (<Card key={index} sx={{ width: '100%',  my:1, borderRadius: "10px" }} >
          <CardContent sx={{ p:'0 8px 0 0 !important' }}>
              <ListItem sx={{pl:0}} key={index} 
                secondaryAction={<Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <IconButton edge="end" aria-label="download" onClick={()=>linkHandler(doc)}>
                  <VisibilityIcon />
                </IconButton>
                {user && <>
                  <IconButton edge="end" aria-label="edit" onClick={()=>{setFormHelper({open: true, infoType: tab, id: doc._id})}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={()=>{
                    if (window.confirm("Are you sure you want to delete this link?"))
                      InfoService.update({_id: doc._id, link: null})
                        .then((res) => {
                          setData2(data2.filter((item) => item._id !== doc._id));
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
                <ListItemAvatar sx={{pl:0, my:-1, cursor:"pointer", borderRadius: "4px"}}
                  onClick={()=>linkHandler(doc)}>
                  <Image src={getThumpnail(doc.link)} alt={doc.title} width={163} height={92} />
                  {/* <Avatar>
                  </Avatar> */}
                </ListItemAvatar>
                <ListItemText sx={{cursor:"pointer", pl:2}} onClick={()=>linkHandler(doc)}
                  primary={doc.title}
                  secondary={<Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                    {doc.link.includes('youtube') ? 'Youtube' : 'Google Drive'} link
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>}
                />
              </ListItem>
          </CardContent>
          </Card>
          ))}
          {(data.length===0 && data2.length===0) && <Box sx={{ width: '100%', typography: 'body1', textAlign: 'center', mt: 2 }}>
            <Typography variant="h6" className="themeFont" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {"Tiada dokumen"}
            </Typography>
          </Box>}
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
    <ProductForm formHelper={formHelper} setFormHelper={setFormHelper} reload={reload} />
    </Container>
    <Dialog open={editHelper.open} onClose={()=>{setEditHelper({open: false, infoId: null, fileId: null, name: ''})}} maxWidth="md" fullWidth>
      <Box sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <TextField label="Name" variant="outlined" value={editHelper.name} onChange={(e)=>{setEditHelper({...editHelper, name: e.target.value})}} fullWidth />
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem" }} onClick={()=>{
          MediaService.updateFile({_id:editHelper.fileId, originalname: editHelper.name})
            .then((res) => {
              console.log("🚀 ~ file: Product.js:144 ~ .then ~ res", res)
              setData(data.map((item) => item._id === editHelper.fileId ? {...item, originalname: editHelper.name} : item));
              setEditHelper({open: false, infoId: null, fileId: null, name: ''});
            })
            .then((res) => {
              reload()
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
          Update</Button>
      </Box>
    </Dialog>
    <Dialog open={previewHelper.open} onClose={()=>{setPreviewHelper({open: false, info: {}})}} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Typography variant="h4" component="h1" gutterBottom>
          {previewHelper.info.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
      {previewHelper.info.link && <iframe 
        src={getEmbedUrl(previewHelper.info.link)}
        allow="autoplay" 
        title={previewHelper.info.title} 
        width="100%" height="640px" 
        frameBorder="0" allowFullScreen 
        onLoad={()=>{setIsLoading(false)}}
      />}
      </DialogContent>
      <DialogActions sx={{ gap: 1, mx: 2, mb:2 }}>
        <Button onClick={() => setPreviewHelper({open: false, info: {}})} variant="contained" sx={{ bgcolor: "skyblue", color: "white" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>);
};

export default Product;
