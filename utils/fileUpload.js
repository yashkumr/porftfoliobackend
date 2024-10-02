import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderName = "uploads"; // default folder
    let resource_type = "image"; // default type

    // Check if the file is a PDF
    if (file.mimetype === "application/pdf") {
      folderName = "pdfs";
      resource_type = "raw"; // 'raw' for non-images (like PDF)
    }

    return {
      folder: folderName,
      format: file.mimetype.split("/")[1], // Automatically set file format
      resource_type: resource_type,
    };
  },
});

const upload = multer({ storage });

export default upload;
