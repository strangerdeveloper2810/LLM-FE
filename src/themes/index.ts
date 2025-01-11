import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50', // Màu xanh lá cây
        },
        secondary: {
            main: '#ff9800', // Màu cam
        },
        background: {
            default: '#f4f4f4', // Màu nền nhạt
        },
    },
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
        },
        body1: {
            fontSize: '1rem',
            color: '#555',
        },
    },
});

export default theme;
