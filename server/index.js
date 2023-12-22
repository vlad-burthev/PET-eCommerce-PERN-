//dependencies
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import * as path from "path";

//db
import { connectToDb } from "./db/index.js";
import { models } from "./models/models.js";

//routes
import { router } from "./routes/index.js";

//middleware
import { errorHandlingMiddleware } from "./middleware/errorHandleMiddleware.js";

//.env
configDotenv();

//  path to static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//server port
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/api", router);
app.use(express.static(path.resolve(__dirname, "static")));

app.use(errorHandlingMiddleware);

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
