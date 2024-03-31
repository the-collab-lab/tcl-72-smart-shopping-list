import './SingleList.css';
import { Button } from '@mui/material';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(path);
		localStorage.setItem('list', name);
	}

	return (
		<li className="SingleList">
			<Button
				style={{
					color: ' #113f67',
					backgroundColor: '#e7eaf6',
					margin: '10px',
					textTransform: 'capitalize',
				}}
				variant="contained"
				onClick={handleClick}
			>
				<span className="text-lg font-bold">{name}</span>
			</Button>
		</li>
	);
}
