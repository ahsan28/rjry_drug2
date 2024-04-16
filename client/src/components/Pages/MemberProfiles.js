import React, { useContext, useEffect, useState } from 'react'
import { Paper, Card, CardContent, Typography, Avatar, Box, Container, Button, Divider, Tab, IconButton } from '@mui/material';
import { UserContext } from '../../UserContext';
import UserService from '../../services/user.services';
import ViewImage from '../Hooks/ViewImage';
import MemberForm from '../Forms/MemberForm';
import { Link } from 'react-router-dom';
import TabList from '@mui/lab/TabList/TabList';
import TabContext from '@mui/lab/TabContext/TabContext';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const MemberProfiles = () => {
  const { user, setUser, setIsLoading } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [openMemberForm, setOpenMemberForm] = useState(false);
  const [uid, setUid] = useState('new');
  const [tab, setTab] = useState('Ketua Penyelidik');


  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    refreshList();
  }, []);
  
  useEffect(() => {
    refreshList();
  }, [uid]);

  function refreshList () {
    setIsLoading(true)
    UserService.readAll()
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== "dev").map((user) => {
          if (["Ahli-Ahli Penyelidik", "GRA", "Ketua Penyelidik", "Ketua Program LRGS"].includes(user.memberType)) return user;
          else return {...user, memberType: "Other Members"}
        }));
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  const handleClose = () => {
    setOpenMemberForm(false);
    setUid('new');
    refreshList()
  };

  const handleProfileSubmit = (newProfileData) => {
    console.log("🚀 ~ file: Profile.js:41 -------------------", newProfileData)
  
      let formData = new FormData();
      // formData.append('_id', user._id);
      formData.append('avatar', newProfileData.avatar);
      
      if (newProfileData.memberType) formData.append('memberType', newProfileData.memberType);
      if (newProfileData.rank) formData.append('rank', newProfileData.rank);
      if (newProfileData.initials) formData.append('initials', newProfileData.initials);
      if (newProfileData.name) formData.append('name', newProfileData.name);
      if (newProfileData.surname) formData.append('surname', newProfileData.surname);
      if (newProfileData.designation) formData.append('designation', newProfileData.designation);
      if (newProfileData.expertise) formData.append('expertise', newProfileData.expertise);
      if (newProfileData.affiliation) formData.append('affiliation', newProfileData.affiliation);
      
      if (newProfileData.email) formData.append('email', newProfileData.email);
      if (newProfileData.phone) formData.append('phone', newProfileData.phone);
      if (newProfileData.link) formData.append('link', newProfileData.link);
      if (newProfileData.address) formData.append('address', newProfileData.address);
      if (newProfileData.about) formData.append('about', newProfileData.about);

      
      if(uid === 'new'){
        UserService.createMember(formData)
                .then((res) => {
                    // setUser(res.data.user)
                    // setUid('new');
                    handleClose();
                    // navigate(`/`)
                })
                .catch((err) => console.log(err));
      } else {
        formData.append('_id', uid);
        UserService.updateMember(formData)
                .then((res) => {
                    // setUser(res.data.user)
                    // setUid('new');
                    handleClose();
                    // navigate(`/`)
                })
                .catch((err) => console.log(err));
      }
    };
  const memberList = users.filter((u) => u.memberType === tab)
    .map((u) => (
    <Box key={u._id} sx={{ borderRadius: '10px',gap:1, mb:1}}>
      <Card key={u._id} sx={{ borderRadius: '10px'}}>
        <CardContent >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ maxWidth: 80, width:80, overflow: 'initial', bgcolor: 'transparent', boxShadow: 'none' }}>
                {/* width 80, height auto */}
                <ViewImage image={u.avatar} width={80} height={'auto'} sx={{minWidth:80, maxHeight:150}} />
              </Card>
              {/* vertical divider line */}
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="caption" >
                  <a href={u.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  {u.initials} {u.name} {u.surname}
                  </a>
                  </Typography>
                {/* <Typography variant="subtitle1">{user.designation}</Typography> */}
                <Typography variant="body1">{u.expertise}</Typography>
                {/* <Typography variant="body1">{user.phone}</Typography> */}
                <Typography variant="subtitle1">{u.email}</Typography>
                <Typography variant="body1">{u.affiliation}</Typography>

              </Box>
            </Box>
            {user && <IconButton aria-label="edit" onClick={() => {
                setUid(u._id);
                setOpenMemberForm(true);
              }}>
              <EditOutlinedIcon />
            </IconButton>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  ))

  
  return (<>
  <Box className="themeCBF" sx={{ height: '72px' }} />
<Box className="stripTheme" sx={{ width: "100%", textAlign: 'center', p: 2, position: "relative" }}>
      <Typography variant="h4" className="themeTitle" align="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        {"Profil"}
      </Typography>
    </Box>
    <Container elevation={0} sx={{ mt: 2, gap: 1, position: 'relative', mb:3 }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb:2 }}>
          <TabList 
            // change selected background to orange and text color white, non-selected background white and text color orange
            onChange={handleChange} 
            aria-label="lab API tabs example" 
            // centered 
            variant="scrollable"
            scrollButtons="auto"
            selectionFollowsFocus={true}
            sx={{ 
              '& .MuiTab-root': { fontSize: '1rem', transition: '0.4s' }, 
              '& .Mui-selected': { borderRadius: '16px 16px 0 0', border: '1px solid orange', color: 'black' },
            }}
            
            >
            <Tab label={"Ketua Penyelidik"} value="Ketua Penyelidik" />
            <Tab label={"Ahli-Ahli Penyelidik"} value="Ahli-Ahli Penyelidik" />
            <Tab label={"GRA"} value="GRA" />
            <Tab label={"Ketua Program LRGS"} value="Ketua Program LRGS" />
            {user && <Tab label={"Other Members"} value="Other Members" />}
          </TabList>
        </Box>
        {user && <Box sx={{ position: "absolute", right: 0, zIndex: 1, mx: 2 }}>
          <Button variant="contained" sx={{ width: "5rem", transform: "translateX(5rem)" }}
          onClick={()=>{
            setUid('new')
            setOpenMemberForm(true)
            }}>
            +</Button>
        </Box>}
        {memberList}
      </TabContext>
    </Container>
    <MemberForm open={openMemberForm} handleClose={handleClose} handleSubmit={handleProfileSubmit} uid={uid} />
    </>);
}

export default MemberProfiles