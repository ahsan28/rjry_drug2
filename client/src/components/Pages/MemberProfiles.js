import React, { useContext, useEffect, useState } from 'react'
import { Paper, Card, CardContent, Typography, Avatar, Box, Container, Button, Divider } from '@mui/material';
import { UserContext } from '../../UserContext';
import UserService from '../../services/user.services';
import ViewImage from '../Hooks/ViewImage';
import MemberForm from '../Forms/MemberForm';
import { Link } from 'react-router-dom';

const MemberProfiles = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [openMemberForm, setOpenMemberForm] = useState(false);
  const [uid, setUid] = useState('new');
  console.log("🚀 ~ file: MemberProfiles.js:8 ~ MemberProfiles ~ users:", users)

  useEffect(() => {
    refreshList();
  }, []);
  
  useEffect(() => {
    refreshList();
  }, [uid]);

  function refreshList () {
    UserService.readAll()
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== "dev"));
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
      
      if (newProfileData.type) formData.append('type', newProfileData.type);
      // if (newProfileData.username) formData.append('username', newProfileData.username);
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
  const memberList = users.map((u) => (
    <Box key={u._id} sx={{ gap: 1, pt:1 }}>
      <Card key={u._id}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ maxWidth: 80, width:80, overflow: 'initial', bgcolor: 'transparent', boxShadow: 'none' }}>
                {/* width 80, height auto */}
                <ViewImage image={u.avatar} width={80} height={'auto'} sx={{minWidth:80, maxHeight:150}} />
              </Card>
              {/* vertical divider line */}
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h6">
                  <a href={u.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  {u.initials} {u.name} {u.surname}
                  </a>
                  </Typography>
                {/* <Typography variant="subtitle1">{user.designation}</Typography> */}
                <Typography variant="subtitle1">{u.expertise}</Typography>
                {/* <Typography variant="body1">{user.phone}</Typography> */}
                <Typography variant="body1">{u.email}</Typography>
                <Typography variant="body1">{u.affiliation}</Typography>

              </Box>
            </Box>
            {user && <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem" }} size="small"
              onClick={() => {
                setUid(u._id);
                setOpenMemberForm(true);
              }}>
              Edit</Button>}


          </Box>
        </CardContent>
      </Card>
    </Box>
  ))

  
  return (<>
    <Container elevation={0} sx={{ mt: 2, gap: 1, position: 'relative', mb:3 }}>
      {user && <Box sx={{ position: "absolute", pt: 1, right: 0, zIndex: 1, mx: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}
        onClick={()=>{
          setUid('new')
          setOpenMemberForm(true)
          }}>
          +</Button>
      </Box>}
      {memberList}
    </Container>
    <MemberForm open={openMemberForm} handleClose={handleClose} handleSubmit={handleProfileSubmit} uid={uid} />
    </>);
}

export default MemberProfiles