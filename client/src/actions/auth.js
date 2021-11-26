import * as api from "../api";

export const signin = (formInput, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formInput);
    dispatch({ type: "AUTH", data });
    history.push("/recipes");
  } catch (error) {
    console.error(error);
  }
};

export const signup = (formInput, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formInput);
    dispatch({ type: "AUTH", data });
    history.push("/recipes");
  } catch (error) {
    console.error(error);
  }
};
