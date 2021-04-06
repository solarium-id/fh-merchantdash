import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// deklarasi interface tipe data input
interface MerchantInputType {
  merchantname?: string;
  merchantaddr?: string;
  merchantph?: string;
  merchantemail?: string;
  merchantpic?: string;
  categoryid?: number;
  ownername?: string;
  ownerhp?: string;
  owneremail?: string;
  fotoktp?: string;
  reservation?: number;
}

// Update Merchant
export const PatchMerchant = async (req: Request, res: Response) => {
  // ambil id category yang akan di update
  const { id } = req.params;
  // ambil categry dari request body dengan type MerchantInputType
  const data: MerchantInputType = req.body;

  try {
    // buat merchant dengan data dari request body
    const newMerchant = await prisma.mstMerchantTes.update({
      where: { id: Number(id) },
      data: data,
      include: { category: true },
    });

    // kirim data sebagai response
    res.status(200).json(newMerchant);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to update data" });
  }
};
