import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("Fetched Movies:", res.data);
        setMovies(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Updated Navbar */}
        <nav className="bg-indigo-600 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <h1 className="text-2xl font-bold font-serif">MovieApp</h1>
            </div>
            <div className="space-x-6">
              <Link to="/" className="hover:underline font-serif">Home</Link>
              <Link to="/movies" className="hover:underline font-serif">Movies</Link>
            </div>
          </div>
        </nav>

        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Updated Navbar */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <h1 className="text-2xl font-bold font-serif">MovieApp</h1>
          </div>
          <div className="space-x-6">
            <Link to="/" className="hover:underline font-serif">Home</Link>
            <Link to="/movies" className="hover:underline font-serif">Movies</Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner with Search */}
      <div className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Movie Collection</h1>
            <p className="text-lg mb-8 opacity-90">Discover and explore your favorite films</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-2 pr-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm"
              />
              <div className="absolute right-4 top-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Movies ({filteredMovies.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1">{movie.title}</h2>
                <div className="flex items-center mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mr-3">{movie.genre}</span>
                  <span className="text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">{movie.year}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-gray-800 font-bold">{movie.rating}/10</span>
                  </div>
                  <Link
                    to={`/moviedetail/${movie._id}`}
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md mt-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-xl font-medium">No movies found matching your search</p>
            <p className="text-gray-400 mt-2">Try different keywords or browse all movies</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">🎬</span>
              <h2 className="text-xl font-bold">MovieApp</h2>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-300 transition-colors">About</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Contact</a>
              <a href="#" className="hover:text-indigo-300 transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieList;
