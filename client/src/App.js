import React from 'react'
import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard/Dashboard'
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import PropertyList from './components/Property/PropertyList';
import PropertyForm from './components/Property/PropertyForm';
import ContractList from './components/Contract/ContractList';
import ContractForm from './components/Contract/ContractForm';
import EntryList from './components/Entry/EntryList';
import EntryForm from './components/Entry/EntryForm';
import Navbar from './Navbar';


const App = () => {
    console.log('App.js')
  return (
    <Container>
        <Navbar />
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserForm />} />

            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:propertyId" element={<PropertyForm />} />

            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contracts/:contractId" element={<ContractForm />} />

            <Route path="/entries" element={<EntryList />} />
            <Route path="/entries/:entryId" element={<EntryForm />} />

            <Route path="*" element={ <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main> } />
        </Routes>

    </Container>
  )
}

export default App