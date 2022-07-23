import React from 'react'
import Container from '@mui/material/Container'

import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import User from './components/Users/User';


const App = () => {
  return (
    <Container>
        <UserList />
        <UserForm />
        <User />
    </Container>
  )
}

export default App