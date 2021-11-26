import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="bg-hero-pattern bg-cover h-screen">
      <Navbar />
      <p className="text-3xl md:text-6xl w-1/2 text-white font-extrabold p-16">
        Find and create your favorite recipes
      </p>

      <Link
        to={user ? "/recipes" : "/auth"}
        className="h-10 px-16 py-4 md:m-16 m-4 my-4 text-indigo-100 transition-colors duration-150 bg-gray-800 rounded-lg focus:shadow-outline hover:bg-gray-700"
      >
        {user ? "Explore Recipes" : "Sign In"}
      </Link>
    </div>
  );
};

export default HomePage;
