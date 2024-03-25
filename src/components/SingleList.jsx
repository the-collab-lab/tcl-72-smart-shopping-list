import './SingleList.css';
import { MdOutlineDeleteForever } from 'react-icons/md';

export function SingleList({ name, path, setListPath, deleteItem, itemId }) {
	function handleClick() {
		setListPath(path);
	}
	function handleDelete() {
		// Check if itemId is defined before calling deleteItem
		if (itemId) {
			deleteItem(name, itemId);
		}
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
