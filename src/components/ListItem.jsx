import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useState, useEffect } from 'react';

export function ListItem({ id, name, listPath, dateLastPurchased }) {
	const [itemChecked, setItemChecked] = useState(false);

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
		updateItem(listPath, id);
	};

	return (
		<li className="ListItem">
			<label htmlFor={name}>
				<input
					name={name}
					type="checkbox"
					checked={itemChecked}
					onChange={setItemPurchased}
				/>
				{name}
			</label>
		</li>
	);
}
