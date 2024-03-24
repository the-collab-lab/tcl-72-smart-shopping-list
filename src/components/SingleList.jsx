import './SingleList.css';
import { MdOutlineDeleteForever } from 'react-icons/md';

export function SingleList({ name, path, setListPath, deleteItem, itemId }) {
	function handleClick() {
		setListPath(path);
	}
	function handleDelete() {
		deleteItem(path, itemId);
	}

	return (
		<div className="flex items-center justify-between">
			<li className="SingleList">
				<button onClick={handleClick}>{name}</button>
			</li>
			<hr />
			<MdOutlineDeleteForever className="text-red-700" onClick={handleDelete} />
		</div>
	);
}
