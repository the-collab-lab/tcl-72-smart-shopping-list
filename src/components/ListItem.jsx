import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useState, useEffect } from 'react';

export function ListItem({ id, name, listPath, dateLastPurchased }) {
	const [itemChecked, setItemChecked] = useState(false);

	console.log(dateLastPurchased);
	useEffect(() => {
		if (dateLastPurchased) {
			// const oneMinute = 60 * 1000; 1 minute
			const twentyFourHours = 24 * 60 * 60 * 1000;
			const currentTime = new Date().getTime();
			console.log(dateLastPurchased.toMillis());
			if (currentTime - dateLastPurchased.toMillis() < twentyFourHours) {
				setItemChecked(true);
			}
		}
	}, [id]);

	// if (currentTime - parseInt(lastCheckedTime) < oneMinute) {
	// 	setItemChecked(true);
	// }

	// useEffect(() => {
	// 	if (itemChecked) {
	// 		const timer = setTimeout(
	// 			() => {
	// 				setItemChecked(false);
	// 			},
	// 			24 * 60 * 60 * 1000,
	// 		);
	// 		// 60 * 1000  (1 minute test)
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [itemChecked, id]);

	const setItemPurchased = () => {
		setItemChecked((prev) => !prev);
		updateItem(listPath, id);
		// if (!itemChecked) {
		// 	localStorage.setItem(`checked_${id}`, new Date().getTime().toString());
		// } else {
		// 	localStorage.removeItem(`checked_${id}`);
		// }
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
