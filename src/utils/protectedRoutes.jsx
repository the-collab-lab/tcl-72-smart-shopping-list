import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api';

export default function ProtectedRoutes() {
	const { user, pending } = useAuth();
	if (pending) {
		return <p>Loading...Please wait....</p>;
	}
	return user ? <Outlet /> : <Navigate to="/" />;
}
