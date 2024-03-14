import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function List({ data, listPath }) {
	const [searchInput, setSearchInput] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// Initialize filteredItems with the entire data array when the component mounts
		setFilteredItems(data);
	}, [data]);

	// Function to filter items based on search input
	useEffect(() => {
		const filterItems = (searchInput) => {
			const searchResult = data.filter((item) =>
				item.name.toLowerCase().includes(searchInput.toLowerCase()),
			);
			setFilteredItems(searchResult);
		};
		filterItems(searchInput);
	}, [searchInput, data]);

	// Function to clear the search input
	const clearSearchInput = () => {
		setSearchInput('');
		// Reset filteredItems to the entire data array when search input is cleared
		setFilteredItems(data);
	};

	// Function to determine the urgency of an item based on last purchase date

	const getUrgencyIndicator = (lastPurchaseDate) => {
		if (!lastPurchaseDate) {
			return 'Inactive';
		}

		const today = new Date();
		const daysSinceLastPurchase = Math.floor(
			(today - new Date(lastPurchaseDate)) / (1000 * 60 * 60 * 24),
		);

		if (daysSinceLastPurchase >= 60) {
			return 'Inactive';
		} else if (daysSinceLastPurchase <= 7) {
			return 'Soon';
		} else if (daysSinceLastPurchase <= 30) {
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
					{filteredItems.map((item) => (
						<div key={item.id}>
							<label>
								<input
									type="checkbox"
									value={item.id}
									onChange={() => {
										// Handle checkbox change
									}}
								/>
								{item.name} ({getUrgencyIndicator(item.lastPurchaseDate)})
							</label>
						</div>
					))}
				</>
			)}
		</>
	);
}
