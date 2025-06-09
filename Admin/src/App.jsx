import React, { useState, useEffect } from "react";
import { Film } from "lucide-react";
import axios from "axios";

export default function Admin() {
  const [movies, setMovies] = useState([]); // List of movies from backend
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    description: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setMovie({
      id: null,
      title: "",
      description: "",
      genre: "",
      year: "",
      rating: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update movie
        await axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie);
        alert("Movie updated successfully!");
      } else {
        // Add new movie
        await axios.post("http://localhost:5000/api/movies", movie);
        alert("Movie added successfully!");
      }
      clearForm();
      fetchMovies();
    } catch (err) {
      console.error("Error adding/updating movie:", err);
      alert("Failed to add/update movie.");
    }
  };

  const handleEdit = (movie) => {
    setMovie(movie);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${id}`);
        alert("Movie deleted successfully!");
        fetchMovies();
        if (movie.id === id) clearForm();
      } catch (err) {
        console.error("Error deleting movie:", err);
        alert("Failed to delete movie.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-xl text-gray-100">
      <div className="flex items-center justify-center mb-6">
        <Film className="text-red-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-center">
          {isEditing ? "Edit Movie" : "Add New Movie"}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            placeholder="e.g., The Shawshank Redemption"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            placeholder="Brief description of the movie"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            placeholder="e.g., Drama, Sci-Fi, Comedy"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Release Year
            </label>
            <input
              type="number"
              name="year"
              value={movie.year}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={movie.rating}
              onChange={handleChange}
              placeholder="1-10"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              step="0.1"
              min="0"
              max="10"
              required
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-2">
          <button
            type="button"
            onClick={clearForm}
            className="w-1/3 bg-gray-700 text-gray-100 font-medium py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
          >
            Clear
          </button>

          <button
            type="submit"
            className="w-2/3 bg-indigo-600 text-white font-medium py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
          >
            {isEditing ? "Update Movie" : "Add Movie"}
          </button>
        </div>
      </form>

      {/* Movies List */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-200">Movies List</h3>
      {movies.length === 0 ? (
        <p className="text-gray-400 text-center">No movies found.</p>
      ) : (
        <div className="space-y-4">
          {movies.map((m) => (
            <div
              key={m._id || m.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded"
            >
              <div>
                <h4 className="font-semibold text-lg text-gray-100">{m.title}</h4>
                <p className="text-gray-400 text-sm">
                  {m.genre} | {m.year} | Rating: {m.rating}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                  aria-label={`Edit ${m.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id || m.id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded transition duration-200"
                  aria-label={`Delete ${m.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
