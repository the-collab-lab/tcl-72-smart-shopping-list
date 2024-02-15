import { useState } from 'react';
import { addItem } from '../api/firebase';

export function ManageList() {
	const [itemName, setItemName] = useState('');
	const [time, setTime] = useState(7);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await addItem(
				localStorage.getItem('tcl-shopping-list-path'),
				{ itemName, time },
			);
			alert('Item saved to database');
		} catch (error) {
			console.log(error);
			alert('Item not saved');
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
		</>
	);
}
