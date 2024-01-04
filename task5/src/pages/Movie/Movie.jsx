import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

import { useAppContext } from "../../context";
import { Field } from "../../components";
import "./Movie.scss";

export const Movie = () => {
	const { id } = useParams();

	const {
		selectedMovie,
		setSelectedMovie,
		favouriteMovies,
		setFavouriteMovies,
	} = useAppContext();

	useEffect(() => {
		if (id) {
			axios
				.get("http://localhost:3000/movies/" + id)
				.then(({ data }) => setSelectedMovie(data))
				.catch((err) => {
					console.error(err);
				});
		}
	}, [id]);

	const imgError = (event) => {
		event.target.src = "https://via.placeholder.com/200x300";
	};

	if (!selectedMovie) {
		return (
			<div className="home">
				<h1>Фильм с номер {id} не найден</h1>
			</div>
		);
	}

	const isFavourite = favouriteMovies.find(
		(movie) => movie.id === selectedMovie?.id
	);

	const toggleFavourite = () => {
		if (isFavourite) {
			axios
				.delete("http://localhost:3000/favourites/" + selectedMovie?.id)
				.then(() =>
					setFavouriteMovies(
						favouriteMovies.filter((movie) => movie.id !== selectedMovie?.id)
					)
				)
				.catch((err) => console.log(err));
		} else {
			axios
				.post("http://localhost:3000/favourites/", selectedMovie)
				.then(() => setFavouriteMovies((p) => [...p, selectedMovie]))
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className="movie-container">
			<div className="movie-header">
				<button
					style={{ backgroundColor: isFavourite ? "#ffe4e6" : "#ecf1f7" }}
					onClick={toggleFavourite}
				>
					{isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
				</button>
				<Link to={`/editMovie/${id}`}>
					<BiEdit />
					Редактировать
				</Link>
			</div>
			<div className="movie-main">
				<img
					onError={imgError}
					width="200"
					height="300"
					src={selectedMovie?.posterUrl}
					alt={"Film poster"}
				/>
				<div className="movie-main-info">
					<h1>{selectedMovie?.title}</h1>
					<h2>{selectedMovie?.director}</h2>
					<h3>Параметры</h3>
					<Field name="Год производства" value={selectedMovie?.year} />
					<Field
						name="Продолжительность"
						value={`${selectedMovie?.runtime} мин.`}
					/>
					<Field name="Жанры" value={selectedMovie?.genres.join(", ")} />
					<Field name="Актеры" value={selectedMovie?.actors} />
				</div>
			</div>
			<div className="movie-plot">
				<h2>Описание</h2>
				<p>{selectedMovie?.plot}</p>
			</div>
		</div>
	);
};

export default Movie;
