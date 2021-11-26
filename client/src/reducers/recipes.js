export default (state = [], action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.payload];
    case "FETCH_ALL":
      return action.payload;
    case "UPDATE":
      return state.map((recipe) =>
        recipe._id === action.payload.id ? action.payload : recipe
      );
    case "DELETE":
      return state.filter((recipe) => recipe._id !== action.payload)
    default:
      return state;
  }
};
