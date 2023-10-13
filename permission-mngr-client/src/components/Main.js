import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { handleLogout } from '../utils/Authentication';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Main({ isUserLoggedIn, setIsUserLoggedIn }) {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Clipped drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
					<List>
						<ListItem key={'company'} disablePadding>
							<ListItemButton
								onClick={() => navigate('/company')}
							>
								<ListItemIcon>
									<BusinessIcon />
								</ListItemIcon>
								<ListItemText primary={'Company'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={'office'} disablePadding>
							<ListItemButton onClick={() => navigate('/office')}>
								{' '}
								<ListItemIcon>
									<StoreIcon />
								</ListItemIcon>
								<ListItemText primary={'Office'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={'users'} disablePadding>
							<ListItemButton onClick={() => navigate('/user')}>
								{' '}
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary={'Users'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={'templates'} disablePadding>
							<ListItemButton
								onClick={() => navigate('/template')}
							>
								{' '}
								<ListItemIcon>
									<AdminPanelSettingsIcon />
								</ListItemIcon>
								<ListItemText primary={'Templates'} />
							</ListItemButton>
						</ListItem>
						<ListItem key={'logout'} disablePadding>
							<ListItemButton
								onClick={() => {
									navigate('/');
									handleLogout(
										isUserLoggedIn,
										setIsUserLoggedIn
									);
								}}
							>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary={'Logout'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
			</Box>
		</Box>
	);
}
