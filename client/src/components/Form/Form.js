import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import * as styles from "./styles";
import { createRecipe, updateRecipe } from "../../actions/recipes";

const Form = ({ currentId, setCurrentId }) => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const recipe = useSelector((state) =>
    currentId ? state.recipes.find((recipe) => recipe._id === currentId) : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  useEffect(() => {
    if (recipe) {
      setRecipeData(recipe);
    }
  }, [recipe]);

  const clear = () => {
    setCurrentId(null);
    setRecipeData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const clearDataHandler = (event) => {
    event.preventDefault();
    clear();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    history.push("/recipes");
    if (currentId) {
      dispatch(
        updateRecipe(currentId, { ...recipeData, name: user?.result?.name })
      );
    } else {
      dispatch(createRecipe({ ...recipeData, name: user?.result?.name }));
    }
    
    clear();
  };

  if (!user?.result?.name) {
    return (
      <div className="p-8 text-center text-gray-700 w-3/4 mx-auto py-16 rounded-2xl shadow-2xl">
        <p className="text-lg">Please sign in to create a new recipe</p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <div className="p-3">
        <h2 className={styles.title}>
          {currentId ? "Update Recipe" : "Add a Recipe"}
        </h2>
      </div>
      <div className="p-3 py-2">
        <label className="block mb-1">Title</label>
        <input
          className={styles.input}
          type="text"
          value={recipeData.title}
          onChange={(event) =>
            setRecipeData({ ...recipeData, title: event.target.value })
          }
        />
      </div>
      <div className="p-3 py-2">
        <label className="block mb-1">Description</label>
        <input
          className={styles.input}
          type="text"
          value={recipeData.message}
          onChange={(event) =>
            setRecipeData({ ...recipeData, message: event.target.value })
          }
        />
      </div>
      <div className="p-3 py-2">
        <label className="block mb-1">Tags</label>
        <input
          className={styles.input}
          type="text"
          value={recipeData.tags}
          placeholder="Eg: food,foodie,healthy"
          onChange={(event) =>
            setRecipeData({
              ...recipeData,
              tags: event.target.value.split(","),
            })
          }
        />
      </div>
      <div className="p-3">
        <label className="block mb-2">Add recipe image</label>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setRecipeData({ ...recipeData, selectedFile: base64 })
          }
        />
      </div>
      <button className={styles.button} type="submit">
        {currentId ? "Update Recipe" : "Add a Recipe"}
      </button>
      <button className={styles.button} onClick={clearDataHandler}>
        Clear
      </button>
    </form>
  );
};

export default Form;
