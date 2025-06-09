import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="bg-indigo-600 text-white shadow-md">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <h1 className="text-2xl font-bold font-serif">MovieApp</h1>
          </div>

          <div className="space-x-6">
            <Link to="/" className="hover:underline font-serif">Home</Link>
            <Link to="/movies" className="hover:underline font-serif">Movies</Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center text-center px-4">
        <div className="max-w-xl w-full py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Welcome to MovieApp
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Discover Bollywood and Hollywood movies in one place.
          </p>
          <Link
            to="/movies"
            className="inline-block bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Explore Movies
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
      </footer>
    </div>
  );
}
