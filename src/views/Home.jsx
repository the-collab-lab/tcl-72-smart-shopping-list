import { SingleList } from '../components/SingleList';
import './Home.css';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
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
