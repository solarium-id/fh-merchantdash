import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Get All Merchant
export const GetAllMerchant = async (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const item = 10;
  try {
    let merchants;
    if (page) {
      merchants = await prisma.mstMerchantTes.findMany({
        include: { category: true },
        skip: item * (page - 1),
        take: item,
        orderBy: { merchantname: "asc" },
      });
    } else {
      // default 10 item pertama
      merchants = await prisma.mstMerchantTes.findMany({
        include: { category: true },
        orderBy: { merchantname: "asc" },
      });
    }
    // ambil semua data Merchant
    const totalPage = await prisma.mstMerchantTes.count();

    // kirim data sebagai response
    res.status(200).json({
      pageItems: merchants.length,
      currentPage: page,
      totalPage: Math.ceil(totalPage / 10),
      merchants,
    });
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to get data" });
  }
};

// Get One Merchant
export const GetOneMerchant = async (req: Request, res: Response) => {
  // ambil id dari api url
  const { id } = req.params;

  try {
    // ambil data spesifik Merchant
    const merchant = await prisma.mstMerchantTes.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    // kirim data sebagai response
    res.status(200).json(merchant);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to get data" });
  }
};
