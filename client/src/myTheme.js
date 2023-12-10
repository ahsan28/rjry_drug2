import { createTheme, css } from '@mui/material/styles';
const getCss = (variable) => 
    getComputedStyle(document.documentElement).getPropertyValue(variable);

console.log('--themeFont: ',getCss('--themeFont'));
console.log('--themeSize: ',getCss('--themeSize'));
console.log('--primary: ',getCss('--primary'));
console.log('--primaryText: ',getCss('--primaryText'));
console.log('--secondary: ',getCss('--secondary'));
console.log('--secondaryText: ',getCss('--secondaryText'));
console.log('--error: ',getCss('--error'));
console.log('--warning: ',getCss('--warning'));
console.log('--info: ',getCss('--info'));
console.log('--success: ',getCss('--success'));
console.log('--body: ',getCss('--body'));
console.log('--paper: ',getCss('--paper'));
console.log('--text: ',getCss('--text'));
console.log('--link: ',getCss('--link'));
console.log('--header: ',getCss('--header'));
console.log('--footer: ',getCss('--footer'));
console.log('--headerText: ',getCss('--headerText'));
console.log('--footerText: ',getCss('--footerText'));

// egula initial and fixed taken from css variables

const theme = createTheme({
    typography: {
        fontFamily: getCss('--themeFont'),
        fontSize: parseFloat(getCss('--themeSize')),
    },
    palette: {
        primary: {
            main: getCss('--primary'),
        },
        secondary: {
            main: getCss('--secondary'),
        },
        error: {
            main: getCss('--error'),
        },
        warning: {
            main: getCss('--warning'),
        },
        info: {
            main: getCss('--info'),
        },
        success: {
            main: getCss('--success'),
        },
        backgroundColor: {
            default: getCss('--body'),
            paper: getCss('--paper'),
        },
        text: {
            primary: getCss('--text'),
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: getCss('--header'),
                    color: getCss('--headerText'),
                },
            },
        },
        MuiFooter: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--footer'),
                    color: getCss('--footerText'),
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--header'),
                    color: getCss('--headerText'),
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--text'),
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: getCss('--link'),
                },
            },
        },
        // MuiTypography: {
        //     styleOverrides: {
        //         root: {
        //             color: getCss('--text'),
        //         },
        //     },
        // },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: getCss('--paper'),
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: getCss('--text'),
                },
            },
        }
    },
    

});

export default theme;
