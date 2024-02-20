import React, { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');

	// Function to filter items based on search input
	const filterItems = (e) => {
		setSearchInput(e.target.value);
	};

	// Filtered list based on search input (not working yet- still in progress)
	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchInput.toLowerCase()),
	);
	console.log(filteredData);

	// Function to clear search input
	const clearSearchInput = () => {
		setSearchInput('');
	};

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
					onChange={(e) => filterItems(e)}
				/>
				<button type="button" onClick={clearSearchInput}>
					X
				</button>
			</form>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `data` array
				 * using the `ListItem` component that's imported at the top
				 * of this file.
				 */}
				{/**
				 * Render the filtered list using the ListItem component.
				 */}
				{filteredData.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
