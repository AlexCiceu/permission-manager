import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Office = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [currentOffice, setCurrentOffice] = useState();

	const retrieveCurrentOffice = async () => {
		await axios
			.get('http://localhost:4000/office/current-office', {
				withCredentials: true,
			})
			.then((res) => {
				setCurrentOffice();
			})
			.catch((err) => {
				axiosErrorHandling(err, enqueueSnackbar);
			});
	};

	useEffect(() => {
		// Will run twice due to React.StrictMode in index.js while running the client as dev - expected behavior
		retrieveCurrentOffice();
	}, []);

	return <div>Office</div>;
};

export default Office;
