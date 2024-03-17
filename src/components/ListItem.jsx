import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useState, useEffect } from 'react';
import { getDaysBetweenDates } from '../utils';
import { CgDanger } from 'react-icons/cg';

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
				<span>
					--- <CgDanger className="soon" />
					Soon
				</span>
			);
		}
		if (daysTillNextPurchase > 7 && daysTillNextPurchase <= 30) {
			return (
				<span>
					--- <CgDanger className="kind-of-soon" />
					Kind of soon
				</span>
			);
		} else {
			return (
				<span>
					--- <CgDanger className="not-soon" />
					Not soon
				</span>
			);
		}
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
				{name}{' '}
				{getUrgencyIndicator(timeNow, dateNextPurchased, dateLastPurchased)}
			</label>
		</li>
	);
}
