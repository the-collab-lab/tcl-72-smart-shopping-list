import React, { useState } from 'react';
import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export function Home({ data, listPath, setListPath, userId, userEmail }) {
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
		} catch (err) {
			console.error(err);
			alert('Item not created');
		}
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	return (
		<div className="home">
			<form id="list" onSubmit={handleSubmit}>
				<label htmlFor="listName" className="pt-8 font-bold text-center">
					Kindly generate a shopping List
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
					<button type="submit">Register List</button>
				</div>
			</form>
			<ul>
				{data?.map((item) => (
					<SingleList
						key={item.path}
						name={item.name}
						email={userEmail}
						path={item.path}
						setListPath={setListPath}
						listPath={listPath} // Pass listPath to SingleList
					/>
				))}
			</ul>
		</div>
	);
}
