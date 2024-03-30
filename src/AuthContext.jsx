import React from 'react';
import { createContext } from 'react';

import { useAuth } from './api/useAuth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const { user, pending } = useAuth();

	if (pending) {
		return (
			<div className="flex justify-center items-center h-[100vh]">
				Loading.....Please wait
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ user, pending }}>
			{children}
		</AuthContext.Provider>
	);
}
