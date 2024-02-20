import { useEffect, useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	const filterItems = (searchInput) => {
		const searchResult = data.filter((item) => item.name.includes(searchInput));
		return setFilteredItems(searchResult);
	};

	useEffect(() => {
		setFilteredItems(data);
	}, [data]);

	useEffect(() => {
		filterItems(searchInput);
	}, [searchInput]);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="search">Search: </label>
				<input
					type="search"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button type="button">X</button>
			</form>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `data` array
				 * using the `ListItem` component that's imported at the top
				 * of this file.
				 */}
				{filteredItems.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
