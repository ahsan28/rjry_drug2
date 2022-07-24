import React from 'react'
import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'


import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import User from './components/Users/User';
import Navbar from './Navbar';


const App = () => {
    console.log('App.js')
  return (
    <Container>
        <Navbar />
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path='/create-user' element={<UserForm />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="*" element={ <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main> } />
        </Routes>

    </Container>
  )
}

export default App