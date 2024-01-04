import { BiSearch } from "react-icons/bi";

import { useAppContext } from "../../context";
import "./Search.scss";

export const Search = () => {
	const { searchTerm, setSearchTerm } = useAppContext();

	return (
		<div className="search">
			<div className="input">
				<BiSearch className="icon" />
				<input
					type="text"
					placeholder="Введите название фильма"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	);
};
