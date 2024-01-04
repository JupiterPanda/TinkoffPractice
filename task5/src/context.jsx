import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [favouriteMovies, setFavouriteMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:3000/movies/?q=" + searchTerm)
			.then(({ data }) => setMovies(data))
			.catch((err) => console.log(err));
	}, [searchTerm]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/favourites")
			.then(({ data }) => setFavouriteMovies(data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<AppContext.Provider
			value={{
				movies,
				setMovies,
				searchTerm,
				setSearchTerm,
				selectedMovie,
				setSelectedMovie,
				favouriteMovies,
				setFavouriteMovies,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
