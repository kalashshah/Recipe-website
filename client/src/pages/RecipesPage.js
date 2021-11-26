import React, { useState, useEffect } from "react";
import { Recipes, Form, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { getRecipes } from "../actions/recipes";
import { useLocation } from "react-router-dom";

const RecipesPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [isRecipePage, setRecipePage] = useState(true);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/recipes") setRecipePage(true);
    else if (location.pathname === "/add-recipe") setRecipePage(false);
  }, [location]);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch, currentId]);

  return (
    <>
      {isRecipePage ? (
        <Recipes setCurrentId={setCurrentId} />
      ) : (
        <>
          <Navbar />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </>
      )}
    </>
  );
};

export default RecipesPage;
