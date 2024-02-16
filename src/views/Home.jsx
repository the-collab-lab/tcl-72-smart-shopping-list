import { SingleList } from '../components/SingleList';
import './Home.css';
import { createList } from '../api/firebase';
import { useState } from 'react';

export function Home({ data, setListPath }) {
	// const [createList,setCreateList] = useState(false)

	// function onSubmit() {
	// 	useState = true;
	// }

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

			<form id="list-form" action="#">
				<label htmlFor="create-list">Create a new list</label>
				<br />
				<input type="email" id="create-list" required />
				<br />
				<input type="submit" />
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
