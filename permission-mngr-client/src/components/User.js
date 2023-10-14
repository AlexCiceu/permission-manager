import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { axiosErrorHandling } from '../utils/ApiCalls';
import {
	Button,
	Card,
	CardMedia,
	Chip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Divider,
	Link,
	Checkbox,
} from '@mui/material';
import NewUser from './NewUser';
import EditUser from './EditUser';

const User = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [users, setUsers] = useState([]);
	const [open, setOpen] = useState(false);

	const [openEdit, setOpenEdit] = useState(false);
	const [clickedRow, setClickedRow] = useState({});

	const retrieveAllUsers = async () => {
		await axios
			.get('http://localhost:4000/user/all-users', {
				withCredentials: true,
			})
			.then((res) => {
				setUsers(res.data.users);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const deleteUser = async (id) => {
		await axios
			.delete('http://localhost:4000/user/delete-user?id=' + id, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.message);
				handleSuccessPopup(res.data.message);
				retrieveAllUsers();
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const handleSuccessPopup = (message) => {
		enqueueSnackbar(message, {
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
		retrieveAllUsers();
	}, []);

	return (
		<div>
			<div>
				<Card sx={{ maxWidth: '100%' }}>
					<CardMedia
						sx={{ height: 140 }}
						image='/users.jpg'
						title='users'
					/>
				</Card>
				<Divider />
				{users && (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='right'>Email</TableCell>
									<TableCell align='right'>
										Is Admin
									</TableCell>
									<TableCell align='right'></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users?.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											'&:last-child td, &:last-child th':
												{
													border: 0,
												},
										}}
									>
										<TableCell component='th' scope='row'>
											<Link
												href='#'
												onClick={() => {
													setOpenEdit(true);
													setClickedRow(row);
												}}
											>
												{row.name}
											</Link>
										</TableCell>
										<TableCell align='right'>
											{row.email}
										</TableCell>
										<TableCell align='right'>
											<Checkbox
												disabled
												checked={row.isAdmin}
											/>
										</TableCell>
										<TableCell align='right'>
											<Button
												onClick={() => {
													deleteUser(row.id);
												}}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
								{
									<TableRow key='button'>
										<TableCell component='th' scope='row'>
											<Button
												onClick={() => {
													setOpen(true);
												}}
											>
												Create New User
											</Button>
										</TableCell>
									</TableRow>
								}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				<NewUser
					open={open}
					setOpen={setOpen}
					retrieveAllUsers={retrieveAllUsers}
					handleSuccessPopup={handleSuccessPopup}
				/>
				<EditUser
					open={openEdit}
					setOpen={setOpenEdit}
					retrieveAllUsers={retrieveAllUsers}
					handleSuccessPopup={handleSuccessPopup}
					userInfo={clickedRow}
				/>
			</div>
		</div>
	);
};

export default User;
