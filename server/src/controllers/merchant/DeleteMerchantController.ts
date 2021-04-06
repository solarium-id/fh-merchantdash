import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Delete Merchant
export const DeleteMerchant = async (req: Request, res: Response) => {
  // ambil id Merchant yang akan di hapus
  const { id } = req.params;

  try {
    // hapus Merchant dengan id sesuai parameter
    const delMerchant = await prisma.mstMerchantTes.delete({
      where: { id: Number(id) },
    });

    // kirim data sebagai response
    res.status(200).json(delMerchant);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to delete data" });
  }
};
