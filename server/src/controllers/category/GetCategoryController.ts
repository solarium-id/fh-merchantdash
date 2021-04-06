import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Get All Category
export const GetAllCategory = async (_req: Request, res: Response) => {
  try {
    // ambil semua data category
    const categories = await prisma.mstMerchantCat.findMany();

    // kirim data sebagai response
    res.status(200).json(categories);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to get data" });
  }
};

// Get One Category
export const GetOneCategory = async (req: Request, res: Response) => {
  // ambil id dari api url
  const { id } = req.params;

  try {
    // ambil semua data category
    const category = await prisma.mstMerchantCat.findUnique({
      where: { id: Number(id) },
    });

    // kirim data sebagai response
    res.status(200).json(category);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to get data" });
  }
};
