import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { FormControlLabel, TextField } from '@mui/material';
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

const NewUser = ({ open, setOpen, retrieveAllUsers, handleSuccessPopup }) => {
	const { enqueueSnackbar } = useSnackbar();

	const handleClose = () => setOpen(false);

	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState({
		label: 'No Template',
		value: 'none',
	});

	const [offices, setOffices] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState({
		label: 'No Office',
		value: 'none',
	});

	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		isAdmin: false,
		permissionTemplateId: 1,
	});

	const handleCreateNewUser = async () => {
		await axios
			.post(
				'http://localhost:4000/user/create-user',
				{
					data: {
						newUser,
					},
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				handleSuccessPopup(res.data.message);
				handleClose();
				retrieveAllUsers();

				// Reset the state of the form
				setNewUser({
					name: '',
					email: '',
					password: '',
					isAdmin: false,
					permissionTemplateId: 1,
				});
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const retrieveAllTemplates = async () => {
		await axios
			.get('http://localhost:4000/template/all-templates', {
				withCredentials: true,
			})
			.then((res) => {
				const templates = res.data.templates.map((el) => {
					return { label: el.templateName, value: el.id };
				});
				setTemplates(templates);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const retrieveAllOffices = async () => {
		await axios
			.get('http://localhost:4000/office/all-offices', {
				withCredentials: true,
			})
			.then((res) => {
				const offices = res.data.offices.map((el) => {
					return { label: el.name, value: el.id };
				});
				setOffices(offices);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const handleTemplateChange = (e) => {
		setSelectedTemplate({
			value: e.target.value,
			label: e.target.innerText,
		});

		let templateId;
		if (e.target.value !== 'none') {
			templateId = e.target.value;
		}

		setNewUser((prev) => {
			return {
				...prev,
				permissionTemplateId: templateId,
			};
		});
	};

	const handleOfficeChange = (e) => {
		setSelectedOffice({
			value: e.target.value,
			label: e.target.innerText,
		});

		let officeId;
		if (e.target.value !== 'none') {
			officeId = e.target.value;
		}

		setNewUser((prev) => {
			return {
				...prev,
				officeId: officeId,
			};
		});
	};

	useEffect(() => {
		// Will run twice due to React.StrictMode in index.js while running the client as dev - expected behavior
		retrieveAllTemplates();
		retrieveAllOffices();
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
						<FormControlLabel
							sx={{ m: 'auto', mt: 1 }}
							control={
								<Switch
									checked={newUser?.isAdmin}
									onChange={() => {
										setNewUser((prev) => {
											return {
												...prev,
												isAdmin: !newUser?.isAdmin,
											};
										});
									}}
									name='isAdmin'
								/>
							}
							label='Is Admin'
						/>
						<FormControl fullWidth>
							<Select
								id='select-template'
								value={selectedTemplate.value}
								onChange={(e) => {
									handleTemplateChange(e);
								}}
							>
								<MenuItem value={'none'}>No Template</MenuItem>
								{templates?.map((el) => {
									return (
										<MenuItem
											value={el.value}
											name={el.label}
										>
											{el.label}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<Select
								sx={{ mt: 1 }}
								id='select-office'
								value={selectedOffice.value}
								onChange={(e) => {
									handleOfficeChange(e);
								}}
							>
								<MenuItem value={'none'}>No Office</MenuItem>
								{offices?.map((el) => {
									return (
										<MenuItem
											value={el.value}
											name={el.label}
										>
											{el.label}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Name'
							onChange={(e) => {
								setNewUser((prev) => {
									return {
										...prev,
										name: e.target.value,
									};
								});
							}}
							value={newUser?.name}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='E-Mail'
							onChange={(e) => {
								setNewUser((prev) => {
									return {
										...prev,
										email: e.target.value,
									};
								});
							}}
							value={newUser?.email}
						/>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Password'
							onChange={(e) => {
								setNewUser((prev) => {
									return {
										...prev,
										password: e.target.value,
									};
								});
							}}
							value={newUser?.password}
						/>
						<Button
							sx={{ mt: 5 }}
							variant='contained'
							onClick={() => {
								handleCreateNewUser();
							}}
							disabled={Object.values(newUser).some(
								(x) => x === '' || x?.length === 0
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

export default NewUser;
