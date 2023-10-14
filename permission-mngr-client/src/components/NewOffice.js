import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { axiosErrorHandling } from '../utils/ApiCalls';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const NewOffice = ({
	open,
	setOpen,
	retrieveAllOffices,
	handleSuccessPopup,
}) => {
	const theme = useTheme();
	const { enqueueSnackbar } = useSnackbar();

	const handleClose = () => setOpen(false);

	const [unassignedUsers, setUnassignedUsers] = useState([]);
	const [personName, setPersonName] = useState([]);

	const [newOffice, setNewOffice] = useState({
		name: '',
		street: '',
		city: '',
		country: '',
		phone: '',
		email: '',
		users: [],
	});

	const retrieveAllUsers = async () => {
		await axios
			.get('http://localhost:4000/user/all-users?officeId=null', {
				withCredentials: true,
			})
			.then((res) => {
				let users = [];

				res.data.users.forEach((user) => {
					users.push({
						label: user.name,
						value: user.id,
					});
				});

				setUnassignedUsers(users);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const createNewCompany = async () => {
		await axios
			.post(
				'http://localhost:4000/office/create-office',
				{
					data: {
						newOffice,
					},
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				handleSuccessPopup(res.data.message);
				handleClose();
				retrieveAllOffices();

				// Reset the state of the form
				setNewOffice({
					name: '',
					street: '',
					city: '',
					country: '',
					phone: '',
					email: '',
					users: [],
				});
				setPersonName([]);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleChangeUsers = (value) => {
		if (newOffice?.users?.includes(value)) {
			setNewOffice((prev) => {
				return {
					...prev,
					users: newOffice?.users?.filter((el) => el != value),
				};
			});
		} else {
			setNewOffice((prev) => {
				return { ...prev, users: [...newOffice?.users, value] };
			});
		}
	};

	useEffect(() => {
		// Will run twice due to React.StrictMode in index.js while running the client as dev - expected behavior
		retrieveAllUsers();
		console.log(unassignedUsers);
	}, []);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<FormControl
						sx={{ m: 1, width: '100%', margin: 'auto' }}
						required={true}
					>
						<InputLabel id='multiple-chip-label'>Users</InputLabel>
						<Select
							labelId='multiple-chip-label'
							id='multiple-chip'
							multiple
							label='Users'
							value={personName}
							onChange={handleChange}
							required={true}
							input={
								<OutlinedInput
									id='select-multiple-chip'
									label='Chip'
								/>
							}
							renderValue={(selected) => (
								<Box
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: 0.5,
									}}
								>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}
						>
							{unassignedUsers.map((el) => (
								<MenuItem
									key={el.value}
									value={el.label}
									onClick={() => {
										handleChangeUsers(el.value);
									}}
								>
									{el.label}
								</MenuItem>
							))}
						</Select>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Name'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, name: e.target.value };
								});
							}}
							value={newOffice?.name}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Street'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, street: e.target.value };
								});
							}}
							value={newOffice?.street}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='City'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, city: e.target.value };
								});
							}}
							value={newOffice?.city}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Country'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, country: e.target.value };
								});
							}}
							value={newOffice?.country}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Phone'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, phone: e.target.value };
								});
							}}
							value={newOffice?.phone}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='E-Mail'
							onChange={(e) => {
								setNewOffice((prev) => {
									return { ...prev, email: e.target.value };
								});
							}}
							value={newOffice?.email}
						/>
						<Button
							sx={{ mt: 5 }}
							variant='contained'
							onClick={() => {
								createNewCompany();
							}}
							disabled={Object.values(newOffice).some(
								(x) => x === '' || x.length === 0
							)}
						>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Modal>
		</div>
	);
};

export default NewOffice;
