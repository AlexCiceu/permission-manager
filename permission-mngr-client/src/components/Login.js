import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import { React, useState } from 'react';
import { useSnackbar } from 'notistack';
import { storeAuthenticatedUserInSession } from '../utils/Authentication';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsUserLoggedIn }) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		await axios
			.post('http://localhost:4000/auth/login', {
				email: email,
				password: password,
			})
			.then((res) => {
				enqueueSnackbar(res.data.message, {
					variant: 'success',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});

				storeAuthenticatedUserInSession(res.data.user);
				setIsUserLoggedIn(true);
				navigate('/company');
			})
			.catch((err) => {
				enqueueSnackbar(err?.response?.data?.message, {
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
				});
			});
	};

	return (
		<div>
			<Paper style={{ padding: 30 }}>
				<Grid
					container
					spacing={3}
					direction={'column'}
					justify={'center'}
					alignItems={'center'}
				>
					<Grid item xs={12}>
						<TextField
							label='Email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label='Password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type={'password'}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button
							fullWidth
							onClick={() => {
								handleLogin();
							}}
						>
							{' '}
							Login{' '}
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default Login;
