import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useState } from 'react';
import { useAuth } from '../api/useAuth';

export function Home({ data, setListPath }) {
	const [name, setName] = useState('');
	const { user } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const newList = await createList(user.uid, user.email, name);
			setName(newList);
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
				{/**
				 * TODO: write some JavaScript that renders the `lists` array
				 * so we can see which lists the user has access to.
				 */}

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
