import { useState } from 'react';
import { addItem, shareList, useShoppingListData } from '../api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ManageList({ listPath, userId }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [email, setEmail] = useState('');

	const toastCSS = {
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	};

	// Fetch existing items from the list
	const existingItems = useShoppingListData(listPath);

	const handleItemSubmit = async (e) => {
		e.preventDefault();

		// Check if the entered item name already exists in the list
		const itemExists = existingItems.some(
			(item) => item.name.toLowerCase() === itemName.trim().toLowerCase(),
		);

		if (itemExists) {
			// If the item already exists, display an error message and exit the function
			toast.error('Item already exists in the list');
			return;
		}

		// Add the new item to the database
		try {
			await addItem(listPath, {
				itemName,
				daysUntilNextPurchase,
			});
			// Display success message and reset the form fields
			toast.success('Item saved to database');
			setItemName('');
			setDaysUntilNextPurchase(7);
		} catch (error) {
			// If an error occurs while adding the item, display an error message and reset the form fields
			console.error('Error adding item:', error);
			toast.error('Item not saved');
			setItemName('');
			setDaysUntilNextPurchase(7);
		}
	};

	const handleEmailSubmit = async (e) => {
		e.preventDefault();

		try {
			await shareList(listPath, userId, email);
			toast.success('List shared to email');
			setEmail('');
		} catch (error) {
			console.log(error);
			toast.error('Email not recognised');
			setEmail('');
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form onSubmit={handleItemSubmit}>
				<div>
					<label htmlFor="itemName">Name of item: </label>
					<input
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
						type="text"
						name="itemName"
						id="itemName"
						required
					/>
				</div>
				<div>
					<label htmlFor="daysUntilNextPurchase">
						Days Until Next Purchase:{' '}
					</label>
					<select
						id="daysUntilNextPurchase"
						value={daysUntilNextPurchase}
						onChange={(e) => setDaysUntilNextPurchase(e.target.value)}
					>
						<option value={7}>Soon</option>
						<option value={14}>Kind of soon</option>
						<option value={30}>Not soon</option>
					</select>
				</div>
				<button type="submit">Submit Item</button>
			</form>
			<form onSubmit={handleEmailSubmit}>
				<h1>Share List</h1>
				<div>
					<label htmlFor="email">Email: </label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						name="email"
						id="email"
						required
					/>
				</div>
				<button type="submit">Submit Item</button>
			</form>
			<ToastContainer style={{ toastCSS }} />
		</>
	);
}
