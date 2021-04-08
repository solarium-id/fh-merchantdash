import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { apiRoutes } from "./router/apiRoute";
import { authRoutes } from "./router/authRoute";
import { GetTimeMiddleware } from "./middleware/apiMiddleware";

const app = express();
const PORT = process.env.PORT || 4000;

const server = async () => {
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());
  app.use(GetTimeMiddleware);

  // Route
  app.get("/", (_req, res) => res.send("Server Running Successfully!"));

  app.use(authRoutes);
  app.use("/api", apiRoutes);

  // Listen
  app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
  );
};

server();
