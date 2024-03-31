import { Outlet } from 'react-router-dom';
import './Layout.css';
import { FaShoppingBag, FaUser, FaUserMinus } from 'react-icons/fa';
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

					<div className="login-user">
						{!user ? (
							<div className="flex justify-end gap-5 items-center">
								<FaUser />
								<SignInButton />
							</div>
						) : (
							<div className="flex justify-between">
								<span>Welcome {user?.displayName}!</span>
								<span className="flex justify-end gap-5 items-center">
									<FaUserMinus />
									<SignOutButton />
								</span>
							</div>
						)}
					</div>
					<div className="Layout-title">
						<FaShoppingBag />
						<h1>Smart Shopping List</h1>
					</div>

				</header>
				<nav className="Nav">
					<div className="Nav-container">
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
				<main className="Layout-main">
					<h1 className="my-3 text-center font-extrabold text-4xl pb-9 capitalize">
						{localStorage.getItem('list') || 'No list selected'}
					</h1>
					<Outlet />
				</main>
			</div>
		</>
	);
}
