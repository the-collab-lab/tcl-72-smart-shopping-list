import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaysBetweenDates } from '../utils';
import { comparePurchaseUrgency } from '../api/firebase';
import { ListItem } from '../components/ListItem';

export function List({ data, listPath }) {
	const [searchInput, setSearchInput] = useState('');
	const [items, setItems] = useState([]);
	const navigate = useNavigate();
	const timeNow = new Date().getTime();

	// temporary array containing position, name, and sort value
	const mapped = data?.map((x, i) => {
		const timeNextPurchased = x.dateNextPurchased.toDate().getTime();
		const timeLastPurchased = x.dateLastPurchased?.toDate().getTime();
		const daysTillNextPurchase = getDaysBetweenDates(
			timeNow,
			timeNextPurchased,
		);
		const daysSinceLastPurchase = getDaysBetweenDates(
			timeLastPurchased,
			timeNow,
		);
		return {
			i,
			name: x.name,
			value:
				daysSinceLastPurchase >= 60
					? daysSinceLastPurchase
					: daysTillNextPurchase,
		};
	});

	useEffect(() => {
		// Function to sort items based on purchase urgency & alphabetical order
		comparePurchaseUrgency(mapped);
		const sortedItems = mapped.map((x) => data[x.i]);

		// Function to filter items based on search input
		const filterItems = (searchInput) => {
			const filteredItems = sortedItems.filter((item) =>
				item.name.toLowerCase().includes(searchInput.toLowerCase()),
			);
			return setItems(filteredItems);
		};
		filterItems(searchInput);
	}, [searchInput, data]);

	// Function to clear the search input
	const clearSearchInput = () => {
		setSearchInput('');
		// Reset filteredItems to the entire data array when search input is cleared
		setItems(data);
	};

	return (
		<>
			{data.length < 1 ? (
				<div className="welcome-prompt">
					<h2>Welcome to Your List!</h2>
					<p>
						Ready to start your list? Click on the button below to add your very
						first item.
					</p>
					<button onClick={() => navigate('/manage-list')} type="button">
						Add Item
					</button>
				</div>
			) : (
				<>
					<p>
						Hello from the <code>/list</code> page!
					</p>
					<form>
						<label htmlFor="search">Search: </label>
						<input
							type="search"
							id="search"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button type="button" onClick={clearSearchInput}>
							X
						</button>
					</form>
					{items.map((item) => (
						<ListItem
							key={item.id}
							id={item.id}
							listPath={listPath}
							itemData={item}
							timeNow={timeNow}
						/>
					))}
				</>
			)}
		</>
	);
}
