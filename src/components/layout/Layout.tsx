import React, { ReactNode } from 'react';
import Header from '../header/Header';
import { Container, Content } from './styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../theme/globalTheme';

type Props = {
	children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Container>
			<Header />
			<Content>{props.children}</Content>
		</Container>
	</ThemeProvider>
);

export default Layout;
