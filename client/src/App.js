import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
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
// import theme from './myTheme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme, css } from '@mui/material/styles';

const getCss = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable);

// console.log("🚀 ~ file: App.js:37 ~ theme:", theme)


const App = () => {
  const { user, setUser, settings, setSettings, isLoading, setIsLoading } = useContext(UserContext);
  const [showAnimation, setShowAnimation] = useState(false);
  const logout = () => {
    UserService.logout();
    setUser(null);
  };

  const theme = createTheme({
    typography: {
        fontFamily: settings?.sheds?.themeFont || getCss('--themeFont'),
        fontSize: parseFloat(settings?.sheds?.themeSize || getCss('--themeSize')),
    },
    palette: {
        primary: {
            main: settings?.sheds?.primary || getCss('--primary'),
        },
        secondary: {
            main: settings?.sheds?.secondary || getCss('--secondary'),
        },
        error: {
            main: settings?.sheds?.error || getCss('--error'),
        },
        warning: {
            main: settings?.sheds?.warning || getCss('--warning'),
        },
        info: {
            main: settings?.sheds?.info || getCss('--info'),
        },
        success: {
            main: settings?.sheds?.success || getCss('--success'),
        },
        backgroundColor: {
            default: settings?.sheds?.body || getCss('--body'),
            paper: settings?.sheds?.paper || getCss('--paper'),
        },
        text: {
            primary: settings?.sheds?.text || getCss('--text'),
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: settings?.sheds?.header || getCss('--header'),
                    color: settings?.sheds?.headerText || getCss('--headerText'),
                },
            },
        },
        MuiFooter: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.footer || getCss('--footer'),
                    color: settings?.sheds?.footerText || getCss('--footerText'),
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'black', //settings?.sheds?.text || getCss('--text'),
                    // write webkit-text-stroke: '1px gray' below
                    // WebkitTextStroke: '.1px white',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.header || getCss('--header'),
                    color: settings?.sheds?.headerText || getCss('--headerText'),
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.link || getCss('--link'),
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                    fontSize: getCss('--themeSize'),
                },
                subtitle1: {
                    fontSize: getCss('--themeSize'),
                    fontStyle: 'italic',
                    // make a nested a tag link color
                    '& a': {
                        color: settings?.sheds?.link || getCss('--link'),
                    },
                },
                caption: {
                    fontSize: getCss('--themeSize'),
                    fontWeight: 'bold',
                },
                body1: {
                    fontSize: getCss('--themeSize'),
                },
            },
        },
        MuiTabs: { // for selected and hover
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
                indicator: {
                    backgroundColor: settings?.sheds?.header || getCss('--header'),
                    height: 6,
                    borderRadius: '16px 16px 0 0',
                },

            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                    transition: '0.4s',
                },
                textColorPrimary: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
                textColorSecondary: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
                selected: {
                    color: settings?.sheds?.text || getCss('--text'),
                    // borderRadius: '16px 16px 0 0',
                    // border: `1px solid ${settings?.sheds?.headerText || getCss('--text')}`,
                },
                wrapper: {
                    color: settings?.sheds?.text || getCss('--text'),
                },

            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: settings?.sheds?.paper || getCss('--paper'),
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: settings?.sheds?.text || getCss('--text'),
                },
            },
        }
    },
    

});

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
    if (settings && settings.sheds) {
      let s = settings.sheds;
      console.log("🚀 ~ file: App.js:63 ~ useEffect ~ s:", s)
      // let setP = document.documentElement.style.setProperty;
      let setP = (variable, value) => document.documentElement.style.setProperty(variable, value);
      if (settings.fontFamily) setP('--themeFont', settings.fontFamily);
      if (settings.fontSize) setP('--themeSize', settings.fontSize);

      if (s.body) setP('--body', s.body);
      if (s.paper) setP('--paper', s.paper);
      if (s.text) setP('--text', s.text);
      if (s.link) setP('--link', s.link);

      if (s.success) setP('--success', s.success);
      if (s.info) setP('--info', s.info);
      if (s.warning) setP('--warning', s.warning);
      if (s.error) setP('--error', s.error);

      if (s.primary) setP('--primary', s.primary);
      if (s.primaryText) setP('--primaryText', s.primaryText);
      if (s.secondary) setP('--secondary', s.secondary);
      if (s.secondaryText) setP('--secondaryText', s.secondaryText);

      if (s.header) setP('--header', s.header);
      if (s.footer) setP('--footer', s.footer);
      if (s.stripe) setP('--stripe', s.stripe);
      if (s.headerText) setP('--headerText', s.headerText);
      if (s.footerText) setP('--footerText', s.footerText);
      if (s.stripeText) setP('--stripeText', s.stripeText);

    }

  }, [settings]);

    
  return (<ThemeProvider theme={theme}>
        <CssBaseline />
    {isLoading && <Loader />}
      {/* fixed navbar at the top and footer at the bottom and flex container for main content */}
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      {/* <Header /> */}
      <Navbar logout={logout} component='header' />
      {/* make items inside container center */}
      <Container maxWidth={false} disableGutters={true} component='main' sx={{display: 'flex', flexDirection: 'column', flexGrow: 1,overflowY: 'auto', overflowX: 'hidden', position: 'relative', top: '-72px'}}>
              {/* {showAnimation && <CanvasParticles2 />} */}
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
              {/* <Route path="/publications/:pubType" element={<Publications />} /> */}
              {/* <Route path="/publication_form/:pubId" element={<Publications />} /> */}
              <Route path="/activity" element={<Activity2 />} />
              {/* <Route path="/activity/:actType" element={<Activities />} /> */}
              {/* <Route path="/activity_form/:actId" element={<ActivityForm />} /> */}
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact setShowAnimation={setShowAnimation} />} />

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

  )
}

export default App