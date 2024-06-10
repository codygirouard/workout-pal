import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0,
					padding: 0,
					backgroundColor: '#edf7ed',
					color: '#12563C',
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#12563C',
			light: '#DEF0E8',
		},
		secondary: {
			main: grey[50],
		},
	},
	typography: {
		fontFamily: 'Sora, sans-serif',
	},
});

export default theme;
