import React, { useState, useEffect } from 'react';
import { ListItem } from '../components';

export function List({ data, listPath }) {
	const [searchInput, setSearchInput] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

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
			return setFilteredItems(searchResult);
		};
		filterItems(searchInput);
	}, [searchInput, data]);

	// Function to clear the search input
	const clearSearchInput = () => {
		setSearchInput('');
		// Reset filteredItems to the entire data array when search input is cleared
		setFilteredItems(data);
	};
	console.log(data);
	return (
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
			<ul>
				{filteredItems.map((item) => (
					<ListItem
						key={item.id}
						id={item.id}
						name={item.name}
						listPath={listPath}
						dateLastPurchased={item.dateLastPurchased}
					/>
				))}
			</ul>
		</>
	);
}
