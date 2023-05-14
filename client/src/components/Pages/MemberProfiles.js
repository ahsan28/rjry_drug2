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
    console.log("🚀 ~ file: Profile.js:59 ~ handleProfileSubmit ~ newProfileData:", newProfileData)
  
      let formData = new FormData();
      formData.append('_id', user._id);
  
      formData.append('name', newProfileData.name);
      formData.append('surname', newProfileData.surname);
      formData.append('designation', newProfileData.designation);

      formData.append('address', newProfileData.address);
      formData.append('phone', newProfileData.phone);
      formData.append('email', newProfileData.email);
      formData.append('about', newProfileData.about);

      formData.append('avatar', newProfileData.avatar);
      
      
      UserService.updateMember(formData)
              .then((res) => {
                  // setUser(res.data.user)
                  // setUid('new');
                  handleClose();
                  // navigate(`/`)
              })
              .catch((err) => {
                  console.log(err);
              });
    };
  const memberList = users.map((user) => (
    <Box key={user._id} sx={{ gap: 1, pt:1 }}>
      <Card key={user._id}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ width: 80 }}>
                <ViewImage image={user.avatar} />
              </Card>
              {/* vertical divider line */}
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h6">
                  <a href={user.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  {user.initials} {user.name} {user.surname}
                  </a>
                  </Typography>
                {/* <Typography variant="subtitle1">{user.designation}</Typography> */}
                <Typography variant="subtitle1">{user.experties}</Typography>
                {/* <Typography variant="body1">{user.phone}</Typography> */}
                <Typography variant="body1">{user.email}</Typography>
                <Typography variant="body1">{user.affiliation}</Typography>

              </Box>
            </Box>
            <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem" }} size="small"
              onClick={() => {
                setUid(user._id);
                setOpenMemberForm(true);
              }}>
              Edit</Button>


          </Box>
        </CardContent>
      </Card>
    </Box>
  ))

  
  return (<>
    <Container elevation={0} sx={{ pt: 2, gap: 1, position: 'relative' }}>
      {user && <Box sx={{ position: "absolute", pt: 1, right: 0, zIndex: 1, mx: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}
        onClick={()=>setOpenMemberForm(true)}>
          +</Button>
      </Box>}
      {memberList}
    </Container>
    <MemberForm open={openMemberForm} handleClose={handleClose} handleSubmit={handleProfileSubmit} uid={uid} />
    </>);
}

export default MemberProfiles