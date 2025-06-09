import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MovieList from "./Pages/MovieList";
import MovieDetail from "./Pages/MoviesDetail";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/moviedetail/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}
