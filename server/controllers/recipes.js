import express from "express";
import mongoose from "mongoose";
import RecipeMessage from "../models/recipeMessage.js";

const router = express.Router();

export const getRecipes = async (req, res) => {
  try {
    const recipeMessages = await RecipeMessage.find();
    res.status(200).json(recipeMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new RecipeMessage({
    ...recipe,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  // const { id: _id } = req.params;
  // const recipe = req.body;
  // console.log("Update");
  // if (!mongoose.Types.ObjectId.isValid(_id))
  //   return res.status(404).send("Recipe post unavailable");
  // const updatedRecipe = await RecipeMessage.findByIdAndUpdate(
  //   _id,
  //   { ...recipe, _id },
  //   { new: true }
  // );
  // res.json(updatedRecipe);

  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Recipe post unavailable");
  const updatedRecipe = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    _id: id,
  };
  await RecipeMessage.findByIdAndUpdate(id, updatedRecipe, { new: true });
  res.json(updatedRecipe);
};

export const deleteRecipe = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Recipe post unavailable");

  await RecipeMessage.findByIdAndRemove(_id);
  res.json({ message: "Recipe post deleted successfully" });
};

export const likeRecipe = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.json({ message: "Login to like recipe" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Recipe post unavailable");

  const recipe = await RecipeMessage.findById(_id);

  const index = recipe.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    recipe.likes.push(req.userId);
  } else {
    recipe.likes = recipe.likes.filter((id) => id !== String(req.userId));
  }

  const updatedRecipe = await RecipeMessage.findByIdAndUpdate(_id, recipe, {
    new: true,
  });
  res.json(updatedRecipe);
};

export default router;
