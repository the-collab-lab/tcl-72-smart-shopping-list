import './ListItem.css';
import { updateItem } from '../api/firebase';
import { useState } from 'react';

export function ListItem({ id, name, listPath }) {
	const [itemChecked, setItemChecked] = useState(false);

	const setItemPurchased = () => {
		setItemChecked(!itemChecked);
		updateItem(listPath, id);
	};

	return (
		<li className="ListItem">
			<label htmlFor={name}>
				<input
					name={name}
					type="checkbox"
					value={itemChecked}
					onChange={() => setItemPurchased()}
				/>
				{name}
			</label>
		</li>
	);
}
