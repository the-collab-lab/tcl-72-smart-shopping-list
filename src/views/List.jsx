import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaysBetweenDates } from '../utils';
import { CgDanger } from 'react-icons/cg';
import { comparePurchaseUrgency } from '../api/firebase';

export function List({ data, listPath }) {
	const [searchInput, setSearchInput] = useState('');
	const [items, setItems] = useState([]);
	const navigate = useNavigate();
	const timeNow = new Date().getTime();

	// temporary array containing position, name, and sort value
	const mapped = data?.map((x, i) => {
		const timeNextPurchased = x.dateNextPurchased.toDate().getTime();
		const daysTillNextPurchase = getDaysBetweenDates(
			timeNow,
			timeNextPurchased,
		);
		return { i, name: x.name, value: daysTillNextPurchase };
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

	// Function to determine the urgency of an item based on next purchase date
	const getUrgencyIndicator = (timeNow, dateNextPurchased) => {
		const timeNextPurchased = dateNextPurchased.toDate().getTime();
		const daysTillNextPurchase = getDaysBetweenDates(
			timeNow,
			timeNextPurchased,
		);

		if (daysTillNextPurchase >= 60) {
			return 'Inactive';
		} else if (daysTillNextPurchase <= 7) {
			return 'Soon';
		} else if (daysTillNextPurchase > 7 && daysTillNextPurchase <= 30) {
			return 'Kind of soon';
		} else {
			return 'Not soon';
		}
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
						<div key={item.id}>
							<label>
								<input
									type="checkbox"
									value={item.id}
									onChange={() => {
										// Handle checkbox change
									}}
								/>
								{item.name} --- {}
								{getUrgencyIndicator(timeNow, item.dateNextPurchased) ===
									'Soon' && <CgDanger className="soon" />}
								{getUrgencyIndicator(timeNow, item.dateNextPurchased) ===
									'Kind of soon' && <CgDanger className="kind-of-soon" />}
								{getUrgencyIndicator(timeNow, item.dateNextPurchased) ===
									'Not soon' && <CgDanger className="not-soon" />}
								{getUrgencyIndicator(timeNow, item.dateNextPurchased) ===
									'Inactive' && <CgDanger className="inactive" disabled />}
								{}
								{getUrgencyIndicator(timeNow, item.dateNextPurchased)}
							</label>
						</div>
					))}
				</>
			)}
		</>
	);
}
