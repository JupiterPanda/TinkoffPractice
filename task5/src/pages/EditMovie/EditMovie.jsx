import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useAppContext } from "../../context";
import { FormInput } from "../../components";
import { EMPTY_FORM_STATE } from "../../constants";

export const EditMovie = () => {
	const [movieState, setMovieState] = useState(EMPTY_FORM_STATE);

	const navigate = useNavigate();

	const { setMovies, selectedMovie, setSelectedMovie } = useAppContext();

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			axios
				.get("http://localhost:3000/movies/" + id)
				.then(({ data }) => {
					setSelectedMovie(data);
					setMovieState(data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			!movieState?.actors ||
			!movieState?.director ||
			!movieState?.genres?.length ||
			!movieState?.plot ||
			!movieState?.posterUrl ||
			!movieState?.runtime ||
			!movieState?.title ||
			!movieState?.year
		) {
			toast.error("Пожалуйста, заполните все поля");
			return;
		}

		axios
			.patch("http://localhost:3000/movies/" + id, {
				...movieState,
				id: selectedMovie.id,
			})
			.then(({ data }) => {
				setMovies((prevState) =>
					prevState.map((movie) => (movie.id === id ? data : movie))
				);
				navigate("/movie/" + id);
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (e) => {
		setMovieState({
			...movieState,
			[e.target.name]:
				e.target.name === "genres"
					? e.target.value.split(", ")
					: e.target.value,
		});
	};

	if (!selectedMovie) {
		return (
			<div className="home">
				<h1 className="home__title">Фильм с номером {id} не найден</h1>
			</div>
		);
	}

	return (
		<form className="form">
			<div className="form-container" onSubmit={handleSubmit}>
				<h1>Редактирование</h1>
				<FormInput
					value={movieState?.title}
					onChange={handleChange}
					name="title"
					label="Название фильма"
					placeholder="Введите название фильма"
					type="text"
					required
				/>
				<FormInput
					value={movieState?.director}
					onChange={handleChange}
					name="director"
					label="Режиссер"
					placeholder="Введите имя режиссера"
					type="text"
					required
				/>
				<FormInput
					value={movieState?.year}
					onChange={handleChange}
					name="year"
					label="Год выпуска"
					placeholder="Введите год выпуска"
					type="number"
					required
				/>
				<FormInput
					value={movieState?.runtime}
					onChange={handleChange}
					name="runtime"
					label="Продолжительность"
					placeholder="Введите продолжительность фильма"
					type="number"
					required
				/>
				<FormInput
					value={movieState?.actors}
					onChange={handleChange}
					name="actors"
					label="Актеры"
					placeholder="Введите актеров (через запятую)"
					type="text"
					required
				/>
				<FormInput
					value={movieState?.plot}
					onChange={handleChange}
					name="plot"
					label="Описание"
					placeholder="Введите описание фильма"
					textarea
					required
				/>
				<FormInput
					value={movieState?.posterUrl}
					onChange={handleChange}
					name="posterUrl"
					label="Обложка"
					placeholder="Введите ссылку на обложку"
					type="url"
					required
				/>
				<FormInput
					value={movieState?.genres.join(", ")}
					onChange={handleChange}
					name="genres"
					label="Жанры"
					placeholder="Введите жанры"
					type="text"
					required
				/>
			</div>
			<div className="form-footer">
				<button type="button" onClick={() => navigate(-1)}>
					Отменить
				</button>
				<button type="submit" className="button" onClick={handleSubmit}>
					Сохранить
				</button>
			</div>
		</form>
	);
};
