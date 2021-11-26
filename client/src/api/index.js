import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchRecipes = () => API.get("/recipes");
export const createRecipe = (newRecipe) => API.post("/recipes", newRecipe);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
export const likeRecipe = (id) => API.patch(`/recipes/${id}/like`);
export const updateRecipe = (id, updatedRecipe) =>
  API.patch(`/recipes/${id}`, updatedRecipe);

export const signIn = (formInput) => API.post("/user/signin", formInput);
export const signUp = (formInput) => API.post("/user/signup", formInput);
