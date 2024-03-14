import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useState, useEffect } from 'react';

export function ListItem({ id, listPath, itemData }) {
	const [itemChecked, setItemChecked] = useState(false);

	useEffect(() => {
		if (itemData?.dateLastPurchased) {
			const twentyFourHours = 24 * 60 * 60 * 1000;
			const currentTime = new Date().getTime();
			if (
				currentTime - itemData?.dateLastPurchased.toMillis() <
				twentyFourHours
			) {
				setItemChecked(true);
			}
		}
	}, [id]);
	const setItemPurchased = () => {
		setItemChecked((prev) => !prev);
		updateItem(listPath, id, itemData);
	};

	const handleDelete = () => {
		if (window.confirm('Do you really want to delete this item?')) {
			//TODO: call the updated delete function from the firebase api file
			console.log(id);
		} else {
			return;
		}
	};

	return (
		<li className="ListItem">
			<label htmlFor={itemData.name}>
				<input
					name={itemData.name}
					type="checkbox"
					checked={itemChecked}
					onChange={setItemPurchased}
				/>
				{itemData.name}
			</label>
			<button onClick={handleDelete}>Delete item</button>
		</li>
	);
}
