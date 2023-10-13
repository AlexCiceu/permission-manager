import './App.css';
import Login from './components/Login';
import { React, useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { isUserAuthenticated } from './utils/Authentication';
import Main from './components/Main';
import { BrowserRouter, Router } from 'react-router-dom';

function App() {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserAuthenticated());

	return (
		<BrowserRouter>
			<SnackbarProvider>
				<div className='App'>
					{isUserLoggedIn ? (
						<div>
							<Main
								isUserLoggedIn={isUserLoggedIn}
								setIsUserLoggedIn={setIsUserLoggedIn}
							/>
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
