import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'

import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import Navbar from "./Navbar"
import NoPage from './pages/NoPage';
import Introduction from './pages/Introduction';
import Research from './pages/Research';
import Contact from './pages/Contact';
import Publications from './pages/Publications';
import Mode from './pages/Mode';
import Activities from './pages/Activities';
import Certifications from './pages/Certifications';
import Gallery from './pages/Gallery';
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