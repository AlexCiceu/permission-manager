import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { axiosErrorHandling } from '../utils/ApiCalls';
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Divider,
} from '@mui/material';
import NewOffice from './NewOffice';

const Office = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [offices, setOffices] = useState([]);
	const [open, setOpen] = useState(false);

	const parsedUserData = JSON.parse(sessionStorage.getItem('user'));
	const isAdmin = parsedUserData?.isAdmin;
	const isMasterOffice = parsedUserData?.office?.isMasterOffice;
	const currentOffice = parsedUserData?.office;

	const retrieveAllOffices = async () => {
		await axios
			.get('http://localhost:4000/office/all-offices', {
				withCredentials: true,
			})
			.then((res) => {
				setOffices(res.data.offices);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const handleSuccessPopup = (messaage) => {
		enqueueSnackbar(messaage, {
			variant: 'success',
			autoHideDuration: 5000,
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'center',
			},
		});
	};

	useEffect(() => {
		// Will run twice due to React.StrictMode in index.js while running the client as dev - expected behavior
		retrieveAllOffices();
	}, []);

	return (
		<div>
			<Card sx={{ maxWidth: '100%' }}>
				<CardMedia
					sx={{ height: 140 }}
					image='/office.jpg'
					title='office'
				/>
				<CardContent>
					<Typography gutterBottom variant='h4' component='div'>
						{currentOffice?.street}
					</Typography>
					<Typography variant='h5' color='text.secondary'>
						{currentOffice?.email}
					</Typography>
					<Typography variant='h6' color='text.secondary'>
						{currentOffice?.phone}
					</Typography>
				</CardContent>
			</Card>
			<Divider />
			{offices && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Street</TableCell>
								<TableCell align='right'>City</TableCell>
								<TableCell align='right'>Country</TableCell>
								<TableCell align='right'>Phone</TableCell>
								<TableCell align='right'>Email</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{offices?.map((row) => (
								<TableRow
									key={row.name}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right'>
										{row.street}
									</TableCell>
									<TableCell align='right'>
										{row.city}
									</TableCell>
									<TableCell align='right'>
										{row.country}
									</TableCell>
									<TableCell align='right'>
										{row.phone}
									</TableCell>
									<TableCell align='right'>
										{row.email}
									</TableCell>
								</TableRow>
							))}
							{isAdmin && isMasterOffice && (
								<TableRow>
									<TableCell component='th' scope='row'>
										<Button
											onClick={() => {
												setOpen(true);
											}}
										>
											Create New Office
										</Button>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<NewOffice
				open={open}
				setOpen={setOpen}
				retrieveAllOffices={retrieveAllOffices}
				handleSuccessPopup={handleSuccessPopup}
			/>
		</div>
	);
};

export default Office;
