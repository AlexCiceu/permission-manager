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

const NewTemplate = ({
	open,
	setOpen,
	retrieveAllTemplates,
	handleSuccessPopup,
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const [newTemplate, setNewTemplate] = useState({
		templateName: '',
		permissions: [],
	});
	const permissions = ['READ', 'WRITE', 'DELETE'];
	const handleClose = () => setOpen(false);
	const [permissionName, setPermissionName] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPermissionName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleChangePermissions = (value) => {
		if (newTemplate?.permissions?.includes(value)) {
			setNewTemplate((prev) => {
				return {
					...prev,
					permissions: newTemplate?.permissions?.filter(
						(el) => el != value
					),
				};
			});
		} else {
			setNewTemplate((prev) => {
				return {
					...prev,
					permissions: [...newTemplate?.permissions, value],
				};
			});
		}
	};

	const handleCreateNewTemplate = async () => {
		await axios
			.post(
				'http://localhost:4000/template/create-template',
				{
					data: {
						newTemplate,
					},
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				handleSuccessPopup(res.data.message);
				handleClose();
				retrieveAllTemplates();

				// Reset the state of the form
				setNewTemplate({ templateName: '', permissions: [] });
				setPermissionName([]);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

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
						<InputLabel id='multiple-chip-label'>
							Permissions
						</InputLabel>
						<Select
							labelId='multiple-chip-label'
							id='multiple-chip'
							multiple
							label='Permissions'
							value={permissionName}
							onChange={handleChange}
							variant='standard'
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
							{permissions.map((el) => (
								<MenuItem
									key={el}
									value={el}
									onClick={() => {
										handleChangePermissions(el);
									}}
								>
									{el}
								</MenuItem>
							))}
						</Select>
						<TextField
							sx={{ mt: 1 }}
							required={true}
							id='outlined-required'
							label='Name'
							onChange={(e) => {
								setNewTemplate((prev) => {
									return {
										...prev,
										templateName: e.target.value,
									};
								});
							}}
							value={newTemplate?.templateName}
						/>
						<Button
							sx={{ mt: 5 }}
							variant='contained'
							onClick={() => {
								handleCreateNewTemplate();
							}}
							disabled={Object.values(newTemplate).some(
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

export default NewTemplate;
