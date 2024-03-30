import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList, deleteList } from '../api/firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, userId, userEmail }) {
	const [name, setName] = useState('');
	const [selectedList, setSelectedList] = useState(null); // State to track the selected list
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
	// to create a highlighted list
	const handleListClick = (path) => {
		setListPath(path);
		setSelectedList(path); // this update and highlight the list path
	};

	return (
		<div className="home">
			<form id="list" onSubmit={handleSubmit}>
				<label htmlFor="listName" className="pt-8 font-bold text-center">
					Kindly generate a shopping Collection
				</label>
				<br />
				<input
					type="text"
					id="listName"
					value={name}
					onChange={handleChange}
					className="input"
					placeholder="Type Here..."
					required
				/>
				<br />
				<div className="btn">
					<button type="submit">Register Collection List </button>
				</div>
			</form>
			<ul>
				{data?.map((item) => (
					<SingleList
						key={item.path}
						name={item.name}
						email={userEmail}
						path={item.path}
						setListPath={handleListClick}
						selected={selectedList === item.path} // Checks if the list is selected
						className="SingleList"
					/>
				))}
			</ul>
			<h2 className="hr-lines">Tired🥱?</h2>

			<div className="flex justify-center flex-center m-6 exit-btn">
				<Link to="/manage-list">
					<button className="btn1"> Create a List Right Away!</button>
				</Link>
			</div>
		</div>
	);
}
