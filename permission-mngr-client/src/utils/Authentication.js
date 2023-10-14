// Naive implementation - this is something that wouldn't be done regularly in production, this is strictly for convenience

export const storeAuthenticatedUserInSession = (user) => {
	sessionStorage.setItem('user', JSON.stringify(user));
};

export const handleLogout = (setIsUserLoggedIn) => {
	setIsUserLoggedIn(false);
	sessionStorage.clear();
};

export const isUserAuthenticated = () => {
	return JSON.parse(sessionStorage.getItem('user'))?.email !== undefined;
};
