import './SingleList.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteList } from '../api';

export function SingleList({ name, path, setListPath, email, selected }) {
	// Function to handle selecting a list
	const handleClick = () => {
		setListPath(path);
	};

	// Function to handle deleting a list
	const handleDelete = async () => {
		const listPath = '/' + path;
		await deleteList(listPath, email);
		localStorage.setItem('tcl-shopping-list-path', '');
		window.location.reload();
	};

	return (
		<div
			className={`flex items-center justify-between ${selected ? 'selected' : ''}`}
		>
			<li className="SingleList">
				<button onClick={handleClick}>{name}</button>
			</li>
			<hr />
			<MdOutlineDeleteForever className="text-red-700" onClick={handleDelete} />
		</div>
	);
}
