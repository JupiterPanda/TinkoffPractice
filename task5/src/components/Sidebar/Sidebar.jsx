import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context";
import { Search, MovieList } from "..";
import "./Sidebar.scss";

export const Sidebar = () => {
	const { movies } = useAppContext();

	const navigate = useNavigate();

	return (
		<aside>
			<Search />
			<MovieList />
			<div className="footer">
				<p>Найдено {movies.length} фильмов</p>
				<button className="button" onClick={() => navigate("/createMovie")}>
					Добавить
				</button>
			</div>
		</aside>
	);
};
