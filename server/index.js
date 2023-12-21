import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectToDb } from "./db/index.js";
import { models } from "./models/models.js";

configDotenv();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await connectToDb.authenticate();
    await connectToDb.sync(models);

    app.listen(PORT, () =>
      console.log(` [SERVER]: Server running on PORT: ${PORT}`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
