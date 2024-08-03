import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';
import stream from 'stream';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', 
    },
  },
};

async function bufferToStream(buffer) {
  const duplexStream = new stream.Duplex();
  duplexStream.push(buffer);
  duplexStream.push(null);
  return duplexStream;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { file } = req.body;

  if (!file) {
    return res.status(400).json({ message: 'No file provided' });
  }

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({ refresh_token: token.refreshToken });

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
      name: file.name,
    };

    const media = {
      mimeType: file.type,
      body: await bufferToStream(Buffer.from(file.data, 'base64')),
    };

    const fileResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    const fileId = fileResponse.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const fileLink = fileResponse.data.webViewLink;

    res.status(200).json({ fileLink });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}
