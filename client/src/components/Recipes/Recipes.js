import React from "react";
import Recipe from "./Recipe/Recipe";
import { useSelector } from "react-redux";
import { Loading, Navbar } from "../";

const Recipes = ({ setCurrentId }) => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <>
      <Navbar />
      {!recipes.length ? (
        <Loading />
      ) : (
        <div className="p-8">
          <div className="sm:grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:flex flex-wrap justify-center">
            {recipes.map((recipe) => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                setCurrentId={setCurrentId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Recipes;
