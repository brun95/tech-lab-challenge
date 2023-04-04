import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connect, close } from "./utils/database";
import routes from "./routes";

const app: Application = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: { message: any }) => {
    console.error(`Error connecting to database: ${error.message}`);
  });

process.on("SIGINT", async () => {
  try {
    await close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error: any) {
    console.error(`Error closing database connection: ${error.message}`);
    process.exit(1);
  }
});
