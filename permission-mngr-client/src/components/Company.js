import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { axiosErrorHandling } from '../utils/ApiCalls';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';

const Company = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [companyInfo, setCompanyInfo] = useState();

	const retrieveCompanyInfo = async () => {
		await axios
			.get('http://localhost:4000/company/retrieve-company-info', {
				withCredentials: true,
			})
			.then((res) => {
				setCompanyInfo(res.data.companyInfo);
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	useEffect(() => {
		// Will run twice due to React.StrictMode in index.js while running the client as dev - expected behavior
		retrieveCompanyInfo();
	}, []);

	return (
		<div>
			<Card sx={{ maxWidth: '100%' }}>
				<CardMedia
					sx={{ height: 140 }}
					image='/company.jpg'
					title='big corp'
				/>
				<CardContent>
					<Typography gutterBottom variant='h4' component='div'>
						{companyInfo?.name}
					</Typography>
					<Typography variant='h6' color='text.secondary'>
						{companyInfo?.email}
					</Typography>
					<Typography
						variant='body1'
						color='text.primary'
						align='justify'
						sx={{ mt: 3 }}
					>
						{companyInfo?.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						target='_blank'
						component='a'
						href={companyInfo?.website}
					>
						Company Info
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default Company;
