import React from "react";
import { Link } from "react-router-dom";

const MobileLinks = ({ isLoggedIn, authHandler }) => {
  const navHome =
    "text-white block px-3 py-2 text-base font-medium hover:border-b-2 border-transparent border-l-2 hover:border-current";
  const navClass =
    "text-gray-300 block px-3 py-2 text-base font-medium hover:border-b-2 border-transparent border-l-2 hover:border-current";

  return (
    <>
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
      <Link to="/auth" className={navClass} onClick={authHandler}>
        {isLoggedIn ? "Logout" : "Login"}
      </Link>
    </>
  );
};

export default MobileLinks;
