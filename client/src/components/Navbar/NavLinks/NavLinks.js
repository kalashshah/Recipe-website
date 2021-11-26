import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ isLoggedIn, authHandler }) => {
  const navHome =
    "text-white px-3 py-2 text-xl font-medium hover:border-b-2 border-transparent border-b-2 hover:border-current";
  const navClass =
    "text-gray-300 px-3 py-2 text-lg font-medium hover:border-b-2 border-transparent border-b-2 hover:border-current hover:text-white";

  return (
    <>
      <div>
        <Link to="/" className={navHome}>
          Home
        </Link>
        <Link to="/recipes" className={navClass}>
          Recipes
        </Link>
        <Link to="/add-recipe" className={navClass}>
          Add a Recipe
        </Link>
        <Link to="/about" className={navClass}>
          About Us
        </Link>
      </div>
      <Link to="/auth" className={navClass} onClick={authHandler}>
        {isLoggedIn ? "Logout" : "Login"}
      </Link>
    </>
  );
};

export default NavLinks;
