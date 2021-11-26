import * as api from "../api";

export const getRecipes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipes();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const createRecipe = (recipe) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipe);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = (id, recipe) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, recipe);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const likeRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeRecipe(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.error(error);
  }
};
