import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavLink } from 'react-router-dom';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
					{!user ? (
						<div>
							<SignInButton />
						</div>
					) : (
						<div>
							<span>{user?.displayName}</span>
							<SignOutButton />
						</div>
					)}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						{/* <a href="#" className="Nav-link">
							Home
						</a> */}
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							List
						</NavLink>
						<NavLink to="/manage-list" className="Nav-link">
							Manage List
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
