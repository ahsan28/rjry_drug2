/* eslint-disable no-unused-vars */
import React from 'react'
import UserService from '../../services/user.services'
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const UserList = () => {

    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        UserService.getAll()
            .then(res => {
                setUsers(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }
    , [])

    const userList = users.map(user => {
        return (
            <ListItem key={user.id}>
                <Avatar alt="Remy Sharp" src={user.avatar} />
                <ListItemText primary={user.name} secondary={user.email} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <Button variant="contained" color="secondary">Delete</Button>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    })



  return (
    <>
        <div>UserList</div>
        {userList}
    </>
  )
}

export default UserList