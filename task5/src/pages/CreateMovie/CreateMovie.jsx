import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useAppContext } from "../../context";
import { FormInput } from "../../components";
import { EMPTY_FORM_STATE } from "../../constants";
import "./CreateMovie.scss";

export const CreateMovie = () => {
	const [movieState, setMovieState] = useState(EMPTY_FORM_STATE);

	const navigate = useNavigate();

	const { setMovies } = useAppContext();

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
			.post("http://localhost:3000/movies", {
				...movieState,
				id: Math.floor(Math.random() * 100000),
			})
			.then(({ data }) => {
				setMovies((prevState) => [...prevState, data]);
				navigate("/movie/" + data.id);
			})
			.catch((err) => console.log(err));

		setMovieState(EMPTY_FORM_STATE);
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

	return (
		<form className="form">
			<div className="form-container" onSubmit={handleSubmit}>
				<h1>Создать фильм</h1>
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
				<button className="button" type="submit" onClick={handleSubmit}>
					Сохранить
				</button>
			</div>
		</form>
	);
};
