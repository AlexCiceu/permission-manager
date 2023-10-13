import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

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

	useEffect(() => {
		retrieveCompanyInfo();
	}, []);

	return <div>Company</div>;
};

export default Company;
