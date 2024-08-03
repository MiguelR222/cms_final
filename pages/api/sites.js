import connectDB from '@/libs/mongodb';
import Site from '@/models/Site';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const session = await getSession({ req });

        if (!session) {
          return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const sites = await Site.find({ userId: session.user.id });
        res.status(200).json({ success: true, data: sites });
      } catch (error) {
        console.error('GET error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const site = await Site.create(req.body);
        res.status(201).json({ success: true, data: site });
      } catch (error) {
        console.error('POST error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const site = await Site.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!site) {
          return res.status(404).json({ success: false, error: 'Site not found' });
        }
        res.status(200).json({ success: true, data: site });
      } catch (error) {
        console.error('PUT error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedSite = await Site.deleteOne({ _id: id });
        if (!deletedSite) {
          return res.status(404).json({ success: false, error: 'Site not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('DELETE error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
