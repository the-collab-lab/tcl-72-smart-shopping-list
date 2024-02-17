import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, userId, userEmail }) {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const newList = await createList(userId, userEmail, name);
			setListPath(newList);
			setName('');
			alert('The item has been added.');
			navigate('/list');
			localStorage.setItem('tcl-shopping-list-path', newList);
		} catch (err) {
			console.error(err);
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
