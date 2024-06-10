import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Router from 'next/router';
import { Button, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { Link as MUILink } from '@mui/material';

const Header: React.FC = () => {
	const { data: session, status } = useSession();
	const theme = useTheme();
	const [auth, setAuth] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	useEffect(() => {
		if (status !== 'loading' && session) {
			setAuth(true);
		}
	}, [session, status]);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		handleCloseUserMenu();
		signOut();
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link href="/" passHref>
						<MUILink
							variant="h6"
							noWrap
							color="secondary"
							sx={{
								display: { xs: 'none', md: 'flex' },
								fontWeight: 700,
								fontSize: 30,
								letterSpacing: '.2rem',
								textDecoration: 'none',
							}}
						>
							Workout Pal
						</MUILink>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

					<Box sx={{ flexGrow: 0 }}>
						{auth ? (
							<>
								<Tooltip title="Account">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											sx={{
												bgcolor: theme.palette.secondary.main,
												color: theme.palette.primary.main,
											}}
										>
											{session.user.name.at(0).toUpperCase()}
										</Avatar>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem onClick={handleLogout}>
										<Typography textAlign="center">Log out</Typography>
									</MenuItem>
								</Menu>
							</>
						) : (
							<div>
								<Button
									color="secondary"
									size="large"
									onClick={async () => Router.push('/api/auth/signin')}
								>
									Log in
								</Button>
							</div>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
