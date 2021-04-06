import type { Request, Response, NextFunction } from "express";

// Route Specific Middleware
export const GetTimeMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log("Request Time: ", Date());
  next();
};
