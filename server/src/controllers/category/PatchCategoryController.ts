import type { Request, Response } from "express";
import { prisma } from "../../lib/prismaInit";

// Update Singel Category
export const PatchCategory = async (req: Request, res: Response) => {
  // ambil id category yang akan di update
  const { id } = req.params;
  // ambil data categry baru dari request body
  const { category } = req.body;

  try {
    // update category dengan id dari parameter dan data dari body
    const newCategory = await prisma.mstMerchantCat.update({
      where: { id: Number(id) },
      data: { category },
    });

    // kirim data sebagai response
    res.status(200).json(newCategory);
  } catch (error) {
    // error handling
    console.error(error);
    res.status(400).json({ msg: "Failed to update data" });
  }
};
