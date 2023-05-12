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
    UserService.readAll()
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== "dev"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (<>
    <Container elevation={0} sx={{ pt: 2, gap: 1, position: 'relative' }}>
      {user && <Box sx={{ position: "absolute", pt: 1, right: 0, zIndex: 1, mx: 2 }}>
        <Button variant="contained" sx={{ bgcolor: "orange", color: "white", width: "5rem", transform: "translateX(5rem)" }}
        onClick={()=>setOpenMemberForm(true)}>
          +</Button>
      </Box>}
      {users.map((user) => (
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
      ))}
    </Container>
    <MemberForm open={openMemberForm} handleClose={setOpenMemberForm} handleSubmit={setOpenMemberForm} uid={uid} />
    </>);
}

export default MemberProfiles