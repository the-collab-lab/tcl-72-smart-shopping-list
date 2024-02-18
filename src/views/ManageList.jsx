import { useState } from 'react';
import { addItem } from '../api/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ManageList({ listPath }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);

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
			await addItem(localStorage.getItem(listPath), {
				itemName,
				daysUntilNextPurchase,
			});
			toast.success('Item saved to database');
			setItemName('');
			setDaysUntilNextPurchase(7);
		} catch (error) {
			toast.error('Item not saved');
			setItemName('');
			setDaysUntilNextPurchase(7);
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
				<div>
					<label htmlFor="daysUntilNextPurchase">
						Days Until NextPurchase:{' '}
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
			<ToastContainer style={{ toastCSS }} />
		</>
	);
}
