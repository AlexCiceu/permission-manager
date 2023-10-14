import './App.css';
import Login from './components/Login';
import { React, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { isUserAuthenticated } from './utils/Authentication';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const isLoggedIn = isUserAuthenticated();
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

	return (
		<BrowserRouter>
			<SnackbarProvider>
				<div className='App'>
					{isUserLoggedIn ? (
						<div>
							<Main setIsUserLoggedIn={setIsUserLoggedIn} />
						</div>
					) : (
						<div className='App-header'>
							<Login setIsUserLoggedIn={setIsUserLoggedIn} />
						</div>
					)}
				</div>
			</SnackbarProvider>
		</BrowserRouter>
	);
}

export default App;
