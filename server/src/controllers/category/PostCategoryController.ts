import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Create Category
export const PostCategory = async (req: Request, res: Response) => {
  // ambil categry dari request body
  const { category } = req.body;

  try {
    // buat category dengan data dari request body
    const newCategory = await prisma.mstMerchantCat.create({
      data: { category },
    });

    // kirim data sebagai response
    res.status(200).json(newCategory);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to post data" });
  }
};
