import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

interface MerchantInputType {
  merchantname: string;
  merchantaddr: string;
  merchantph: string;
  merchantemail: string;
  merchantpic: string;
  categoryid: number;
  ownername: string;
  ownerhp: string;
  owneremail: string;
  fotoktp: string;
  reservation?: number;
}

// Create Merchant
export const PostMerchant = async (req: Request, res: Response) => {
  // ambil categry dari request body
  const data: MerchantInputType = req.body;

  try {
    // buat merchant dengan data dari request body
    const newMerchant = await prisma.mstMerchantTes.create({
      data: data,
      include: { category: true },
    });

    // kirim data sebagai response
    res.status(200).json(newMerchant);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to post data" });
  }
};
