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
} from '@mui/material';
import NewTemplate from './NewTemplate';
import EditTemplate from './EditTemplate';

const Template = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [templates, setTemplates] = useState([]);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [clickedRow, setClickedRow] = useState({});

	const retrieveAllTemplates = async () => {
		await axios
			.get('http://localhost:4000/template/all-templates', {
				withCredentials: true,
			})
			.then((res) => {
				setTemplates(res.data.templates);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const deleteTemplate = async (id) => {
		await axios
			.delete('http://localhost:4000/template/delete-template?id=' + id, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.message);
				handleSuccessPopup(res.data.message);
				retrieveAllTemplates();
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	const handlePermissionColor = (perm) => {
		switch (perm) {
			case 'READ':
				return 'success';
			case 'WRITE':
				return 'primary';
			case 'DELETE':
				return 'warning';
			default:
				return 'secondary';
		}
	};

	const handleSuccessPopup = (message) => {
		console.log(message);
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
		retrieveAllTemplates();
	}, []);

	return (
		<div>
			<div>
				<Card sx={{ maxWidth: '100%' }}>
					<CardMedia
						sx={{ height: 140 }}
						image='/permissions.jpg'
						title='permissions'
					/>
				</Card>
				<Divider />
				{templates && (
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='right'>
										Permissions
									</TableCell>
									<TableCell align='right'></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{templates?.map((row) => (
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
												{row.templateName}
											</Link>
										</TableCell>
										<TableCell align='right'>
											{row.permissions.map((el) => {
												return (
													<Chip
														sx={{ mr: 1 }}
														label={el}
														color={handlePermissionColor(
															el
														)}
													/>
												);
											})}
										</TableCell>
										<TableCell align='right'>
											<Button
												onClick={() => {
													deleteTemplate(row.id);
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
												Create New Template
											</Button>
										</TableCell>
									</TableRow>
								}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				<NewTemplate
					open={open}
					setOpen={setOpen}
					retrieveAllTemplates={retrieveAllTemplates}
					handleSuccessPopup={handleSuccessPopup}
				/>
				<EditTemplate
					open={openEdit}
					setOpen={setOpenEdit}
					retrieveAllTemplates={retrieveAllTemplates}
					handleSuccessPopup={handleSuccessPopup}
					templateInfo={clickedRow}
				/>
			</div>
		</div>
	);
};

export default Template;
