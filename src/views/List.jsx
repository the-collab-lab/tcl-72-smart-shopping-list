import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	//  write some JavaScript that filters the `data` array based on the `searchInput`
	const filterItems = (e) => {
		setSearchInput(e.target.value);
		data.map((item) => {
			// return
			console.log(item);
		});
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
					value={searchInput}
					onChange={(e) => filterItems(e)}
				/>
				<button type="button">X</button>
			</form>
			<ul>
				{/**
				 * TODO: write some JavaScript that renders the `data` array
				 * using the `ListItem` component that's imported at the top
				 * of this file.
				 */}
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
