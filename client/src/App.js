import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'

import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import NoPage from './components/Pages/NoPage';
import Introduction from './components/Pages/Introduction';
import Research from './components/Pages/Research';
import Contact from './components/Pages/Contact';
import Publications from './components/Pages/Publications';
import Mode from './components/Pages/Mode';
import Activities from './components/Pages/Activities';
import Certifications from './components/Pages/Certifications';
import Gallery from './components/Pages/Gallery';
import Navbar from './Navbar';


const App = () => {
    console.log('App.js')
  return (
    <Container>
        <Navbar />
        <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserForm />} />

            <Route path="/" element={<Introduction />} />
            <Route path="/rjry_drug" element={<Introduction />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/mode" element={<Mode />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NoPage />} />
            <Route path="*" element={ <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main> } />
        </Routes>

    </Container>
  )
}

export default App