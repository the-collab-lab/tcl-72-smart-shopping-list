import './ListItem.css';

export function ListItem({ name }) {
	return (
		<li className="ListItem">
			<input name={name} type="checkbox" />
			<label htmlFor={name}>{name}</label>
		</li>
	);
}
