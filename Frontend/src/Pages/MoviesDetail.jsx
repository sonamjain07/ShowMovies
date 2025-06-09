import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 text-xl font-semibold">
        Movie not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
       

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.title}</h1>

          <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">{movie.genre}</span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{movie.year}</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">⭐ {movie.rating}/10</span>
          </div>

          <p className="text-gray-700 mb-6">{movie.description || "No description provided."}</p>

          <Link
            to="/movies"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition"
          >
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
