import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipes.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/recipes", recipeRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
