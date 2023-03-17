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
  console.log("🚀 ~ file: App.js:28 ~ App ~ user:", user)
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => {
    UserService.logout();
    setCurrentUser(null);
  };

  useEffect(() => {
    const userX = UserService.getCurrentUser();
    if (userX) {
      if (userX.settings?.fontFamily) {
        console.log('fontFamily', userX.settings.fontFamily);
        document.documentElement.style.setProperty( '--font-family', userX.settings.fontFamily );
      }
      if (userX.settings?.themeColor) {
        console.log('themeColor', userX.settings.themeColor);
        document.documentElement.style.setProperty( '--theme-color', userX.settings.themeColor );
      }
      if (userX.settings?.fontColor) {
        console.log('fontColor', userX.settings.fontColor);
        document.documentElement.style.setProperty( '--font-color', userX.settings.fontColor );
      }
      setUser(userX);
      setCurrentUser(userX);
    } else {
      setCurrentUser(null);
    }
  }, []);

    
  return (<>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {/* <Header /> */}
      <Navbar currentUser={currentUser} logout={logout} component='header' />
      {/* make items inside container center */}
      <Container maxWidth="lg" disableGutters component='main' sx={{p:3, height: 'calc(100vh - 68.5px - 24px)', overflowY: 'auto', overflowX: 'hidden'}}>
            <Routes>
              <Route path="/users" element={<UserList currentUser={currentUser} />} />
              <Route path="/users/:userId" element={<UserForm currentUser={currentUser} />} />

              <Route path="/" element={<Landing currentUser={currentUser} />} />
              <Route path="/landing" element={<Landing currentUser={currentUser} />} />
              
              {/* <Route path="/rjry_drug" element={<Introduction currentUser={currentUser} />} /> */}
              <Route path="/introduction" element={<Introduction currentUser={currentUser} />} />
              <Route path="/profile" element={<Profile currentUser={currentUser} />} />
              <Route path="/research" element={<Research currentUser={currentUser} />} />
              <Route path="/publications" element={<Publications currentUser={currentUser} />} />
              <Route path="/mode" element={<Mode currentUser={currentUser} />} />
              <Route path="/activities" element={<Activities currentUser={currentUser} />} />
              <Route path="/certifications" element={<Certifications currentUser={currentUser} />} />
              <Route path="/gallery" element={<Gallery currentUser={currentUser} />} />
              <Route path="/contact" element={<Contact currentUser={currentUser} />} />

              <Route path="/form/:page" element={<CommonDataForm currentUser={currentUser} />} />

              <Route path="/signin" element={<SignIn currentUser={currentUser} />} />
              <Route path="/settings" element={<UserSettings currentUser={currentUser} />} />
              <Route path="/signup" element={<SignUp currentUser={currentUser} />} />

              <Route path="*" element={<NoPage currentUser={currentUser} />} />
            </Routes>
          {/* {props.children} */}
      </Container>
      <Footer />
    </ThemeProvider>
  </>
  )
}

export default App