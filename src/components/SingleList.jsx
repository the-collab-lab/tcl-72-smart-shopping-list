import React from 'react';
import './SingleList.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { deleteList } from '../api';

export function SingleList({ name, path, setListPath, listPath, email }) {
	// Function to handle selecting a list
	const handleClick = () => {
		setListPath(path);
		localStorage.setItem('list', name);
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
			className={`flex items-center justify-between ${path === listPath ? 'selected' : ''}`}
		>
			<li className="SingleList">
				<button onClick={handleClick}>{name}</button>
			</li>
			<hr />
			<MdOutlineDeleteForever
				className="text-red-700 cursor-pointer"
				onClick={handleDelete}
			/>
		</div>
	);
}
