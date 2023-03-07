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
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import UserSettings from './components/Users/UserSettings';
import Footer from './Footer';
import DataForm from './components/Pages/DataForm';
import Navbar from './Navbar';
import UserService from './services/user.services';
import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Landing from './components/Pages/Landing';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => {
    UserService.logout();
    setCurrentUser(null);
  };

  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, []);

    
  return (<>
    <CssBaseline />
      {/* <Header /> */}
      <Navbar currentUser={currentUser} logout={logout} component='header' />
      {/* make items inside container center */}
      <Container maxWidth="lg" disableGutters component='main' sx={{p:3, height: 'calc(100vh - 68.5px - 24px)', overflowY: 'auto', overflowX: 'hidden'}}>
            <Routes>
              <Route path="/users" element={<UserList currentUser={currentUser} />} />
              <Route path="/users/:userId" element={<UserForm currentUser={currentUser} />} />

              <Route path="/" element={<Landing currentUser={currentUser} />} />
              <Route path="/rjry_drug" element={<Introduction currentUser={currentUser} />} />
              <Route path="/introduction" element={<Introduction currentUser={currentUser} />} />
              <Route path="/research" element={<Research currentUser={currentUser} />} />
              <Route path="/publications" element={<Publications currentUser={currentUser} />} />
              <Route path="/mode" element={<Mode currentUser={currentUser} />} />
              <Route path="/activities" element={<Activities currentUser={currentUser} />} />
              <Route path="/certifications" element={<Certifications currentUser={currentUser} />} />
              <Route path="/gallery" element={<Gallery currentUser={currentUser} />} />
              <Route path="/contact" element={<Contact currentUser={currentUser} />} />

              <Route path="/form/:page" element={<DataForm currentUser={currentUser} />} />

              <Route path="/signin" element={<SignIn currentUser={currentUser} />} />
              <Route path="/settings" element={<UserSettings currentUser={currentUser} />} />
              <Route path="/signup" element={<SignUp currentUser={currentUser} />} />

              <Route path="*" element={<NoPage currentUser={currentUser} />} />
            </Routes>
          {/* {props.children} */}
      </Container>
      <Footer />
  </>
  )
}

export default App