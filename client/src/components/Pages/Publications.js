import { Box, Button, Container, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {  useParams, useNavigate, Link } from "react-router-dom";
import DataService from "../../services/data.services";
import Image from 'mui-image';
import InfoService from "../../services/info.services";
import { UserContext } from "../../UserContext";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
          setFormHelper({open: false, type: formHelper.pubType, id: "new"});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      InfoService.update(info)
        .then((res) => {
          console.log(res);
          setFormHelper({open: false, type: formHelper.pubType, id: "new"});
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
        setFormHelper({open: false, type: formHelper.pubType, id: "new"});
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
          <Button variant="contained" sx={{ bgcolor: "skyblue", color: "white", width: "5rem" }} onClick={() => setFormHelper({open: false, type: formHelper.pubType, id: "new"})}>
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

const Publications = () => {
  let { pubType } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [type, setType] = useState("Penerbitan");
  const [formHelper, setFormHelper] = useState({ open: false, type: pubType, id: "new" });

  useEffect(() => {
    switch (pubType) {
      case "artikel":
        setType("Artikel");
        break;
      case "buku":
        setType("Buku");
        break;
      case "akhbar":
        setType("Akhbar");
        break;
      case 'module':
        setType("Modul");
        break;
      default:
        setType("Penerbitan");
        break;
    }
    InfoService.readAll("publication", pubType)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [pubType, formHelper.open]);

  // useEffect(() => {
  //   DataService.read("Publications")
  //     .then((res) => {
  //       if (res.data) {
  //         setData(res.data);
  //         if (res.data.cover) {
  //           MediaService.read(res.data.cover)
  //             .then((res) => {
  //               setCover(res.data);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         }
  //       }
  //       else setData({title: "Click edit button to entry", description: "Not in the database yet."});
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (<>
    <Container elevation={0} sx={{ mt: 2, gap: 1, position: 'relative', mb:3 }}>
      {/* edit button */}
      {user && <Box sx={{ position: "absolute", pt: 1, right: 0, zIndex: 1, mx: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}
          onClick={()=>{
            setFormHelper({open: true, type: pubType, id: 'new'});
            }}>
            +</Button>
        </Box>}
      <Box sx={{ width: "100%", textAlign: 'center' }}>
        {/* List of Scientific Publications */}
        <Typography variant="h4" component="h1" gutterBottom>
          List of Scientific {type}
        </Typography>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
        {data.length>0? data.map((datum, index) => (<ListItem button key={index} onClick={() => setFormHelper({open: true, type: pubType, id: datum._id})}>
            <ListItemText primary={datum.title} secondary={datum.link} />
          </ListItem>)
        ): <ListItem button>
            <ListItemText primary="No data" secondary={user?"Click + button to add new data.":null} />
          </ListItem>}
        </List>
      </Box>
      </Box>
    </Container>
    <Dialog open={formHelper.open} onClose={() => setFormHelper({open: false, type: pubType, id: "new"})} fullWidth maxWidth="md">
      <DialogTitle>{formHelper.id === "new" ? "Add" : "Edit"} {type}</DialogTitle> 
      <DialogContent>
        <PublicationForm formHelper={formHelper} setFormHelper={setFormHelper} />
      </DialogContent>
    </Dialog>
  </>
  );
};

export default Publications;
