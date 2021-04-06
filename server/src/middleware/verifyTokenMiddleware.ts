import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ambil secret dari env (secret yang sama dengan saat membuat token)
const secret = String(process.env.TOKEN_SECRET);

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ambil bearer token
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader?.split(" ");

  // jika bearer token ditemukan
  if (bearer !== undefined && bearer.length > 1) {
    // ambil token nya saja
    const bearerToken = bearer ? bearer[1] : undefined;

    // jika token ditemukan
    if (bearerToken !== undefined) {
      // verify token
      jwt.verify(bearerToken, secret, (err, decodedToken) => {
        if (err) {
          // jika error akan mengirim status unauthorize ke user
          console.error(err.message);
          res.sendStatus(403).json({ msg: "unauthenticated 3" });
          res.end();
        } else {
          // jika berhasil maka lanjut (keluar dari midlleware)
          console.log({ decodedToken });
          next();
        }
      });
    } else {
      // jika gagal akan mengirim status unauthorize ke user
      res.sendStatus(403).json({ msg: "unauthenticated 3" });
      res.end();
    }
  } else {
    // jika gagal  akan mengirim status unauthorize ke user
    res.status(403).json({ msg: "unauthenticated 3" });
    res.end();
  }
};
