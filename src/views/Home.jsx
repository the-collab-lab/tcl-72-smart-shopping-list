import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, userId, userEmail }) {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent the default form submission behavior.

		try {
			const newList = await createList(userId, userEmail, name);
			setListPath(newList); // creates a new list and automatically creates the userId
			// that tracks the purchased item and also saves it to local storage

			setName(''); //refreshes the form after submission place takes it back to the default state

			alert('The item has been added.'); //alert message

			navigate('/list'); // navigate to list page
		} catch (err) {
			console.error(err);

			alert('item not created'); //alert message if there is an error with creating the item
		}
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

			<form id="list" onSubmit={handleSubmit}>
				<label htmlFor="listName">Name of shopping list: </label>
				<br />
				<input
					type="text"
					id="listName"
					value={name}
					onChange={handleChange}
					required
				/>
				<br />
				<button type="submit">Create list</button>
			</form>

			<ul>
				{data?.map((item) => (
					<SingleList
						key={item.path}
						name={item.name}
						path={item.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
