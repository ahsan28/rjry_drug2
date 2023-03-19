import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './UserContext';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import Profile from './components/Pages/Profile';
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
import CommonDataForm from './components/Forms/CommonDataForm';
import Navbar from './Navbar';
import UserService from './services/user.services';
import { useContext, useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Landing from './components/Pages/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-family)',
    color: 'var(--font-color)',
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
    },

  },
});

const App = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    UserService.logout();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      if (user.settings?.fontFamily) {
        console.log('fontFamily', user.settings.fontFamily);
        document.documentElement.style.setProperty( '--font-family', user.settings.fontFamily );
      }
      if (user.settings?.themeColor) {
        console.log('themeColor', user.settings.themeColor);
        document.documentElement.style.setProperty( '--theme-color', user.settings.themeColor );
      }
      if (user.settings?.fontColor) {
        console.log('fontColor', user.settings.fontColor);
        document.documentElement.style.setProperty( '--font-color', user.settings.fontColor );
      }
      setUser(user);
    } else {
      setUser(null);
    }

  }, [user]);

    
  return (<>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {/* <Header /> */}
      <Navbar logout={logout} component='header' />
      {/* make items inside container center */}
      <Container maxWidth="lg" disableGutters component='main' sx={{p:3, height: 'calc(100vh - 68.5px - 24px)', overflowY: 'auto', overflowX: 'hidden'}}>
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserForm />} />

              <Route path="/" element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              
              {/* <Route path="/rjry_drug" element={<Introduction />} /> */}
              <Route path="/introduction" element={<Introduction />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/research" element={<Research />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/mode" element={<Mode />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/mesyuarat" element={<Activities />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/form/:page" element={<CommonDataForm />} />

              <Route path="/signin" element={<SignIn />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="*" element={<NoPage />} />
            </Routes>
          {/* {props.children} */}
      </Container>
      <Footer />
    </ThemeProvider>
  </>
  )
}

export default App