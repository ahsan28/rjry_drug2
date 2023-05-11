import React, { useEffect } from 'react'
import { Paper, Card, CardContent, Typography, Avatar, Box, Container } from '@mui/material';
import UserService from '../../services/user.services';
import ViewImage from '../Hooks/ViewImage';
import { Link } from 'react-router-dom';

const MemberProfiles = () => {
  const [users, setUsers] = React.useState([]);
  console.log("🚀 ~ file: MemberProfiles.js:8 ~ MemberProfiles ~ users:", users)

  useEffect(() => {
    UserService.readAll()
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== "ahsan"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <Container elevation={0} sx={{ p: 2, gap: 2 }}>
      {users.map((user) => (
        <Box key={user._id} sx={{ gap: 2, p:2 }}>
          <Card key={user._id}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
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
                </div>
                <Card sx={{ height: 100 }}>
                <ViewImage image={user.avatar} />
                </Card>
              </div>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Container>
  );
}

export default MemberProfiles