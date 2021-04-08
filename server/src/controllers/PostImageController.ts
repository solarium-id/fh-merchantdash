import type { Request, Response } from "express";
import path from "path";
import fileUpload from "express-fileupload";

// Create Category
export const PostImage = async (req: Request, res: Response) => {
  const parentDir = path.join(process.cwd(), "..");
  // ambil categry dari request body

  if (req.files?.file === null) {
    res.status(400).json({ msg: "Failed to upload file" });
  }

  const file = req.files?.file as fileUpload.UploadedFile;

  file.mv(`${parentDir}/dashboard/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err, "error 2");
      res.status(500).send(err);
    }

    res
      .status(200)
      .json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });

  // try {
  //   // buat category dengan data dari request body
  //   const newCategory = await prisma.mstMerchantCat.create({
  //     data: { category },
  //   });

  //   // kirim data sebagai response
  //   res.status(200).json(newCategory);
  // } catch (error) {
  //   // error handling
  //   console.error(error);
  //   res.status(400).json({ msg: "Failed to post data" });
  // }
};
