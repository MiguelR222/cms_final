import connectDB from '@/libs/mongodb';
import Image from '../../models/Image';
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'imageOne', maxCount: 1 },
  { name: 'imageTwo', maxCount: 1 },
  { name: 'imageThree', maxCount: 1 },
  { name: 'imageFour', maxCount: 1 },
]));

apiRoute.post(async (req, res) => {
  await connectDB();

  const { siteId } = req.body;
  const logo = req.files['logo'][0].path;
  const imageOne = req.files['imageOne'][0].path;
  const imageTwo = req.files['imageTwo'][0].path;
  const imageThree = req.files['imageThree'][0].path;
  const imageFour = req.files['imageFour'][0].path;

  try {
    const image = await Image.create({
      siteId,
      logo,
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
    });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

export default apiRoute;