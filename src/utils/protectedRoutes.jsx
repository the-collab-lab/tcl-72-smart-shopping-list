import { Navigate, Outlet } from 'react-router-dom';

import React from 'react';

export default function ProtectedRoutes() {
	const isAuth = localStorage.getItem('isAuthenticated');
	return isAuth ? <Outlet /> : <Navigate to="/" />;
}
