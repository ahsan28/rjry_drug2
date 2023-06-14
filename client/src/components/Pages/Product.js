import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from 'mui-image';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Document, Page } from 'react-pdf';

import DataService from "../../services/data.services";
import MediaService from "../../services/media.services";
import { UserContext } from "../../UserContext";
import ProductForm from "../Forms/ProductForm";

const Product = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [cover, setCover] = useState(null);
  const [tab, setTab] = useState('Kerangka');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [formHelper, setFormHelper] = useState({open: false, infoType: "product", id: "new"});

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
        <TabPanel value="Kerangka" sx={{ px:0}}>
          Item One
        </TabPanel>
        <TabPanel value="Rubrik Guru" sx={{ px:0}}>
          <Document
            file="C:/Users/ahabi/Downloads/M2U_20230505_1819.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </TabPanel>
        <TabPanel value="Modul Digital" sx={{ px:0}}>
          <div>
            <Document file="C:/Users/ahabi/Downloads/M2U_20230505_1819.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
    <ProductForm formHelper={formHelper} setFormHelper={setFormHelper} />
    </Container>
  </>);
};

export default Product;
