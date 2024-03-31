import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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
		<div className="Home flex flex-col items-center">
			<form id="list" onSubmit={handleSubmit}>
				<div className="flex">
					<label htmlFor="listName">Name of shopping list: </label>
					<br />
					<input
						type="text"
						id="listName"
						value={name}
						onChange={handleChange}
						required
					/>
				</div>
				<br />
				<div className="flex items-center justify-center">
					<Button type="submit" variant="contained">
						{' '}
						<span className="text-lg font-bold">Create list</span>
					</Button>
				</div>
			</form>
			<ul className="flex flex-col justify-start w-full pt-9">
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
