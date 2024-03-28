import './SingleList.css';
import { MdOutlineDeleteForever } from 'react-icons/md';

export function SingleList({
	name,
	path,
	setListPath,
	deleteCollectionPath,
	selected,
}) {
	function handleClick() {
		setListPath(path);
	}
	// function handleDelete() {
	// 	deleteCollectionPath(path);
	// }

	return (
		<div
			className={`flex items-center justify-between ${selected ? 'selected' : ''}`}
		>
			<li className="SingleList">
				<button onClick={handleClick}>{name}</button>
			</li>
			<hr />
			<MdOutlineDeleteForever className="text-red-700" />
		</div>
	);
}
