import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Delete Category
export const DeleteCategory = async (req: Request, res: Response) => {
  // ambil id category yang akan di hapus
  const { id } = req.params;

  try {
    // hapus category dengan id sesuai parameter
    const delCategory = await prisma.mstMerchantCat.delete({
      where: { id: Number(id) },
    });

    // kirim data sebagai response
    res.status(200).json(delCategory);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to update data" });
  }
};
