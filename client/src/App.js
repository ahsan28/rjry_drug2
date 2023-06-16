import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CanvasParticles2 from './components/Hooks/CanvasParticles2';
import Loader from './components/Pages/Loader';

import { UserContext } from './UserContext';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import ActivityForm from './components/Forms/ActivityForm';
import Profile from './components/Pages/Profile';
import MemberProfiles from './components/Pages/MemberProfiles';
import MemberForm from './components/Forms/MemberForm';
import NoPage from './components/Pages/NoPage';
import Script from './components/Pages/Script';
import Introduction from './components/Pages/Introduction';
import Research from './components/Pages/Research';
import Product from './components/Pages/Product';
import Contact from './components/Pages/Contact';
import Publications from './components/Pages/Publications';
import Publication2 from './components/Pages/Publication2';
import Activities from './components/Pages/Activities';
import Activity2 from './components/Pages/Activity2';
import Certifications from './components/Pages/Certifications';
import Gallery from './components/Pages/Gallery';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import SettingsForm from './components/Forms/SettingsForm';
import Footer from './Footer';
import CommonDataForm from './components/Forms/CommonDataForm';
import Navbar from './Navbar';
import UserService from './services/user.services';
import Landing from './components/Pages/Landing';
import './App.css'

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family)',
    color: 'var(--font-color)',
    // h1: {
    //   fontSize: '3rem',
    // },
    // h2: {
    //   fontSize: '2.5rem',
    // },
    // h3: {
    //   fontSize: '2rem',
    // },
    // h4: {
    //   fontSize: '1.5rem',
    // },
    // h5: {
    //   fontSize: '1.25rem',
    // },
    // h6: {
    //   fontSize: '1rem',
    // },
    // subtitle1: {
    //   fontSize: '1.25rem',
    // },
    // subtitle2: {
    //   fontSize: '1rem',
    // },
    // body1: {
    //   fontSize: '1.25rem',
    // },
    // body2: {
    //   fontSize: '1rem',
    // },
    // button: {
    //   fontSize: '1rem',
    // },

  },
});

const App = () => {
  const { user, setUser, settings, setSettings, isLoading, setIsLoading } = useContext(UserContext);

  const logout = () => {
    UserService.logout();
    setUser(null);
  };

  useEffect(() => {
    setIsLoading(true)
    let currentUser = UserService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    UserService.getSettings(currentUser?.settings).then((response) => {
      setSettings(response.data);
      setIsLoading(false)
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  useEffect(() => {
    if (settings) {
      if (settings.theme.color) {
        document.documentElement.style.setProperty('--themeFontColor', settings.theme.color);
      }
      if (settings.theme.backgroundColor) {
        document.documentElement.style.setProperty('--themeBgColor', settings.theme.backgroundColor);
      }
      if (settings.theme.fontFamily) {
        document.documentElement.style.setProperty('--themeFont', settings.theme.fontFamily);
      }
      if (settings.theme.fontSize) {
        document.documentElement.style.setProperty('--themeSize', settings.theme.fontSize);
      }
      if (settings.body.color) {
        document.documentElement.style.setProperty('--bodyFontColor', settings.body.color);
      }
      if (settings.body.backgroundColor) {
        document.documentElement.style.setProperty('--bodyBgColor', settings.body.backgroundColor);
      }
      if (settings.body.fontFamily) {
        document.documentElement.style.setProperty('--bodyFont', settings.body.fontFamily);
      }
      if (settings.body.fontSize) {
        document.documentElement.style.setProperty('--bodySize', settings.body.fontSize);
      }
    }

  }, [settings]);

    
  return (<>
    {isLoading||true && <Loader />}
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {/* fixed navbar at the top and footer at the bottom and flex container for main content */}
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* <Header /> */}
      <Navbar logout={logout} component='header' />
      {/* make items inside container center */}
      <Container maxWidth={false} disableGutters={true} component='main' sx={{display: 'flex', flexDirection: 'column', flexGrow: 1,overflowY: 'auto', overflowX: 'hidden'}}>
              <CanvasParticles2 />
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserForm />} />

              <Route path="/" element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              
              {/* <Route path="/rjry_drug" element={<Introduction />} /> */}
              <Route path="/script" element={<Script />} />
              <Route path="/introduction" element={<Introduction />} />
              <Route path="/member_profiles" element={<MemberProfiles />} />
              <Route path="/form/member" element={<MemberForm />} />
              <Route path="/research" element={<Research />} />
              <Route path="/product" element={<Product />} />
              <Route path="/publication" element={<Publication2 />} />
              <Route path="/publications/:pubType" element={<Publications />} />
              <Route path="/publication_form/:pubId" element={<Publications />} />
              <Route path="/activity" element={<Activity2 />} />
              <Route path="/activity/:actType" element={<Activities />} />
              <Route path="/activity_form/:actId" element={<ActivityForm />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/form/:page" element={<CommonDataForm />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/settings" element={<SettingsForm />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="*" element={<NoPage />} />
            </Routes>
          {/* {props.children} */}
      </Container>
      <Footer />
      </Box>
    </ThemeProvider>
  </>
  )
}

export default App