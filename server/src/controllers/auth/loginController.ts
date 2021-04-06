import type { Request, Response } from "express";
// import bcrypt from "bcrypt";
import { prisma } from "../../lib/prismaInit";
import { createToken } from "../../lib/createToken";

interface LoginInput {
  email: string;
  password: string;
}

const loginController = async (req: Request, res: Response) => {
  // ambil data yang dikirim user
  const { email, password }: LoginInput = req.body;

  try {
    // cari user dengan email sesuai
    const account = await prisma.mstUser.findUnique({
      where: { email },
    });

    // jika ada dan password cocok maka
    if (account && account.password === password) {
      // compare hashed password
      // const auth = await bcrypt.compare(password, account?.password);

      // generate jwt token
      const token = createToken(account.id);

      // return data
      res.status(201).json({ jwt: token, account });
    } else {
      // return ketika email tidak ditemukan / password salah
      res.status(400).json({ msg: "Login failed 1" });
    }
  } catch (err) {
    // error handling
    console.error(err);
    res.status(400).json({ msg: "Login failed 2" });
  }
};

export default loginController;
