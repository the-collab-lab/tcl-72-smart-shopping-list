import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaysBetweenDates } from '../utils';
import { comparePurchaseUrgency } from '../api/firebase';
import { ListItem } from '../components/ListItem';
import Button from '@mui/material/Button';

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
		<div className="mt-10 flex justify-center">
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
				<div className="home">
					<form className="flex flex-col md:flex-row items-center gap-5">
						<div>
							<label htmlFor="search">Search: </label>
							<input
								type="search"
								id="search"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className="p-3 focus:outline-none"
							/>
						</div>
						<Button onClick={clearSearchInput} variant="contained">
							<span className="text-lg font-bold">Clear</span>
						</Button>
					</form>
					<div className="mt-20 flex flex-col gap-5">
						{items.map((item) => (
							<ListItem
								key={item.id}
								id={item.id}
								listPath={listPath}
								itemData={item}
								timeNow={timeNow}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
