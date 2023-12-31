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
import { useNavigate, Routes, Route } from 'react-router-dom';
import Office from './Office';
import Company from './Company';
import User from './User';
import Template from './Template';
import { Chip } from '@mui/material';

const drawerWidth = 240;

const Main = ({ setIsUserLoggedIn }) => {
	const navigate = useNavigate();

	const parsedUserData = JSON.parse(sessionStorage.getItem('user'));
	const name = parsedUserData?.name;
	const role = parsedUserData?.isAdmin ? 'Admin' : 'User';
	const permissions = parsedUserData?.permissionTemplate?.permissions;
	const isMasterOffice = parsedUserData?.office?.isMasterOffice
		? 'Master Office'
		: 'Office';

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						{name} - <Chip label={role} color='secondary' /> -{' '}
						<Chip label={permissions?.join(' ')} color='success' />{' '}
						- <Chip label={isMasterOffice} color='warning'></Chip>
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
						<ListItem key={'users'} disablePadding>
							<ListItemButton onClick={() => navigate('/user')}>
								{' '}
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary={'Users'} />
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
									// navigate can't be used as a top level function and must be inside a React component otherwise it would be handled inside handleLogout()
									handleLogout(setIsUserLoggedIn);
									navigate('/');
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
				<Routes>
					<Route path='company' element={<Company />} />
					<Route path='office' element={<Office />} />
					<Route path='user' element={<User />} />
					<Route path='template' element={<Template />} />
				</Routes>
			</Box>
		</Box>
	);
};

export default Main;
