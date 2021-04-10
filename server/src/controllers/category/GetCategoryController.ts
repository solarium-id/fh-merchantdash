import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Get All Category
export const GetAllCategory = async (req: Request, res: Response) => {
  // console.log(req.query);
  const page = Number(req.query.page);
  const item = 10;
  try {
    let categories;
    if (page) {
      // ambil 10 item berdasarkan page
      categories = await prisma.mstMerchantCat.findMany({
        skip: item * (page - 1),
        take: item,
        orderBy: { category: "asc" },
      });
    } else {
      // default 10 item pertama
      categories = await prisma.mstMerchantCat.findMany({
        orderBy: { category: "asc" },
      });
    }

    // hitung total page
    const totalPage = await prisma.mstMerchantCat.count();

    // kirim data sebagai response
    res.status(200).json({
      pageItems: categories.length,
      currentPage: page,
      totalPage: Math.ceil(totalPage / 10),
      categories,
    });
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
    // ambil data spesifik category
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
