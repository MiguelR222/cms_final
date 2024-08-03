import axios from 'axios';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { file } = req.body;

  if (!file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  try {
    const response = await axios.post(
      'https://api.imgur.com/3/image',
      {
        image: file.data,
        type: 'base64',
        name: file.name,
      },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
      }
    );

    const fileLink = response.data.data.link;

    res.status(200).json({ fileLink });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}
