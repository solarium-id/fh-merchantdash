import express from "express";
import { IndexController } from "./controllers/indexController";
import { apiRoute } from "./router/apiRoute";

const app = express();
const PORT = process.env.PORT || 4000;

const server = async () => {
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Route
  app.get("/", IndexController);
  app.use("/api", apiRoute);

  // Listen
  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
  );
};

server();
