import React, { useState, useEffect } from "react";

const Likes = ({ recipe }) => {
  const [recipelikes, setRecipeLikes] = useState(0);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setRecipeLikes(recipe.likes.length);
    console.log("effect called");
  }, [recipe.likes]);

  if (recipe.likes.length > 0) {
    return recipe.likes.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <i className="px-4 fa fa-thumbs-up" />
        &nbsp;
        {recipe.likes.length > 2
          ? `You and ${recipe.likes.length - 1} others`
          : `${recipe.likes.length} like${recipe.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <i className="px-4 fa fa-thumbs-o-up" />
        &nbsp;{recipe.likes.length}{" "}
        {recipe.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <i className="px-4 fa fa-thumbs-o-up" />
      &nbsp;Like
    </>
  );
};

export default Likes;
