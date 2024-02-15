import { useState } from 'react';
import { addItem } from '../api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ManageList() {
	const [itemName, setItemName] = useState('');
	const [time, setTime] = useState(7);

	const toastCSS = {
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await addItem(
				localStorage.getItem('tcl-shopping-list-path'),
				{ itemName, time },
			);
			toast.success('Item saved to database');
		} catch (error) {
			console.log(error);
			toast.error('Item not saved');
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form onSubmit={handleSubmit}>
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
				<select
					id="time"
					value={time}
					onChange={(e) => setTime(e.target.value)}
				>
					<option value={7}>Soon</option>
					<option value={14}>Kind of soon</option>
					<option value={30}>Not soon</option>
				</select>
				<button type="submit">Submit Item</button>
			</form>
			<ToastContainer style={{ toastCSS }} />
		</>
	);
}
