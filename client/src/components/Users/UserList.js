/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import UserService from '../../services/user.services'
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


const UserList = () => {
    console.log('UserList.js')
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log('UserList.js useEffect')
        UserService.getAll()
            .then(res => {
                console.log('UserList.js useEffect then')
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