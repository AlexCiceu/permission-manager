export const axiosErrorHandling = (err, enqueueSnackbar) => {
	if (err?.response?.status !== 401) {
		enqueueSnackbar(err?.response?.data?.message, {
			variant: 'error',
			autoHideDuration: 5000,
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'center',
			},
		});
	} else {
		enqueueSnackbar('User not authenticated, please logout and login.', {
			variant: 'error',
			autoHideDuration: 5000,
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'center',
			},
		});
	}
};
