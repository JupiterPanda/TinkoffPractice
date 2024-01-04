import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
	Home as HomePage,
	Movie as MoviePage,
	EditMovie as EditMoviePage,
	CreateMovie as CreateMoviePage,
} from "./pages";
import { Header, Sidebar, Footer } from "./components";
import "./App.scss";

function App() {
	return (
		<>
			<Header />
			<Toaster />
			<main className="container main">
				<Sidebar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movie/:id" element={<MoviePage />} />
					<Route path="/editMovie/:id" element={<EditMoviePage />} />
					<Route path="/createMovie" element={<CreateMoviePage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
