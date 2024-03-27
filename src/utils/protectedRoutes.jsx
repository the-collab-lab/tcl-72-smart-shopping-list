import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function ProtectedRoutes() {
	const { currentUser } = useContext(AuthContext);
	return currentUser ? <Outlet /> : <Navigate to="/" />;
}
