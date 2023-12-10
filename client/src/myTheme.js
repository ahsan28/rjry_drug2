import { createTheme, css } from '@mui/material/styles';
const getCssVariable = (variable) => 
    getComputedStyle(document.documentElement).getPropertyValue(variable);

console.log('--themeFont: ',getCssVariable('--themeFont'));
console.log('--themeSize: ',getCssVariable('--themeSize'));
console.log('--primary: ',getCssVariable('--primary'));
console.log('--primaryText: ',getCssVariable('--primaryText'));
console.log('--secondary: ',getCssVariable('--secondary'));
console.log('--secondaryText: ',getCssVariable('--secondaryText'));
console.log('--error: ',getCssVariable('--error'));
console.log('--warning: ',getCssVariable('--warning'));
console.log('--info: ',getCssVariable('--info'));
console.log('--success: ',getCssVariable('--success'));
console.log('--body: ',getCssVariable('--body'));
console.log('--paper: ',getCssVariable('--paper'));
console.log('--text: ',getCssVariable('--text'));
console.log('--link: ',getCssVariable('--link'));
console.log('--header: ',getCssVariable('--header'));
console.log('--footer: ',getCssVariable('--footer'));
console.log('--headerText: ',getCssVariable('--headerText'));
console.log('--footerText: ',getCssVariable('--footerText'));

// egula initial and fixed taken from css variables

const theme = createTheme({
    typography: {
        fontFamily: getCssVariable('--themeFont'),
        fontSize: parseFloat(getCssVariable('--themeSize')),
    },
    palette: {
        primary: {
            main: getCssVariable('--primary'),
        },
        secondary: {
            main: getCssVariable('--secondary'),
        },
        error: {
            main: getCssVariable('--error'),
        },
        warning: {
            main: getCssVariable('--warning'),
        },
        info: {
            main: getCssVariable('--info'),
        },
        success: {
            main: getCssVariable('--success'),
        },
        backgroundColor: {
            default: getCssVariable('--body'),
            paper: getCssVariable('--paper'),
        },
        text: {
            primary: getCssVariable('--text'),
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: getCssVariable('--header'),
                    color: getCssVariable('--headerText'),
                },
            },
        },
        MuiFooter: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--footer'),
                    color: getCssVariable('--footerText'),
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--header'),
                    color: getCssVariable('--headerText'),
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--text'),
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--link'),
                },
            },
        },
        // MuiTypography: {
        //     styleOverrides: {
        //         root: {
        //             color: getCssVariable('--text'),
        //         },
        //     },
        // },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: getCssVariable('--paper'),
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    color: getCssVariable('--text'),
                },
            },
        }
    },
    

});

export default theme;
