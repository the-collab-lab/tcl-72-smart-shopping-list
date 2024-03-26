import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api/config';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	if (pending) {
		return (
			<div className="flex justify-center items-center h-[100vh]">
				Loading.....Please wait
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
}
