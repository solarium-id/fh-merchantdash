import express from "express";
import cors from "cors";
import { apiRoutes } from "./router/apiRoute";
import { authRoutes } from "./router/authRoute";

const app = express();
const PORT = process.env.PORT || 4000;

const server = async () => {
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
