import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context";
import "./Movie.scss";

export const Movie = ({ movie }) => {
	const navigate = useNavigate();

	const { selectedMovie, setSelectedMovie } = useAppContext();

	return (
		<li
			className={`movie ${
				selectedMovie?.id === movie.id ? "movie_selected" : ""
			}`}
			onClick={() => {
				setSelectedMovie(movie);
				navigate("/movie/" + movie.id);
			}}
		>
			<h2>{movie.title}</h2>
			<div className="info">
				<p>{movie.year}</p>
				<span>{movie.genres.join(", ")}</span>
			</div>
		</li>
	);
};
