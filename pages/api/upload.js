// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import AdmZip from 'adm-zip';
import dbConnect from '../../lib/dbConnect';
import File from '../../models/File'; // Assuming you have a File model

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  await dbConnect();

  // Compress the image using adm-zip
  const zip = new AdmZip();
  zip.addFile(req.file.originalname, req.file.buffer);
  const compressedBuffer = zip.toBuffer();

  const newFile = new File({
    filename: `${req.file.originalname}.zip`,
    contentType: 'application/zip',
    data: compressedBuffer,
  });

  try {
    const savedFile = await newFile.save();
    res.status(201).json({ success: true, file: savedFile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};