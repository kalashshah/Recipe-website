import express from "express";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
} from "../controllers/recipes.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", auth, createRecipe);
router.patch("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);
router.patch("/:id/like", auth, likeRecipe);

export default router;
