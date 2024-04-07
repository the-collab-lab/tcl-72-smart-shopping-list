import { useState } from 'react';
import { addItem, shareList } from '../api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './managelist.css';
import Button from '@mui/material/Button';
import { CiShare1 } from 'react-icons/ci';

export function ManageList({ listPath, userId, existingItems }) {
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

	const handleItemSubmit = async (e) => {
		e.preventDefault();
		// checks if the user submits an empty item
		if (!itemName.trim()) {
			toast.error('Item cannot be empty');
			return;
		}

		// Normalize the entered item name (lowercase and remove punctuation)
		const normalizedItemName = itemName.trim().replace(/[^\w\s]/gi, '');

		// Check if the entered item name already exists in the list with normalized casing and punctuation
		const itemExists = existingItems.some(
			(item) =>
				item.name.toLowerCase().replace(/[^\w\s]/gi, '') === normalizedItemName,
		);

		if (itemExists) {
			// If the item already exists, display an error message and exit the function
			toast.error('Item already exists in the list');
			return;
		}

		// Add the new item to the database

		try {
			await addItem(listPath, {
				itemName: normalizedItemName, // Pass normalized item name
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
		<div className="manage-list flex items-center gap-10 text-black">
			<form className="add-item h-96 w-auto" onSubmit={handleItemSubmit}>
				<h1 className="text-4xl my-5">Add List Item</h1>
				<div className="flex gap-2">
					<label htmlFor="itemName">Name of item:</label> <br />
					<input
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
						type="text"
						name="itemName"
						id="itemName"
					/>
				</div>
				<div>
					<label htmlFor="daysUntilNextPurchase">
						When will you re-purchase?{' '}
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
				<Button className="submit-btn" type="submit" variant="contained">
					Add Item
				</Button>
			</form>
			<form className="share-list h-96 w-auto" onSubmit={handleEmailSubmit}>
				<h1 className="text-4xl my-5">Share List</h1>
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
				<Button className="submit-btn" type="submit" variant="contained">
					Share List
				</Button>
			</form>
			<ToastContainer style={{ toastCSS }} />
		</div>
	);
}
