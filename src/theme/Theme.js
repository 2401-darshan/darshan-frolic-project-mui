import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: '#1890ff',
        },
        background: {
            default: mode === 'light' ? '#dee2e6' : '#0B203F',
            paper: mode === 'light' ? '#dee2e6' : '',
        },
        text: {
            primary: mode === 'light' ? '#262626' : 'white',
            secondary: mode === 'light' ? '#8c8c8c' : '#9ca3af',
        },
    },
    typography: {
        fontFamily: '"Public Sans", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});