import React from "react";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { likeRecipe, deleteRecipe } from "../../../actions/recipes";
import Likes from "./Likes";

const Recipe = ({ recipe, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const editHandler = () => {
    history.push("/add-recipe");
    setCurrentId(recipe._id);
  }

  return (
    <div className="group max-w-sm rounded overflow-hidden shadow-lg transition duration-200 ease-in transform hover:scale-105 hover:z-50">
      <div className="p-2 px-4 absolute bg-white w-full transition-all duration-100 ease-in-out opacity-0 group-hover:opacity-75">
        <h2 className="text-lg font-bold">{recipe.name}</h2>
        {(user?.result?.googleId === recipe?.creator ||
          user?.result?._id === recipe?.creator) && (
          <button className="text-xl" onClick={editHandler}>
            <i className="fa fa-edit " />
          </button>
        )}
      </div>
      <img
        className="w-full h-60"
        src={recipe.selectedFile}
        alt="Recipe"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 text-base line-clamp-5">{recipe.message}</p>
      </div>
      <div className="px-4 pt-2">
        {recipe.tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{tag}
          </span>
        ))}
      </div>
      <div className="pb-2 px-2 transition-all duration-100 ease-in-out opacity-0 group-hover:opacity-75 flex justify-between">
        <div>
          <button
            className="text-md"
            onClick={() => dispatch(likeRecipe(recipe._id))}
          >
            {}
            <Likes recipe={recipe} />
          </button>
        </div>
        {(user?.result?.googleId === recipe?.creator ||
          user?.result?._id === recipe?.creator) && (
          <div>
            <button
              className="text-lg"
              onClick={() => dispatch(deleteRecipe(recipe._id))}
            >
              <i className="px-1 fa fa-trash" />
            </button>
            <p className="inline-block">Delete</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
