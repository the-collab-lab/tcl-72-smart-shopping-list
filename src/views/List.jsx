import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ListItem } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);
	const navigate = useNavigate();

	useLayoutEffect(() => {
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

	// JSX for the welcome prompt when there are no items
	const renderWelcomePrompt = () => (
		<div className="welcome-prompt">
			<h2>Welcome to Your List!</h2>
			<p>
				Ready to start your list adventure? Click on the button below to add
				your very first item.
			</p>
			<button onClick={() => navigate('/manage-list')} type="button">
				Add Item
			</button>
		</div>
	);

	return (
		<>
			{data.length < 1 ? (
				renderWelcomePrompt()
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
					<ul>
						{filteredItems.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))}
					</ul>
				</>
			)}
		</>
	);
}
