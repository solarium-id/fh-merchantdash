import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Get All Merchant
export const GetAllMerchant = async (_req: Request, res: Response) => {
  try {
    // ambil semua data Merchant
    const merchants = await prisma.mstMerchantTes.findMany({
      include: { category: true },
    });

    // kirim data sebagai response
    res.status(200).json(merchants);
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
