import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase';
import { useState, useEffect } from 'react';
import { getDaysBetweenDates } from '../utils';
import { CgDanger } from 'react-icons/cg';
import Checkbox from '@mui/material/Checkbox';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@mui/material';

export function ListItem({ id, listPath, itemData, timeNow }) {
	const [itemChecked, setItemChecked] = useState(false);
	const { name, dateLastPurchased, dateNextPurchased } = itemData;

	useEffect(() => {
		if (dateLastPurchased) {
			const twentyFourHours = 24 * 60 * 60 * 1000;
			const currentTime = new Date().getTime();
			if (currentTime - dateLastPurchased.toMillis() < twentyFourHours) {
				setItemChecked(true);
			}
		}
	}, [id]);

	const setItemPurchased = () => {
		setItemChecked((prev) => !prev);
		updateItem(listPath, id, itemData);
	};

	const handleDelete = async () => {
		if (window.confirm('Do you really want to delete this item?')) {
			await deleteItem(listPath, id);
			console.log('Item deleted successfully');
		} else {
			return;
		}
	};

	// Function to determine the urgency of an item based on next purchase date
	const getUrgencyIndicator = (
		timeNow,
		dateNextPurchased,
		dateLastPurchased,
	) => {
		const timeNextPurchased = dateNextPurchased.toDate().getTime();
		const timeLastPurchased = dateLastPurchased?.toDate().getTime();
		const daysTillNextPurchase = getDaysBetweenDates(
			timeNow,
			timeNextPurchased,
		);
		const daysSinceLastPurchase = getDaysBetweenDates(
			timeLastPurchased,
			timeNow,
		);

		if (daysSinceLastPurchase >= 60) {
			return (
				<span>
					--- <CgDanger className="inactive" />
					Inactive
				</span>
			);
		}
		if (daysTillNextPurchase <= 7) {
			return (
				<span className="flex items-center gap-2">
					--- <CgDanger className="soon" />
					Soon
				</span>
			);
		}
		if (daysTillNextPurchase > 7 && daysTillNextPurchase <= 30) {
			return (
				<span className="flex items-center gap-2">
					--- <CgDanger className="kind-of-soon" />
					Kind of soon
				</span>
			);
		} else {
			return (
				<span className="flex items-center gap-2">
					--- <CgDanger className="not-soon" />
					Not soon
				</span>
			);
		}
	};

	return (
		<li className="flex gap-10">
			<label htmlFor={name} className="flex items-center gap-2">
				<Checkbox
					size="3"
					name="name"
					onChange={setItemPurchased}
					checked={itemChecked}
				/>
				<p className={`${itemChecked ? 'line-through text-white/50' : ''}`}>
					{name}
				</p>
				{itemChecked ? (
					<></>
				) : (
					getUrgencyIndicator(timeNow, dateNextPurchased, dateLastPurchased)
				)}
			</label>
			<Button
				onClick={handleDelete}
				className="flex gap-2 md:gap-3 items-center"
				variant="contained"
			>
				<FaTrashAlt className="h-5 w-5 md:h-7 md:w-7" />
				<span className="md:text-lg font-bold">Delete item</span>
			</Button>
		</li>
	);
}
