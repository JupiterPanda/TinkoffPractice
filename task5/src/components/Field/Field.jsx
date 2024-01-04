import "./Field.scss";

export const Field = ({ name, value }) => {
	return (
		<div className="movie-field">
			<p>{name}</p>
			<p>{value}</p>
		</div>
	);
};
